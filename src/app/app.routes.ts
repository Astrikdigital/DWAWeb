import { Routes } from '@angular/router';  
import { AuthGuard } from '../auth/auth.guard'; 
import { AdminComponent } from './admin/admin.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    {
        
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),   
    },

    {  
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard],
        children: [  
            {
                path: 'users',
                loadComponent: () => import('./admin/all-user/all-user.component').then(m => m.AllUserComponent),   
            },
            {
                path: 'add-user',
                loadComponent: () => import('./admin/add-user/add-user.component').then(m => m.AddUserComponent),   
            }, 
            {
                path: 'get-registration',
                loadComponent: () => import('./admin/all-faculty/all-faculty.component').then(m => m.AllFacultyComponent),   
            },  
            {
                path: 'add-registration',
                loadComponent: () => import('./admin/add-faculty/add-faculty.component').then(m => m.AddFacultyComponent),   
            },   
        ]
    }

];