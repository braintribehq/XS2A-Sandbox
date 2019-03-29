import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {AUTH_RESPONSE, URL_PARAMS_PROVIDER} from '../common/constants/constants';
import {RoutingPath} from '../common/models/routing-path.model';
import {AisService} from '../common/services/ais.service';
import {ShareDataService} from '../common/services/share-data.service';
import {ObaUtils} from '../common/utils/oba-utils';
import {catchError} from "rxjs/operators";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    invalidCredentials: boolean;

    private subscriptions: Subscription[] = [];
    private authorisationId: string;
    private encryptedConsentId: string;
    private overlayRef: OverlayRef;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private aisService: AisService,
                private shareService: ShareDataService,
                private overlay: Overlay,
                @Inject(URL_PARAMS_PROVIDER) params) {
        this.encryptedConsentId = params.encryptedConsentId;
        this.authorisationId = params.authorisationId;

      // this.overlayRef = this.overlay.create({
      //   hasBackdrop: false,
      //   scrollStrategy: this.overlay.scrollStrategies.noop(),
      //   positionStrategy: this.overlay.position().global().right(this.CORNER_OFFSET).bottom(this.CORNER_OFFSET)
      // });
    }

    public ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        login: ['', Validators.required],
        pin: ['', Validators.required]
      });
    }

    public onSubmit(): void {
        if (!!this.encryptedConsentId) {
            this.subscriptions.push(
                this.aisService.aisAuthorise({
                    ...this.loginForm.value,
                    encryptedConsentId: this.encryptedConsentId,
                    authorisationId: this.authorisationId,
                }).subscribe(authorisationResponse => {
                    this.shareService.changeData(authorisationResponse);
                    this.router.navigate([`${RoutingPath.BANK_OFFERED}`],
                        ObaUtils.getQueryParams(this.encryptedConsentId, this.authorisationId));
                }, (error) => {
                  console.log(error);
                  this.invalidCredentials = true;
                })
            );
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
