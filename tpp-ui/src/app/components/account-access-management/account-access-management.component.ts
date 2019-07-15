import {Component, OnInit} from '@angular/core';
import {Account} from "../../models/account.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../services/account.service";

@Component({
    selector: 'app-account-access-management',
    templateUrl: './account-access-management.component.html',
    styleUrls: ['./account-access-management.component.scss']
})
export class AccountAccessManagementComponent implements OnInit {

    users: User[];
    account: Account;
    subscription = new Subscription();

    accountAccessForm: FormGroup;

    submitted = false;
    errorMessage = null;
    roles = ['OWNER', 'READ', 'DISPOSE'];

    constructor(private userService: UserService,
                private accountService: AccountService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute) {

        this.route.params.subscribe(params => {
            this.accountService.getAccount(params.id).subscribe((account: Account) => {
                this.account = account;
            })
        });
    }

    ngOnInit() {
        this.listUsers();
        this.setupAccountAccessFormControl();
    }

    setupAccountAccessFormControl(): void {
        this.accountAccessForm = this.formBuilder.group({
            iban: [''],
            userId: ['', Validators.required],
            scaWeight: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
            role: ['READ', [Validators.required]]
        });
    }

    listUsers() {
        this.userService.listUsers().subscribe((users: User[]) => {
            this.users = users;
        })
    }

    onSubmit() {
        this.submitted = true;
        if (this.accountAccessForm.invalid) {
            return;
        }

        this.accountAccessForm.get('iban').setValue(this.account.iban);
        this.accountService.updateAccountAccessForUser(this.accountAccessForm.getRawValue()).subscribe(response => {
            console.log(response);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
