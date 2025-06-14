import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { MenusComponent } from './dashboard/menus/menus.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { UsersComponent } from './dashboard/users/users.component';

const routes: Routes = [
  {
        path:"",
        component:DashboardComponent,
        children:[
          {
            path:"home",
            component:HomeComponent
          },
          {
              path:"orders",
              component:OrdersComponent
          },
          {
              path:"customers",
              component:CustomersComponent
          },
          {
              path:"menus",
              component: MenusComponent
          },
          {
              path:"analytics",
              component: AnalyticsComponent
          },
          {
              path:"users",
              component: UsersComponent
          },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
