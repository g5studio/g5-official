import { catchError, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';
import { EDomain, EModalType } from '@utilities/enums/common.enum';
import { environment } from 'src/environments/environment';
import { ModalComponent } from '@shared/overlay/modal/modal.component';

export interface HttpOptions {
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private $overlay: OverlayService,
  ) { }


  public request(type: EDomain, hideLoading?: boolean) {
    const Domain = environment[type];
    return {
      get: (url: string, options: HttpOptions = {}) => this.get(url, options, Domain),
      post: (url: string, params = {}, options: HttpOptions = {}) => this.post(url, params, options, Domain),
      create: (url: string, formData: FormData, options: HttpOptions = {}) => this.create(url, Domain, formData, options, hideLoading)
    };
  }

  private create(url: string, domain: string, formData: FormData, options = {}, hideLoading?: boolean) {
    const LoadingId = !hideLoading ? this.$overlay.startLoading() : null;
    return this.http.request(
      new HttpRequest(
        'POST',
        `${domain}/${url}`,
        formData,
        { ...options, ... { headers: this.getHeader() } }
      )
    ).pipe(
      tap((res) => {
        if (res.type === HttpEventType.Response && !hideLoading) {
          this.$overlay.finishLoading(LoadingId);
        }
      }),
      catchError(error => {
        this.errorHandler(LoadingId, error);
        throw error;
      })
    );
  }

  private get(url: string, options, domain) {
    const LoadingId = this.$overlay.startLoading();
    return this.http.get(`${domain}/${url}`, { ...options, ... { headers: this.getHeader() } }).pipe(
      tap(() => this.$overlay.finishLoading(LoadingId)),
      catchError(
        error => {
          this.errorHandler(LoadingId, error);
          throw error;
        }
      )
    );
  }

  private post(url: string, params, options, domain) {
    const LoadingId = this.$overlay.startLoading();
    return this.http.post(`${domain}/${url}`, params, { ...options, ... { headers: this.getHeader() } }).pipe(
      tap(() => this.$overlay.finishLoading(LoadingId)),
      catchError(
        error => {
          this.errorHandler(LoadingId, error);
          throw error;
        }
      )
    );
  }

  private getHeader() {
    return new HttpHeaders().set(
      `Authorization`,
      `Bearer ${sessionStorage.getItem('access_token')}`
    );
  }

  private errorHandler(loadingId: string, error: any) {
    this.$overlay.finishLoading(loadingId);
    switch (error.status) {
      case 403:
        this.$overlay.toggleDialog(ModalComponent, {
          config: {
            content: 'ApiError.ServiceError.AccessDenied',
            type: EModalType.Alert,
            cancel: 'Button.Confirm',
          }
        });
        break;
      case 401:
        this.$overlay.toggleDialog(ModalComponent, {
          config: {
            content: 'ApiError.ServiceError.Authorization',
            type: EModalType.Alert,
            cancel: 'Button.Confirm',
          },
          // callbacks: { cancel: () => this.$auth.logout() }
        });
        break;
      default:
        this.$overlay.toggleDialog(ModalComponent, {
          config: {
            content: 'ApiError.ServiceError.Network',
            type: EModalType.Alert,
            cancel: 'Button.Confirm',
          }
        });
    }
  }
}
