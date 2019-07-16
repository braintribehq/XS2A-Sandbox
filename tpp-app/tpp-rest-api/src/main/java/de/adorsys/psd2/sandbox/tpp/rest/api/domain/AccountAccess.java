package de.adorsys.psd2.sandbox.tpp.rest.api.domain;

import de.adorsys.ledgers.middleware.api.domain.um.AccessTypeTO;
import lombok.Data;

@Data
public class AccountAccess {
    private String id;
    private String iban;
    private AccessTypeTO accessType;
    private int scaWeight;
}
