package de.adorsys.psd2.sandbox.tpp.rest.server.controller;

import de.adorsys.ledgers.middleware.client.rest.UserMgmtStaffRestClient;
import de.adorsys.psd2.sandbox.tpp.rest.api.domain.User;
import de.adorsys.psd2.sandbox.tpp.rest.api.resource.TppRestApi;
import de.adorsys.psd2.sandbox.tpp.rest.server.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
@RequestMapping(TppRestApi.BASE_PATH)
public class TppController implements TppRestApi {
    private final UserMapper userMapper;
    private final UserMgmtStaffRestClient userMgmtStaffRestClient;

    @Override
    public void login(String login, String pin) {
    }

    @Override
    public ResponseEntity<Void> register(User user) {
        userMgmtStaffRestClient.register(user.getId(), userMapper.toUserTO(user));
        return ResponseEntity.status(CREATED).build();
    }
}
