import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsuarioServiceService} from '@services/usuario-service.service';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    public user;
    public modules : any[] = [];

    constructor(public _userService: UsuarioServiceService) {
        this.user = this._userService.getCurrentUser();
    }

    ngOnInit() {
        this.obtenerModulos();
    }

    obtenerModulos(){
        const rol : any = {
            rol : this.user.tipo
        };
        this._userService.modules(rol).subscribe(data => {
            for (let value of data[0]){
                this.modules.push(value.nombre);
            }
        });
    }

    checkPermission(p: string): boolean {
        let hasPermission = false;
        if(this.user){
            for(const checkPermission of this.modules){
                const permissionFound = this.modules.find(() =>{
                    return (p.toUpperCase() === checkPermission.toUpperCase());
                });

                if(permissionFound){
                    hasPermission = true;
                    break;
                }
            }
        }
        return hasPermission;
    }
}
