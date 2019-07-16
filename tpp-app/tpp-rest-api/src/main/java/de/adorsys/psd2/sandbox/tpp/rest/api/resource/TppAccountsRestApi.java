package de.adorsys.psd2.sandbox.tpp.rest.api.resource;

import de.adorsys.ledgers.middleware.api.domain.account.AccountDetailsTO;
import de.adorsys.ledgers.middleware.api.domain.payment.AmountTO;
import de.adorsys.psd2.sandbox.tpp.rest.api.domain.AccountAccess;
import de.adorsys.psd2.sandbox.tpp.rest.api.domain.DepositAccount;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "TPP Accounts management")
public interface TppAccountsRestApi {

    String BASE_PATH = "/tpp/accounts";

    @ApiOperation(value = "Create account for a given user",
        notes = "Endpoint to a deposit account for a user with given ID",
        authorizations = @Authorization(value = "apiKey"))
    @PostMapping
    ResponseEntity<Void> createAccount(@RequestParam(value = "userId") String userId, @RequestBody DepositAccount account);

    @ApiOperation(value = "Update Account access for a given user",
        notes = "Endpoint to update account access with given iban for a user with given ID ",
        authorizations = @Authorization(value = "apiKey"))
    @PutMapping("/access")
    ResponseEntity<Void> updateAccountAccess(@RequestBody AccountAccess accountAccess);

    /**
     * Returns the list of accounts that belong to the same branch as STAFF user.
     *
     * @return list of accounts that belongs to the same branch as staff user.
     */
    @ApiOperation(value = "Get list of Accessible Accounts",
        notes = "Returns the list of all accounts connected to the given TPP",
        authorizations = @Authorization(value = "apiKey"))
    @ApiResponses(value = {
        @ApiResponse(code = 200, response = AccountDetailsTO[].class, message = "List of accounts accessible to the TPP.")
    })
    @GetMapping
    ResponseEntity<List<AccountDetailsTO>> getAllAccounts();

    /**
     * Returns a single account by its ID if it belong to the same branch as STAFF user.
     *
     * @return single account by its ID if it belong to the same branch as STAFF user.
     */
    @ApiOperation(value = "Get an account by its ID",
        notes = "Returns the account by its ID if it belongs to the TPP",
        authorizations = @Authorization(value = "apiKey"))
    @ApiResponses(value = {
        @ApiResponse(code = 200, response = AccountDetailsTO[].class, message = "Account details by its ID if it is accessible by the TPP")
    })
    @GetMapping(value = "/{accountId}")
    ResponseEntity<AccountDetailsTO> getSingleAccount(@PathVariable("accountId") String accountId);

    /**
     * Returns a single account by its ID if it belong to the same branch as STAFF user.
     *
     * @return single account by its ID if it belong to the same branch as STAFF user.
     */
    @ApiOperation(value = "Deposit cash to an account by its ID",
        notes = "Deposits cash to the account by its ID if it belongs to the TPP",
        authorizations = @Authorization(value = "apiKey"))
    @ApiResponses(value = {
        @ApiResponse(code = 200, response = AccountDetailsTO[].class, message = "Deposits cash to the account by its ID")
    })
    @PostMapping(value = "/{accountId}/deposit-cash")
    ResponseEntity<Void> depositCash(@PathVariable("accountId") String accountId, @RequestBody AmountTO amount);
}
