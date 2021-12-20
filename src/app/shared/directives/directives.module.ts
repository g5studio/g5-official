import { TooltipDirective } from './tooltip.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { ResponsiveViewportDirective } from './responsive-viewport.directive';
import { ActivatedDialogDirective } from './activated-dialog.directive';



@NgModule({
  declarations: [
    HighlightDirective,
    TooltipDirective,
    ResponsiveViewportDirective,
    ActivatedDialogDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    TooltipDirective,
    ResponsiveViewportDirective,
    ActivatedDialogDirective
  ]
})
export class DirectivesModule { }
