import {Component, Input, OnInit} from '@angular/core';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {UploadOptions, UploadService} from '../../services/upload.service';

@Component({
    selector: 'app-document-upload',
    templateUrl: './document-upload.component.html',
    styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

    // Object for uploading
    public uploader: FileUploader;

    // Options for uploading
    @Input() options: UploadOptions;

    hasBaseDropZoneOver: boolean = true;

    constructor(private uploadService: UploadService) {
    }

    public get acceptedMimes(): string {
        return (this.options && this.options.allowedMimeType)
            ? this.options.allowedMimeType.join(',')
            : null;
    }

    public ngOnInit(): void {
        this.uploader = this.uploadService.createInstanceFileUploader(this.options);

        /* Ensure again that the number of up-to-load file is always one and get the image path for preview */
        this.uploader.onAfterAddingFile = (item) => this.onAfterAddingFile(item);

        this.uploader.onCompleteItem = (item: FileItem, response: string, status, headers) => {
            if (this.options.methodAfterSuccess && typeof this.options.methodAfterSuccess === 'function') {
                this.options.methodAfterSuccess(item, response);
            }
            alert('Successfull uploaded');
        };

        this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
            if (filter.name === 'mimeType' || filter.name === 'fileSize') {
                let extensions = '';
                if (this.options.allowedMimeType) {
                    this.options.allowedMimeType.forEach((extension: string) => {
                        extensions = extensions + extension.split('/').pop() + ', ';
                    });
                }
                const params: any = {
                    file: item.name,
                    extensions: extensions
                };
                const message: string = 'ERROR UPLOAD' + filter.name;
                alert(message);
            }
        };
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    onAfterAddingFile(item: FileItem): void {
        if (this.options.queueLimit === 1) {
            if (this.uploader.queue.length > 1) {
                this.uploader.removeFromQueue(this.uploader.queue[0]);
            }
        }
    }
}
