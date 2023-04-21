import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding,
    Inject
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UsuarioServiceService} from '@services/usuario-service.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';

    public loginForm: FormGroup;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private _userService : UsuarioServiceService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            usuario: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

    loginByAuth() {
        if (this.loginForm.valid) {
            const auth : any = {
                usuario : this.loginForm.get('usuario')?.value,
                password : this.loginForm.get('password')?.value
            };

            console.log(auth);
            this._userService.login(auth).subscribe(data => {
                console.log("Autentificacion");
                console.log(data[0]);
                localStorage.setItem("usuario", JSON.stringify(data[0]));
                this.router.navigate(['/']);
            }, error => {
                this.toastr.error(error.error.text);
            });
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnDestroy() {

    }
}
