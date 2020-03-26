package de.adorsys.psd2.sandbox.tpp.rest.server.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import de.adorsys.psd2.sandbox.tpp.rest.server.exception.TppException;
import feign.FeignException;
import feign.Request;
import feign.Response;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.internal.util.reflection.Whitebox;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.method.HandlerMethod;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class TppExceptionAdvisorTest {
    private static final ObjectMapper STATIC_MAPPER = new ObjectMapper().findAndRegisterModules().registerModule(new JavaTimeModule());

    @InjectMocks
    private TppExceptionAdvisor service;

    @Test
    public void handleException() throws NoSuchMethodException {
        ResponseEntity<Map> result = service.handleException(new Exception("Msg"), new HandlerMethod(service, "toString", null));
        ResponseEntity<Map<String, String>> expected = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getExpected(500, "Msg"));
        compareBodies(result, expected);
    }

    @Test
    public void handleTppException() throws NoSuchMethodException {
        ResponseEntity<Map> result = service.handleTppException(new TppException("Msg", 500), new HandlerMethod(service, "toString", null));
        ResponseEntity<Map<String, String>> expected = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getExpected(500, "Msg"));
        compareBodies(result, expected);
    }

    @Test
    public void handleFeignException() throws NoSuchMethodException, JsonProcessingException {
        Whitebox.setInternalState(service, "objectMapper", STATIC_MAPPER);
        ResponseEntity<Map> result = service.handleFeignException(FeignException.errorStatus("method", getResponse()), new HandlerMethod(service, "toString", null));
        ResponseEntity<Map<String, String>> expected = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(getExpected(401, "status 401 reading method"));
        compareBodies(result, expected);
    }

    private Response getResponse() throws JsonProcessingException {
        return Response.builder()
                   .request(Request.create(Request.HttpMethod.POST, "", new HashMap<>(), null))
                   .reason("Msg")
                   .headers(new HashMap<>())
                   .status(401)
                   .body(STATIC_MAPPER.writeValueAsString(Map.of("devMessage", "Msg").toString().getBytes()).getBytes())
                   .build();
    }

    private void compareBodies(ResponseEntity<Map> result, ResponseEntity<Map<String, String>> expected) {
        assertThat(result).isNotNull();
        assertThat(result.getStatusCode()).isEqualTo(expected.getStatusCode());
        Map<String, String> resultBody = result.getBody();
        Map<String, String> expectedBody = expected.getBody();
        assertThat(resultBody.get("code")).isEqualTo(expectedBody.get("code"));
        assertThat(resultBody.get("message")).isEqualTo(expectedBody.get("message"));
        assertThat(LocalDateTime.parse(resultBody.get("dateTime"))).isEqualToIgnoringSeconds(LocalDateTime.now());
    }

    private Map<String, String> getExpected(int code, String msg) {
        Map<String, String> map = new HashMap<>();
        map.put("dateTime", LocalDateTime.now().toString());
        map.put("code", String.valueOf(code));
        map.put("message", msg);
        return map;
    }
}
