
import { ErrorPageComponent } from '@layout/pages/error-page/error-page.component';
import { LandingPageComponent } from '@layout/pages/landing-page/landing-page.component';
import {
  EIndependentPage,
} from '@utilities/enums/route.enum';
import { IRouteConfig } from '@utilities/interfaces/common.interface';


/**
 * @description 主架構外的獨立頁面
 */
export const IndependentPageMap = new Map<EIndependentPage, IRouteConfig>([
  [EIndependentPage.Welcome, { path: 'welcome', component: LandingPageComponent }],
  [EIndependentPage.PageNotFound, { path: '404', component: ErrorPageComponent }]
]);
