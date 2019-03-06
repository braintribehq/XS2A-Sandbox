/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AuthorizeResponse } from '../models/authorize-response';

/**
 * Provides access to one time password for strong customer authentication.
 */
@Injectable({
  providedIn: 'root',
})
class PSUSCAService extends __BaseService {
  static readonly loginUsingPOST2Path = '/sca/login';
  static readonly validateAuthCodeUsingPOSTPath = '/sca/{scaId}/authorisation/{authorisationId}/authCode';
  static readonly selectMethodUsingPOST2Path = '/sca/{scaId}/authorisation/{authorisationId}/methods/{methodId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `PSUSCAService.LoginUsingPOST2Params` containing the following parameters:
   *
   * - `pin`: pin
   *
   * - `login`: login
   *
   * @return OK
   */
  loginUsingPOST2Response(params: PSUSCAService.LoginUsingPOST2Params): __Observable<__StrictHttpResponse<AuthorizeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.pin != null) __params = __params.set('pin', params.pin.toString());
    if (params.login != null) __params = __params.set('login', params.login.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + PSUSCAService.loginUsingPOST2Path,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthorizeResponse>;
      })
    );
  }
  /**
   * @param params The `PSUSCAService.LoginUsingPOST2Params` containing the following parameters:
   *
   * - `pin`: pin
   *
   * - `login`: login
   *
   * @return OK
   */
  loginUsingPOST2(params: PSUSCAService.LoginUsingPOST2Params): __Observable<AuthorizeResponse> {
    return this.loginUsingPOST2Response(params).pipe(
      __map(_r => _r.body as AuthorizeResponse)
    );
  }

  /**
   * @param params The `PSUSCAService.ValidateAuthCodeUsingPOSTParams` containing the following parameters:
   *
   * - `scaId`: scaId
   *
   * - `authorisationId`: authorisationId
   *
   * - `authCode`: authCode
   *
   * - `Cookie`: Cookie
   *
   * @return OK
   */
  validateAuthCodeUsingPOSTResponse(params: PSUSCAService.ValidateAuthCodeUsingPOSTParams): __Observable<__StrictHttpResponse<AuthorizeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.authCode != null) __params = __params.set('authCode', params.authCode.toString());
    if (params.Cookie != null) __headers = __headers.set('Cookie', params.Cookie.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/sca/${params.scaId}/authorisation/${params.authorisationId}/authCode`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthorizeResponse>;
      })
    );
  }
  /**
   * @param params The `PSUSCAService.ValidateAuthCodeUsingPOSTParams` containing the following parameters:
   *
   * - `scaId`: scaId
   *
   * - `authorisationId`: authorisationId
   *
   * - `authCode`: authCode
   *
   * - `Cookie`: Cookie
   *
   * @return OK
   */
  validateAuthCodeUsingPOST(params: PSUSCAService.ValidateAuthCodeUsingPOSTParams): __Observable<AuthorizeResponse> {
    return this.validateAuthCodeUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as AuthorizeResponse)
    );
  }

  /**
   * @param params The `PSUSCAService.SelectMethodUsingPOST2Params` containing the following parameters:
   *
   * - `scaId`: scaId
   *
   * - `methodId`: methodId
   *
   * - `authorisationId`: authorisationId
   *
   * - `Cookie`: Cookie
   *
   * @return OK
   */
  selectMethodUsingPOST2Response(params: PSUSCAService.SelectMethodUsingPOST2Params): __Observable<__StrictHttpResponse<AuthorizeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    if (params.Cookie != null) __headers = __headers.set('Cookie', params.Cookie.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/sca/${params.scaId}/authorisation/${params.authorisationId}/methods/${params.methodId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthorizeResponse>;
      })
    );
  }
  /**
   * @param params The `PSUSCAService.SelectMethodUsingPOST2Params` containing the following parameters:
   *
   * - `scaId`: scaId
   *
   * - `methodId`: methodId
   *
   * - `authorisationId`: authorisationId
   *
   * - `Cookie`: Cookie
   *
   * @return OK
   */
  selectMethodUsingPOST2(params: PSUSCAService.SelectMethodUsingPOST2Params): __Observable<AuthorizeResponse> {
    return this.selectMethodUsingPOST2Response(params).pipe(
      __map(_r => _r.body as AuthorizeResponse)
    );
  }
}

module PSUSCAService {

  /**
   * Parameters for loginUsingPOST2
   */
  export interface LoginUsingPOST2Params {

    /**
     * pin
     */
    pin: string;

    /**
     * login
     */
    login: string;
  }

  /**
   * Parameters for validateAuthCodeUsingPOST
   */
  export interface ValidateAuthCodeUsingPOSTParams {

    /**
     * scaId
     */
    scaId: string;

    /**
     * authorisationId
     */
    authorisationId: string;

    /**
     * authCode
     */
    authCode: string;

    /**
     * Cookie
     */
    Cookie: string;
  }

  /**
   * Parameters for selectMethodUsingPOST2
   */
  export interface SelectMethodUsingPOST2Params {

    /**
     * scaId
     */
    scaId: string;

    /**
     * methodId
     */
    methodId: string;

    /**
     * authorisationId
     */
    authorisationId: string;

    /**
     * Cookie
     */
    Cookie: string;
  }
}

export { PSUSCAService }
