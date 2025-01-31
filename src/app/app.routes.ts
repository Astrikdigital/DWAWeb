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
                path: 'beneficiary',
                loadComponent: () => import('./admin/all-faculty/all-faculty.component').then(m => m.AllFacultyComponent),   
            },  
            {
                path: 'add-beneficiary',
                loadComponent: () => import('./admin/add-faculty/add-faculty.component').then(m => m.AddFacultyComponent),   
            },   
            {
                path: 'donors',
                loadComponent: () => import('./admin/donor-list/donor-list.component').then(m => m.DonorListComponent),   
            },  
            {
                path: 'add-donor',
                loadComponent: () => import('./admin/donor-add/donor-add.component').then(m => m.DonorAddComponent),   
            },  
            {
                path: 'donations',
                loadComponent: () => import('./admin/donation-list/donation-list.component').then(m => m.DonationListComponent),   
            },  
            {
                path: 'add-donation',
                loadComponent: () => import('./admin/donation-add/donation-add.component').then(m => m.DonationAddComponent),   
            },  
        ]
    }

];