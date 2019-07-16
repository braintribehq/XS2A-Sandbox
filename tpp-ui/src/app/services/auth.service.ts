import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Credentials} from "../models/credentials.model";
import {Router} from "@angular/router";
import {AutoLogoutService} from "./auto-logout.service";
import {TppInfo} from "../models/tpp-info.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public url = `${environment.tppBackend}`;
    private authTokenStorageKey = 'access_token';
    private jwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient,
                private router: Router,
                private autoLogoutService: AutoLogoutService) {
    }

    authorize(credentials: Credentials): Observable<string> {
        return this.http.post<any>(this.url + '/login', {}, {
            headers: new HttpHeaders({
                login: credentials.login,
                pin: credentials.pin
            }),
            observe: 'response'
        })
            .pipe(
                map(loginResponse => loginResponse.headers.get(this.authTokenStorageKey))
            );
    }

    login(credentials: any): Observable<boolean> {
        return this.authorize(credentials).pipe(
            map(jwt => {
                if (jwt != undefined) {
                    // this.autoLogoutService.initializeTokenMonitoring();
                    localStorage.setItem(this.authTokenStorageKey, jwt);
                    return true;
                }

                return false;
            }),
            catchError((error) => {
                console.log(error);
                return of(false);
            })
        );
    }

    isLoggedIn(): boolean {
        return !this.jwtHelperService.isTokenExpired(this.getAuthorizationToken());
    }

    logout() {
        this.autoLogoutService.resetMonitoringConfig();
        localStorage.removeItem(this.authTokenStorageKey);
        this.router.navigate(['/logout']);
    }

    getAuthorizationToken(): string {
        return localStorage.getItem(this.authTokenStorageKey);
    }

    register(tppInfo: TppInfo): Observable<any> {
        return this.http.post(this.url + '/register', tppInfo);
    }
}
