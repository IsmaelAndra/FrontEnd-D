import { Routes } from '@angular/router';
import { InicioComponent } from './web/inicio/inicio.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    
    {path:'admin', loadChildren:()=>import('./admin/admin.module').then(adm=>adm.AdminModule)},

    {path:'auth', loadChildren:()=>import('./auth/auth.module').then(aut=>aut.AuthModule)}
];
