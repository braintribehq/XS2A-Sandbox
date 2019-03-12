import {Injectable} from '@angular/core';
import {PSUAISService} from "../../../../api/services/psuais.service";
import {Observable} from "rxjs/internal/Observable";
import {ConsentAuthorizeResponse} from "../../../../api/models/consent-authorize-response";
import LoginUsingPOSTParams = PSUAISService.LoginUsingPOSTParams;

@Injectable({
  providedIn: 'root'
})
export class AisService {
   aisAuth :PSUAISService.AisAuthUsingGETParams;

  constructor(private aisService: PSUAISService) {
  }
   public loginUsingAuthorizationId(params: LoginUsingPOSTParams): Observable<ConsentAuthorizeResponse> {
      console.log('LoginUsingPOSTParams: ', params);
    return this.aisService.loginUsingPOST(params);
   }

}
