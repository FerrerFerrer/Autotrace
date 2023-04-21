import {
    Component,
    OnInit,
    ViewChild,
    HostListener,
    ElementRef,
    Renderer2
} from '@angular/core';
import { UsuarioServiceService } from '@services/usuario-service.service';
import { Router } from '@angular/router';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user-dropdown-menu',
    templateUrl: './user-dropdown-menu.component.html',
    styleUrls: ['./user-dropdown-menu.component.scss']
})
export class UserDropdownMenuComponent implements OnInit {
    public user;

    @ViewChild('dropdownMenu', {static: false}) dropdownMenu;
    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.hideDropdownMenu();
        }
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private _usuarioService : UsuarioServiceService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.user = this._usuarioService.getCurrentUser();
    }

    toggleDropdownMenu() {
        if (this.dropdownMenu.nativeElement.classList.contains('show')) {
            this.hideDropdownMenu();
        } else {
            this.showDropdownMenu();
        }
    }

    showDropdownMenu() {
        this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
    }

    hideDropdownMenu() {
        this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
    }

    logout() {
        this._usuarioService.cerrarSesion(this.user.idusuario).subscribe(data => {
            localStorage.removeItem('usuario');
            localStorage.removeItem('idlocalidad');
            this.router.navigate(['/login']);
        }, err => {console.log(err);});
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
