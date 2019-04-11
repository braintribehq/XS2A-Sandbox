import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {combineLatest} from "rxjs";
import JSZip from 'jszip';

import {AuthService} from "../../../services/auth.service";
import {CertGenerationService} from "../../../services/cert-generation.service";
import {InfoService} from "../../../commons/info/info.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../auth.component.css']
})
export class RegisterComponent implements OnInit {

    public userForm: FormGroup;
    public certificateValue = {};

    public generateCertificate: boolean;
    public submitted: boolean;
    public errorMessage: string; //TODO: errors handling with error interceptor

    constructor(private service: AuthService,
                private certGenerationService: CertGenerationService,
                private infoService: InfoService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initializeRegisterForm();
    }

    getCertificateValue(event) {
        this.certificateValue = event;
    }

    public onSubmit(): void {

        const branch = this.userForm.get('branch').value;
        this.submitted = true;

        if (this.generateCertificate && this.certificateValue) {
            // combine observables
            combineLatest([
                this.service.register(this.userForm.value, branch),
                this.certGenerationService.generate(this.certificateValue)
            ]).subscribe((combinedData: any) => {

                // get cert generation params
                const encodedCert = combinedData[1].encodedCert;
                const privateKey = combinedData[1].privateKey;

                this.createZipUrl(encodedCert, privateKey).then(url =>
                    this.router.navigate(['/login'])
                        .then(() => {

                            this.infoService.openFeedback(`You have been successfully registered and your certificate generated.
                            The download will start automatically within the 2 seconds`);

                            setTimeout(() => {
                                this.downloadFile(url);
                            }, 2000, url)

                        })
                );
            });
        } else {
            this.service.register(this.userForm.value, branch)
                .subscribe(() => {
                    this.router.navigate(['/login'])
                        .then(() => {
                            this.infoService.openFeedback(`You have been successfully registered.`);
                        });
                }, () => {
                    this.infoService.openFeedback('TPP with this login or email exists already', {
                        severity: 'error'
                    })
                });

        }
    }

    private navigateAndGiveFeedback(url: string, message: string) {
        this.router.navigate(['/login'])
            .then(() => {
                this.infoService.openFeedback(message);
                if (url) {
                    setTimeout(() => {
                        this.downloadFile(url);
                    }, 2000, url)
                }
            })
    }

    private generateZipFile(certBlob, keyBlob): Promise<any> {
        const zip = new JSZip();
        zip.file('certificate.pem', certBlob);
        zip.file('private.key', keyBlob);
        return zip.generateAsync({type: 'blob'});
    }

    private initializeRegisterForm(): void {
        this.userForm = this.formBuilder.group({
            branch: ['', Validators.required],
            login: ['', Validators.required],
            email: ['', Validators.required],
            pin: ['', Validators.required]
        });
    }

    private createZipUrl(encodedCert: string, privateKey: string): Promise<string> {
        const blobCert = new Blob([encodedCert], {
            type: 'text/plain',
        });
        const blobKey = new Blob([privateKey], {
            type: 'text/plain',
        });
        return this.generateZipFile(blobCert, blobKey).then(
            zip => {
                return window.URL.createObjectURL(zip);
            }
        );
    }

    private downloadFile(url: string) {
        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', 'psu_cert.zip');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}
