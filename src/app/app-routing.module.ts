import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard} from './can-activate-route.guard';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { BidsComponent } from './bids/bids.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'bids',
        component: BidsComponent
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
