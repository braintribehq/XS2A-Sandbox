package de.adorsys.psd2.sandbox.tpp.rest.server.mapper;

import de.adorsys.ledgers.middleware.api.domain.account.AccountDetailsTO;
import de.adorsys.psd2.sandbox.tpp.rest.api.domain.DepositAccount;
import org.mapstruct.Mapper;

@Mapper
public interface AccountMapper {

    AccountDetailsTO accountToAccountDetailsTO (DepositAccount depositAccount);
    DepositAccount accountDetailsTOtoDepositAccount (AccountDetailsTO accountDetailsTO);
}