import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AlertService } from '../../shared/services/alerts.servise';
import { UserService } from '../../shared/services/user.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { MustMatch } from './match.validator';
import { ModalService } from 'src/app/shared/services/modal.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    result: string;

    context: CanvasRenderingContext2D;

    @ViewChild('previewAvatar') previewAvatar;

    preview(e: any): void {
        const canvas = this.previewAvatar.nativeElement;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, 225, 225);

        const render = new FileReader();
        render.onload = function(event: any) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
            };
            img.src = event.target.result;
        };
        render.readAsDataURL(e.target.files[0]);
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        public dialog: MatDialog,
        private matDialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public modalService: ModalService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/account']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            brandOfBike: ['', Validators.required],
            modelOfBike: ['', Validators.required],
            gender: ['', Validators.required],
            country: ['', Validators.required],
            sity: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            checkbox: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        }
        );
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.modalService.close('custom-modal-2');
                    this.dialog.open(LoginComponent);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    public openModalLog() {
        this.modalService.close('custom-modal-2');
        this.dialog.open(LoginComponent);
    }
}
