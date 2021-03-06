package de.adorsys.psd2.sandbox.tpp.rest.server.mapper;

import de.adorsys.ledgers.middleware.api.domain.account.AccountDetailsTO;
import de.adorsys.ledgers.middleware.api.domain.account.AccountReportTO;
import de.adorsys.ledgers.middleware.api.domain.um.AccessTypeTO;
import de.adorsys.ledgers.middleware.api.domain.um.AccountAccessTO;
import de.adorsys.ledgers.middleware.api.domain.um.UserTO;
import de.adorsys.psd2.sandbox.tpp.rest.api.domain.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    @Mapping(target = "id", ignore = true)
    AccountDetailsTO toAccountDetailsTO(DepositAccount depositAccount);

    @Mapping(target = "id", ignore = true)
    AccountAccessTO toAccountAccessTO(AccountAccess accountAccess);

    @Mapping(source = "usersAccessingAccount", target = "accesses")
    AccountReport toAccountReport(AccountReportTO report);

    List<UserAccess> toUserAccesses(List<UserTO> users);

    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(expression = "java(user.getAccountAccesses().get(0).getScaWeight())", target = "scaWeight")
    @Mapping(expression = "java(toAccessType(user.getAccountAccesses().get(0).getAccessType()))", target = "accessType")
    UserAccess toUserAccess(UserTO user);

    AccessType toAccessType(AccessTypeTO accessTypeTO);
}
