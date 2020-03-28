import {HttpClientModule} from '@angular/common/http';
import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {AccountReport} from '../models/account-report';
import {Amount} from '../models/amount.model';
import {GrantAccountAccess} from '../models/grant-account-access.model';
import {PaginationResponse} from "../models/pagination-reponse";
import {Account} from '../models/account.model';
import {AccountService} from './account.service';
import { AccountStatus, AccountType, UsageType } from '../models/account.model';

describe('AccountService', () => {
    let httpMock: HttpTestingController;
    let accountService: AccountService;
    const url = `${environment.tppBackend}`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AccountService]
        });
        accountService = TestBed.get(AccountService);
        httpMock = TestBed.get(HttpTestingController);
    })

    it('should be created', () => {
        const accountService: AccountService = TestBed.get(AccountService);
        expect(accountService).toBeTruthy();
    });

    it('should get the account', () => {
        accountService.getAccount('accountId').subscribe((data: any) => {
            expect(data).toBe('accountId')});
        const req = httpMock.expectOne(url + '/accounts/' + 'accountId');
        expect(req.request.method).toBe('GET');
        req.flush('accountId');
        httpMock.verify();
    });

    it('should get the accountReport by Iban', () => {
        accountService.getAccountByIban('DE12 1234 5678 9012 3456 00').subscribe((data: any) => {
            expect(data).toBe('DE12 1234 5678 9012 3456 00')});
        const req = httpMock.expectOne(url + '/accounts/details?iban=' + 'DE12 1234 5678 9012 3456 00');
        expect(req.request.method).toBe('GET');
        req.flush('DE12 1234 5678 9012 3456 00');
        httpMock.verify();
    });

    it('should get the accountReport by id', () => {
        accountService.getAccountReport('accountId').subscribe((data: any) => {
            expect(data).toBe('accountId')});
        const req = httpMock.expectOne(url + '/accounts/report/' + 'accountId');
        expect(req.request.method).toBe('GET');
        req.flush('accountId');
        httpMock.verify();
    });

    it('should put the updateAccountAccessForUser', () => {
        let mockAccountAccess: GrantAccountAccess = {
            id: 'id',
            accessType: 'OWNER',
            iban: 'DE12 1234 5678 9012 3456 00',
            scaWeight: 50
        }
        accountService.updateAccountAccessForUser(mockAccountAccess).subscribe((data: GrantAccountAccess) => {
            expect(data.iban).toBe('DE12 1234 5678 9012 3456 00');
        });
        const req = httpMock.expectOne(url + '/accounts/access');
        expect(req.request.method).toBe('PUT');
        req.flush({iban: 'DE12 1234 5678 9012 3456 00'});
        httpMock.verify();
    });

    it('should post the depositCash', () => {
        let mockAmount: Amount = {
            currency: 'EUR',
            amount: 100
        }
        accountService.depositCash('accountId', mockAmount).subscribe((data: Amount) => {
            expect(data.amount).toBe(100);});
        const req = httpMock.expectOne(url + '/accounts/' + 'accountId' + '/deposit-cash');
        expect(req.request.method).toBe('POST');
        req.flush({amount: 100});
        httpMock.verify();
    });

    it('should create a account', () => {
        let mockAccount: Account = {
            id: 'id',
            iban: 'DE12 1234 5678 9012 3456 00',
            bban: 'bban',
            pan: 'pan',
            maskedPan: 'maskedPan',
            msisdn: 'msisdn',
            currency: 'EUR',
            name: 'name',
            product: 'product',
            accountType: AccountType.CACC,
            accountStatus: AccountStatus.BLOCKED,
            bic: 'bic',
            linkedAccounts: 'linkedAccounts',
            usageType: UsageType.ORGA,
            details: 'details',
            balances: []
        }
        accountService.createAccount('accountId', mockAccount).subscribe((data: Account) => {
            expect(data.iban).toBe('DE12 1234 5678 9012 3456 00');});
    });
});
