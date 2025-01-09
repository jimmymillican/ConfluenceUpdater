import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';

const routes: Routes = [
  { path: 'bulk-update', component: BulkUpdateComponent } ,  // Saved forms page
  
  { path: '', redirectTo: '/bulk-update', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }