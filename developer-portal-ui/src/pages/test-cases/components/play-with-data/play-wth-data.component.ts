import { Component, Input, OnInit } from '@angular/core';
import { RestService } from '../../../../services/rest.service';
import { DataService } from '../../../../services/data.service';
import { getStatusText } from 'http-status-codes';

@Component({
  selector: 'app-play-wth-data',
  templateUrl: './play-wth-data.component.html',
  styleUrls: ['./play-wth-data.component.scss'],
})
export class PlayWthDataComponent implements OnInit {
  @Input() method: string;
  @Input() headers: object;
  @Input() body: object;
  @Input() url: string;
  @Input() paymentServiceFlag: boolean;
  @Input() paymentProductFlag: boolean;
  @Input() paymentIdFlag: boolean;
  @Input() cancellationIdFlag: boolean;
  @Input() consentIdFlag: boolean;
  @Input() authorisationIdFlag: boolean;
  @Input() variablePathEnd: string;

  response: object = {};
  finalUrl: string;
  paymentService = '';
  paymentProduct = '';
  paymentId = '';
  cancellationId = '';
  consentId = '';
  authorisationId = '';
  redirectUrl = '';

  paymentServiceSelect = ['payments', 'bulk-payments', 'periodic-payments'];
  paymentProductSelect = [
    'sepa-credit-transfers',
    'instant-sepa-credit-transfers',
    'target-2-payments',
    'cross-border-credit-transfers',
    'pain.001-sepa-credit-transfers',
    'pain.001-instant-sepa-credit-transfers',
    'pain.001-target-2-payments',
    'pain.001-cross-border-credit-transfers',
  ];

  constructor(
    public restService: RestService,
    public dataService: DataService
  ) {}

  /**
   * Get status text by status code
   * using http-status-codes library
   */
  getStatusText(status) {
    if (status) {
      return getStatusText(status);
    } else {
      return '';
    }
  }

  sendRequest() {
    this.dataService.isLoading = true;

    this.finalUrl = this.url;
    if (this.paymentServiceFlag) {
      this.finalUrl += this.paymentService + this.paymentProduct;

      this.finalUrl += this.paymentId ? '/' + this.paymentId : '';
      this.finalUrl += this.variablePathEnd ? this.variablePathEnd : '';
      this.finalUrl += this.authorisationId ? '/' + this.authorisationId : '';
      this.finalUrl += this.cancellationId ? '/' + this.cancellationId : '';
    } else if (this.consentIdFlag) {
      this.finalUrl += '/' + this.consentId;

      this.finalUrl += this.variablePathEnd ? this.variablePathEnd : '';
      this.finalUrl += this.authorisationId ? '/' + this.authorisationId : '';
    } else {
      this.finalUrl = this.url;
    }

    console.log(this.variablePathEnd);
    console.log('path: ', this.finalUrl);
    const respBodyEl = document.getElementById('textArea');
    if (!respBodyEl || this.isValidJSONString(respBodyEl['value'])) {
      const bodyValue = respBodyEl ? JSON.parse(respBodyEl['value']) : {};
      this.restService
        .sendRequest(this.method, this.finalUrl, this.headers, bodyValue)
        .subscribe(
          resp => {
            this.response = Object.assign(resp);
            if (this.response['body']._links.hasOwnProperty('scaRedirect')) {
              this.redirectUrl += this.response['body']._links.scaRedirect.href;
            }
            this.dataService.isLoading = false;
            this.dataService.showToast('Request sent', 'Success!', 'success');
          },
          err => {
            this.dataService.isLoading = false;
            this.dataService.showToast(
              'Something went wrong!',
              'Error!',
              'error'
            );
            this.response = Object.assign(err);
            console.log('err', JSON.stringify(err));
          }
        );
    } else {
      this.dataService.isLoading = false;
      this.dataService.showToast('Body in not valid!', 'Error!', 'error');
    }
  }

  // Check if text in body in JSON format
  isValidJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  // Fixing the loss of input focus
  trackByFn(index: any, item: any) {
    return index;
  }

  ngOnInit() {
    this.paymentService = this.paymentServiceFlag ? 'payments' : '';
    this.paymentProduct = this.paymentProductFlag
      ? '/sepa-credit-transfers'
      : '';
    this.paymentId = this.paymentIdFlag ? 'paymentId' : '';
    this.cancellationId = this.cancellationIdFlag ? 'cancellationId' : '';
    this.consentId = this.consentIdFlag ? 'consentId' : '';
    this.authorisationId = this.authorisationIdFlag ? 'authorisationId' : '';
  }
}
