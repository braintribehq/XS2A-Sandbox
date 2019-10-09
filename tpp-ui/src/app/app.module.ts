import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModalModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {FileUploadModule} from 'ng2-file-upload';
import {FilterPipeModule} from 'ngx-filter-pipe';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DocumentUploadComponent} from './commons/document-upload/document-upload.component';
import {FooterComponent} from './commons/footer/footer.component';
import {IconModule} from './commons/icon/icon.module';
import {InfoModule} from './commons/info/info.module';
import {NavbarComponent} from './commons/navbar/navbar.component';
import {SidebarComponent} from './commons/sidebar/sidebar.component';
import {AccountAccessManagementComponent,} from './components/account-access-management/account-access-management.component';
import {AccountDetailComponent} from './components/account-detail/account-detail.component';
import {AccountListComponent} from './components/account-list/account-list.component';
import {AccountComponent} from './components/account/account.component';
import {CertificateComponent} from './components/auth/certificate/certificate.component';
import {ConfirmNewPasswordComponent} from './components/auth/confirm-new-password/confirm-new-password.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';
import {CashDepositComponent} from './components/cash-deposit/cash-deposit.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TestDataGenerationComponent} from './components/testDataGeneration/test-data-generation.component';
import {UserCreateComponent} from './components/users/user-create/user-create.component';
import {UserDetailsComponent} from './components/users/user-details/user-details.component';
import {UserUpdateComponent} from './components/users/user-update/user-update.component';
import {UsersComponent} from './components/users/users.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {GlobalErrorsHandler} from './interceptors/global-errors-handler';
import {ConvertBalancePipe} from './pipes/convertBalance.pipe';
import {AutoLogoutService} from './services/auto-logout.service';
import {UploadFileComponent} from './uploadFile/uploadFile.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserProfileUpdateComponent} from './components/user-profile-update/user-profile-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AccountListComponent,
    AccountDetailComponent,
    NotFoundComponent,
    CashDepositComponent,
    UsersComponent,
    UserDetailsComponent,
    UserCreateComponent,
    AccountComponent,
    UploadFileComponent,
    DocumentUploadComponent,
    SettingsComponent,
    TestDataGenerationComponent,
    AccountAccessManagementComponent,
    ResetPasswordComponent,
    ConfirmNewPasswordComponent,
    UserUpdateComponent,
    CertificateComponent,
    ConvertBalancePipe,
    UserProfileUpdateComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    InfoModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FileUploadModule,
    FilterPipeModule,
    NgHttpLoaderModule.forRoot(),
    NgbModalModule,
    BrowserModule,
    NgbPaginationModule
  ],
  providers: [
    AutoLogoutService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorsHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
