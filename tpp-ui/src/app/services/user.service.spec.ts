import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {environment} from '../../environments/environment';
import {UserService} from './user.service';

describe('UserService', () => {
    let httpTestingController: HttpTestingController;
    let userService: UserService;

    const url = `${environment.tppBackend + '/users'}`;
    const getUrl = `${environment.tppBackend + '/users/' + 'J4tdJUEPQhglZAFgvo9aJc'}`;

    const mockUser =
        {
            accountAccesses: [
                {
                    accessType: 'OWNER',
                    accountId: 'string',
                    currency: 'EUR',
                    iban: 'ME66929958485327905358',
                    id: 'bNrPhmm3SC0vwm2Tf4KknM',
                    scaWeight: 10
                }
            ],
            branch: 'string',
            email: 'foo@foo.de',
            id: 'J4tdJUEPQhglZAFgvo9aJc',
            login: 'test',
            pin: '$2a$10$hi7Cd4j9gd/ZBw7w.kbNVOzDNUgIEXUtG5ZJYvjjTGLjUwOR0qibu',
            scaUserData: [
                {
                    decoupled: true,
                    id: 'HeJDea8LQE8rdLiJ6eKfhY',
                    methodValue: 'string',
                    scaMethod: 'foo@foo.de',
                    staticTan: '123456',
                    usesStaticTan: true,
                    valid: true
                }
            ],
            userRoles: [
                'CUSTOMER'
            ]
        }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
            ],
            providers: [UserService]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        userService = TestBed.get(UserService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    it('should return expected list of users (HttpClient called once)', () => {
        const mockUsers = [
            {
                accountAccesses: [
                    {id: 'bNrPhmm3SC0vwm2Tf4KknM', iban: 'DE51250400903312345678', accessType: 'OWNER'},
                    {id: 'lcyeJaTxQrIhtuNQl-kF4E', iban: 'ME66929958485327905358', accessType: 'OWNER'}
                ],
                branch: 'fdf',
                email: 'foo@foo.de',
                id: 'J4tdJUEPQhglZAFgvo9aJc',
                login: 'test',
                pin: '$2a$10$hi7Cd4j9gd/ZBw7w.kbNVOzDNUgIEXUtG5ZJYvjjTGLjUwOR0qibu',
                scaUserData: [{id: 'HeJDea8LQE8rdLiJ6eKfhY', scaMethod: 'EMAIL', methodValue: 'foo@fool.de'}],
                userRoles: ['CUSTOMER']
            }
        ];

        userService.listUsers().subscribe(resp => {
            expect(resp.users[0].login).toEqual('test');
            expect(resp.users[0].email).toEqual('foo@foo.de');
        });

        const req = httpTestingController.expectOne(request => request.url.indexOf(url) > -1);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        expect(req.request.method).toEqual('GET');

        req.flush({users: mockUsers, totalElements: mockUsers.length});
    });

    xit('should get a user (HttpClient called once)', () => {

        userService.getUser('J4tdJUEPQhglZAFgvo9aJc').subscribe(resp => {
            console.log('response', resp);
            expect(resp.login).toEqual('test');
            expect(resp.email).toEqual('foo@foo.de');
        });

        const req = httpTestingController.expectOne(request => request.url.indexOf(getUrl) > -1);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        expect(req.request.method).toEqual('GET');
        req.flush({...mockUser});
    });

    xit('should post a user (HttpClient called once)', () => {

        userService.createUser(mockUser).subscribe(resp => {
            expect(mockUser).toEqual(mockUser);
        });

        const req = httpTestingController.expectOne(request => request.url.indexOf(url) > -1);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        expect(req.request.method).toEqual('POST');
        req.flush({...mockUser});
    });

    xit('should update expected a user (HttpClient called once)', () => {

        userService.updateUserDetails(mockUser).subscribe(resp => {
            expect(mockUser).toEqual(mockUser);
        });

        const req = httpTestingController.expectOne(request => request.url.indexOf(url) > -1);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        expect(req.request.method).toEqual('PUT');
        req.flush({...mockUser});
    });
});

