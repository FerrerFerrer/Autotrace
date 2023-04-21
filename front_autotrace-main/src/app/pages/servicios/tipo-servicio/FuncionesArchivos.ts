import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FuncionesArchivos{
  constructor(){}

  obtenerExtencoinArchivo(tipo: string) {
    switch (tipo) {
        case 'application/msword':
            return 'doc';
        case 'application/vnd.ms-word.document.macroEnabled.12':
            return 'docm';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docx';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
            return 'dotx';
        case 'application/vnd.ms-word.template.macroEnabled.12':
            return 'dotm';
        case 'text/html':
            return 'html';
        case 'application/pdf':
            return 'pdf';
    }
}


download(response: any, fileName: string) {
  const dataType = response.type;
  const binaryData = [];
  binaryData.push(response);

  const filePath = window.URL.createObjectURL(
      new Blob(binaryData, {type: dataType})
  );
  const downloadLink = document.createElement('a');
  downloadLink.href = filePath;
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

}
