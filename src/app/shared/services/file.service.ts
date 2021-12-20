import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpOptions, HttpService } from '@shared/services/http.service';
import { EDomain } from '@utilities/enums/common.enum';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private $http: HttpService
  ) { }

  public download(domain: EDomain, url: string, fileName: string, fileType: string, options?: HttpOptions, type = 'application/pdf') {
    this.$http.request(domain).get(url, options).subscribe(
      res => {
        const Type = fileType.toLocaleLowerCase();
        const FileName = fileType.length > 0 ? `${fileName}.${Type}` : fileName;
        const ObjUrl = URL.createObjectURL(new File([res], FileName, { type }));
        const a = document.createElement('a');
        a.href = ObjUrl;
        a.download = FileName;
        a.click();
        URL.revokeObjectURL(ObjUrl);
      }
    );
  }

  public upload(domain: EDomain, url: string, formData: FormData, hideLoading = false) {
    return this.$http
      .request(domain, hideLoading)
      .create(url, formData, { reportProgress: true, responseType: 'text', withCredentials: false });
  }

  public viewDocument(domain: EDomain, url: string, options: HttpOptions) {
    this.$http.request(domain).get(url, options).subscribe(
      res => {
        const DOMAIN = environment[domain];
        const URL = `${DOMAIN.split('/')[0]}//${DOMAIN.split('/')[2]}${res}`;
        window.open(URL);
      }
    );
  }
}


