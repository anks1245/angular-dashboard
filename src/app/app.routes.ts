import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authAdminGuard } from './routeguard/auth.admin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path:"",
        component: LoginComponent
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
