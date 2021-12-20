import { IndependentPageMap } from '@utilities/maps/route.map';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EIndependentPage } from '@utilities/enums/route.enum';


const routes: Routes = [{
  path: '',
  children: []
},
{ ...IndependentPageMap.get(EIndependentPage.Welcome) },
{ ...IndependentPageMap.get(EIndependentPage.PageNotFound) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
