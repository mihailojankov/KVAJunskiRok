import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { UsersComponent } from './Components/users/users.component';
import {AuthGuard } from './auth.guard'
import { SecondComponent } from './Components/second/second.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { SecondDetailsComponent } from './Components/second-details/second-details.component';
import { ChartComponent } from './Components/chart/chart.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ["ROLE_ADMIN", "ROLE_USER"]
    }
  },
  {
    path: "second",
    component: SecondComponent
  },
  {
    path: "users/detaljiUser",
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ["ROLE_ADMIN", "ROLE_USER"]
    }
  },
  {
    path: "second/detaljiSecond",
    component: SecondDetailsComponent
  },
  {
    path:"chart",
    component: ChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
