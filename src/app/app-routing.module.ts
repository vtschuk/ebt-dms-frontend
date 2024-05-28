import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FileViewComponent} from './components/file-view/file-view.component';
import {FileEditComponent} from './components/file-edit/file-edit.component';
import {FileOverviewComponent} from './components/file-overview/file-overview.component';
import {AdminViewComponent} from "./components/admin-view/admin-view.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {LoginViewComponent} from "./components/login-view/login-view.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginViewComponent},
  {path: 'view', component: FileOverviewComponent, canActivate: [AuthGuard]},
  {path: 'akte/:id', component: FileEditComponent, canActivate: [AuthGuard]},
  {path: 'overview/:id', component: FileViewComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminViewComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
