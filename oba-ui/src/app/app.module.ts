import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ResultPageComponent} from './result-page/result-page.component';
import {TanSelectionComponent} from './ais/consent/tan-selection/tan-selection.component';
import {BankOfferedComponent} from './ais/consent/bank-offered/bank-offered.component';
import {AccountDetailsComponent } from './account-details/account-details.component';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ResultPageComponent,
        TanSelectionComponent,
        BankOfferedComponent,
        AccountDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ModalModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
      ResultPageComponent
    ]
})
export class AppModule {
}
