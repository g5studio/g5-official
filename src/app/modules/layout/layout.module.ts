import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { SharedModule } from '@shared/shared.module';
import { PermissionDeniedComponent } from './pages/permission-denied/permission-denied.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';



@NgModule({
  declarations: [
    LayoutComponent,
    ErrorPageComponent,
    PermissionDeniedComponent,
    LandingPageComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class LayoutModule { }
