import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Renderer2
} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {UsuarioServiceService} from '@services/usuario-service.service';
import {LocalidadesService} from '@services/localidades.service';
import {MapadistribucionComponent} from '@pages/mapadistribucion/mapadistribucion.component';
import {SelectLocalidadService} from '@services/select-localidad.service';
@Component({
    providers: [MapadistribucionComponent],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
    
    public searchForm: FormGroup;
    public localidades: any[] = [];
    public user;
    public localidadSeleccionada;

    constructor(
        private _localidadesService: LocalidadesService,
        private _userService: UsuarioServiceService,
        private mapadiscomp: MapadistribucionComponent,
        private render: Renderer2,
        private selectService: SelectLocalidadService
    ) {
        this.searchForm = new FormGroup({
            IdLocalidades: new FormControl()
        });
    }

    ngOnInit() {
        this.user = this._userService.getCurrentUser();
        console.log(this.user);
        this.obtenerLocalidades();
        this.searchForm.controls['IdLocalidades'].setValue(
            localStorage.getItem('idlocalidad')
        );

        this.searchForm.patchValue({
            IdLocalidades: localStorage.getItem('idlocalidad')
        });
    }

    public obtenerLocalidades() {

        this._userService
            .obtenerLocalidadesUsuario(this.user.idusuario)
            .subscribe(
                (data) => {
                    this.localidades = data[0];
                    console.log(data[0]);
                    if (!localStorage.getItem('idlocalidad')) {
                        localStorage.setItem(
                            'idlocalidad',
                            this.localidades[0].idlocalidad
                        );
                        this.searchForm.patchValue({
                            IdLocalidades: localStorage.getItem('idlocalidad')
                        });

                        this.selectService.cambioLocalidad.emit(
                            this.localidadSeleccionada
                        );
                    } else {
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public obtenerLocalidad(e: any) {
        this.localidadSeleccionada = e.target.value;
        localStorage.setItem('idlocalidad', this.localidadSeleccionada);
        this.selectService.cambioLocalidad.emit(this.localidadSeleccionada);
    }
}
