import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Util{

    static quitarCaracteresEspeciales(event){
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z0-9-_. ]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    static quitarCaracteresEspecialesNoEspacios(event){
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z0-9-_.]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
           return null;
        }
        const valid = regex.test(control.value);
        return valid ? null : error;
      };
    }
}
