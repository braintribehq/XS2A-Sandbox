import {Injectable} from '@angular/core';
import {PSUAISService} from "../../../../api/services/psuais.service";
import {Observable} from "rxjs/internal/Observable";
import {ConsentAuthorizeResponse} from "../../../../api/models/consent-authorize-response";
import LoginUsingPOSTParams = PSUAISService.LoginUsingPOSTParams;
import AisAuthUsingGETParams = PSUAISService.AisAuthUsingGETParams;
import {AuthorizeResponse} from "../../../../api/models";

@Injectable({
  providedIn: 'root'
})
export class AisService {
   // aisAuth :PSUAISService.AisAuthUsingGETParams;

  constructor(private aisService: PSUAISService) {
  }
   public loginUsingAuthorizationId(params: LoginUsingPOSTParams): Observable<ConsentAuthorizeResponse> {
      console.log('LoginUsingPOSTParams: ', params);
      return this.aisService.loginUsingPOST(params);
   }

  public aisAuth(params: AisAuthUsingGETParams): Observable<AuthorizeResponse> {
    return this.aisService.aisAuthUsingGET(params);
  }

}
