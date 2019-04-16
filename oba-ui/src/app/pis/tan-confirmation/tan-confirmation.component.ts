import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PisService} from "../../common/services/pis.service";
import {ShareDataService} from "../../common/services/share-data.service";
import {RoutingPath} from "../../common/models/routing-path.model";
import {PaymentAuthorizeResponse} from "../../api/models";
import {PSUPISCancellationService} from "../../api/services/psupiscancellation.service";
import AuthorisePaymentUsingPOSTParams = PSUPISCancellationService.AuthorisePaymentUsingPOSTParams;

@Component({
  selector: 'app-tan-confirmation',
  templateUrl: './tan-confirmation.component.html',
  styleUrls: ['./tan-confirmation.component.scss']
})
export class TanConfirmationComponent implements OnInit, OnDestroy {

  public authResponse: PaymentAuthorizeResponse;
  public tanForm: FormGroup;
  public invalidTanCount = 0;

  private subscriptions: Subscription[] = [];
  private operation: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private pisService: PisService,
              private shareService: ShareDataService) {
  }

  public ngOnInit(): void {

    this.initTanForm();

    // get query params
    this.shareService.currentOperation
      .subscribe((operation: string) => {
        this.operation = operation;
      });

    // fetch data that we save before after login
    this.shareService.currentData.subscribe(data => {
      if (data) {
        console.log('response object: ', data);
        this.shareService.currentData.subscribe(authResponse => this.authResponse = authResponse);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public onSubmit(): void {
    if (!this.authResponse) {
      console.log('Missing application data');
      return;
    }
    console.log('TAN: ' + this.tanForm.value);

    this.subscriptions.push(
      this.pisService.authorizePayment({
        ...this.tanForm.value,
        encryptedPaymentId: this.authResponse.encryptedConsentId,
        authorisationId: this.authResponse.authorisationId,
      } as AuthorisePaymentUsingPOSTParams).subscribe(authResponse => {
        console.log(authResponse);
        this.router.navigate([`${RoutingPath.PAYMENT_INITIATION}/${RoutingPath.RESULT}`], {
          queryParams: {
            encryptedConsentId: this.authResponse.encryptedConsentId,
            authorisationId: this.authResponse.authorisationId,
          }
        }).then(() => {
          this.authResponse = authResponse;
          this.shareService.changeData(this.authResponse);
        });
      }, (error) => {
        this.invalidTanCount++;

        if (this.invalidTanCount >= 3) {
          this.router.navigate([`${RoutingPath.PAYMENT_INITIATION}/${RoutingPath.RESULT}`], {
            queryParams: {
              encryptedConsentId: this.authResponse.encryptedConsentId,
              authorisationId: this.authResponse.authorisationId,
            }
          }).then(() => {
            throw error;
          });
        }
      })
    );
  }

  public onCancel(): void {
    this.router.navigate([`${RoutingPath.PAYMENT_INITIATION}/${RoutingPath.RESULT}`], {
      queryParams: {
        encryptedConsentId: this.authResponse.encryptedConsentId,
        authorisationId: this.authResponse.authorisationId
      }
    });
  }

  private initTanForm(): void {
    this.tanForm = this.formBuilder.group({
      authCode: ['', Validators.required]
    });
  }

}
