package de.adorsys.psd2.sandbox.tpp.rest.server.controller;

import de.adorsys.ledgers.middleware.api.exception.UserNotFoundMiddlewareException;
import de.adorsys.psd2.sandbox.tpp.rest.api.resource.TppDataUploaderRestApi;
import de.adorsys.psd2.sandbox.tpp.rest.server.model.DataPayload;
import de.adorsys.psd2.sandbox.tpp.rest.server.service.ParseService;
import de.adorsys.psd2.sandbox.tpp.rest.server.service.RestExecutionService;
import de.adorsys.psd2.sandbox.tpp.rest.server.service.TestsDataGenerationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;

@RestController
@RequiredArgsConstructor
@RequestMapping(TppDataUploaderRestApi.BASE_PATH)
public class TppDataUploaderController implements TppDataUploaderRestApi {

    private static final Logger logger = LoggerFactory.getLogger(TppDataUploaderController.class);

    private final RestExecutionService restExecutionService;
    private final ParseService parseService;
    private final TestsDataGenerationService generationService;

    @Override
    public ResponseEntity<String> uploadData(MultipartFile file) {
        logger.info("Update file received");
        DataPayload parsed = parseService.getDataFromFile(file);
        if (parsed == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not parse data");
        }
        logger.info("Read data is successful");
        return restExecutionService.updateLedgers(null, parsed)
                   ? ResponseEntity.ok("Data successfully updated")
                   : new ResponseEntity<>("Could not update data.", HttpStatus.EXPECTATION_FAILED);
    }

    @Override
    @SuppressWarnings("PMD") //pmd is mistaken here and assumes that catch branches are identical, but they are not
    public ResponseEntity<Resource> generateData() {
        logger.info("Request to create test data received");

        try {
            byte[] bytes = generationService.generate(null);

            InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(bytes));
            HttpHeaders headers = getExportFileHttpHeaders();
            return ResponseEntity.ok()
                       .headers(headers)
                       .contentLength(bytes.length)
                       .contentType(MediaType.APPLICATION_OCTET_STREAM)
                       .body(resource);

        } catch (UserNotFoundMiddlewareException e) {

            logger.error("User could not be found");
            return ResponseEntity.notFound().build();

        } catch (FileNotFoundException e) {

            logger.error("Default file template could not be found.");
            return ResponseEntity.badRequest().build();
        }
    }


    private HttpHeaders getExportFileHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        return headers;
    }
}
