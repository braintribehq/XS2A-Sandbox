/*
 * Copyright 2018-2018 adorsys GmbH & Co KG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.adorsys.ledgers.consent.aspsp.rest.client;

import de.adorsys.psd2.xs2a.core.profile.AccountReference;
import de.adorsys.psd2.xs2a.core.tpp.TppInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.time.LocalDate;

@ApiModel(description = "Piis consent request", value = "PiisConsentRequest")
public class CreatePiisConsentRequest {
    @ApiModelProperty(value = "Tpp for which the consent will be created. If the property is omitted, the consent will be created for all TPPs")
    private TppInfo tppInfo;

    @ApiModelProperty(value = "Account, where the confirmation of funds service is aimed to be submitted to.")
    private AccountReference account;

    @ApiModelProperty(value = "Consent`s expiration date. The content is the local ASPSP date in ISODate Format", example = "2020-10-10")
    private LocalDate validUntil;

    @ApiModelProperty(value = "Maximum frequency for an access per day. For a once-off access, this attribute is set to 1", required = true, example = "4")
    private int allowedFrequencyPerDay;

    @ApiModelProperty(value = "Card Number of the card issued by the PIISP. Should be delivered if available.", example = "1234567891234")
    private String cardNumber;

    @ApiModelProperty(value = "Expiry date of the card issued by the PIISP", example = "2020-12-31")
    private LocalDate cardExpiryDate;

    @ApiModelProperty(value = "Additional explanation for the card product.", example = "MyMerchant Loyalty Card")
    private String cardInformation;

    @ApiModelProperty(value = "Additional information about the registration process for the PSU, e.g. a reference to the TPP / PSU contract.", example = "Your contract Number 1234 with MyMerchant is completed with the registration with your bank.")
    private String registrationInformation;

    public TppInfo getTppInfo() {
        return tppInfo;
    }

    public void setTppInfo(TppInfo tppInfo) {
        this.tppInfo = tppInfo;
    }

    public AccountReference getAccount() {
        return account;
    }

    public void setAccount(AccountReference account) {
        this.account = account;
    }

    public LocalDate getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(LocalDate validUntil) {
        this.validUntil = validUntil;
    }

    public int getAllowedFrequencyPerDay() {
        return allowedFrequencyPerDay;
    }

    public void setAllowedFrequencyPerDay(int allowedFrequencyPerDay) {
        this.allowedFrequencyPerDay = allowedFrequencyPerDay;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public LocalDate getCardExpiryDate() {
        return cardExpiryDate;
    }

    public void setCardExpiryDate(LocalDate cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }

    public String getCardInformation() {
        return cardInformation;
    }

    public void setCardInformation(String cardInformation) {
        this.cardInformation = cardInformation;
    }

    public String getRegistrationInformation() {
        return registrationInformation;
    }

    public void setRegistrationInformation(String registrationInformation) {
        this.registrationInformation = registrationInformation;
    }
}

