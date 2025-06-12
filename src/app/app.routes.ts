import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authAdminGuard } from './routeguard/auth.admin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { loginGuard } from './routeguard/login.guard';

export const routes: Routes = [
    {
        path:"",
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path:"dashboard",
        loadChildren: (()=>import('./protected/protected-routing.module').then((m)=>m.ProtectedRoutingModule)),
        canActivateChild: [authAdminGuard]
    },
    {
        path:"**",
        component: PageNotFoundComponent
    }
];
