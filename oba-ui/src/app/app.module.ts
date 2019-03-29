import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {OverlayModule} from '@angular/cdk/overlay';

import {AccountDetailsComponent} from './account-details/account-details.component';
import {BankOfferedComponent} from './bank-offered/bank-offered.component';
import {ScaSelectionComponent} from './sca-selection/sca-selection.component';
import {TanConfirmationComponent} from './tan-confirmation/tan-confirmation.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthInterceptor} from './common/interceptors/AuthInterceptor';
import {AisService} from './common/services/ais.service';
import {ShareDataService} from './common/services/share-data.service';
import {LoginComponent} from './login/login.component';
import {ResultPageComponent} from './result-page/result-page.component';
import {ObaErrorsHandler} from "./common/interceptors/ObaErrorsHandler";
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './spinner-overlay/spinner/spinner.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ResultPageComponent,
        TanConfirmationComponent,
        BankOfferedComponent,
        AccountDetailsComponent,
        ScaSelectionComponent,
        SpinnerOverlayComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        OverlayModule
    ],
    providers: [
        AisService,
        ShareDataService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: ObaErrorsHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
