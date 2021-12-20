import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Logger } from '@nsalaun/ng-logger';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppMissingTranslationHandler implements MissingTranslationHandler {
  constructor(private logger: Logger) { }
  handle(params: MissingTranslationHandlerParams) {
    const Data: any = params.interpolateParams;
    if (params.key === 'Button.Confirm') {
      return 'Confirm';
    }

    if (params.key.includes('ApiError.') && params.key !== 'ApiError.ServiceError.Unknown') {
      this.logger.info('MissingTranslation', params.key, Data);
      return Data ? params.translateService.instant('ApiError.ServiceError.Unknown', { recordId: Data.recordId }) :
        params.translateService.instant('ApiError.ServiceError.Network');
    }
  }
}
