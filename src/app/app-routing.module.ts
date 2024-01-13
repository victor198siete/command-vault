import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  { path: '', redirectTo: '/dash', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent},
  { path: 'dash', component: DashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
