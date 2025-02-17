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
        
        path: 'donation-receipt',
        loadComponent: () => import('./admin/donation-receipt/donation-receipt.component').then(m => m.DonationReceiptComponent),   
    },

    {  
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard],
        children: [  
            {
                path: 'change-password',
                loadComponent: () => import('./shared/change-password/change-password.component').then(m => m.ChangePasswordComponent),   
            }, 
            {
                path: 'dashboard',
                loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),   
            },
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
                path: 'add-inventory',
                loadComponent: () => import('./admin/insert-inventory/insert-inventory.component').then(m => m.InsertInventoryComponent)
            },   
            {
                path: 'employees',
                loadComponent: () => import('./admin/all-employee/all-employee.component').then(m => m.AllEmployeeComponent),   
            },  
            {
                path: 'add-employee',
                loadComponent: () => import('./admin/add-employee/add-employee.component').then(m => m.AddEmployeeComponent),   
            }, 
            
            {
                path: 'add-volunteer',
                loadComponent: () => import('./admin/add-volunteer/add-volunteer.component').then(m => m.AddVolunteerComponent),   
            },  
            {
                path: 'volunteers',
                loadComponent: () => import('./admin/all-volunteer/all-volunteer.component').then(m => m.AllVolunteerComponent),   
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
                path: 'income',
                loadComponent: () => import('./admin/donation-list/donation-list.component').then(m => m.DonationListComponent),   
            },  
            {
                path: 'add-donation',
                loadComponent: () => import('./admin/donation-add/donation-add.component').then(m => m.DonationAddComponent),   
            },  
            {
                path: 'inventory',
                loadComponent: () => import('./admin/add-inventory/add-inventory.component').then(m => m.AddInventoryComponent)
            },
            { 
                path: 'utilization',
                loadComponent: () => import('./admin/utilization/utilization.component').then(m => m.UtilizationComponent),   
            },
            {
                path: 'transactions',
                loadComponent: () => import('./admin/all-transactions/all-transactions.component').then(m => m.AllTransactionsComponent),   
            },
            {
                path: 'bank-deposit-slip',
                loadComponent: () => import('./admin/all-bank-deposit-slip/all-bank-deposit-slip.component').then(m => m.AllBankDepositSlipComponent),   
            },
            {
                path: 'banks',
                loadComponent: () => import('./admin/settings/banks/banks.component').then(m => m.BanksComponent),   
            },
            {
                path: 'projects',
                loadComponent: () => import('./admin/settings/projects/projects.component').then(m => m.ProjectsComponent),   
            },
            {
                path: 'main-head',
                loadComponent: () => import('./admin/settings/main-head/main-head.component').then(m => m.MainHeadComponent),   
            },
            {
                path: 'head',
                loadComponent: () => import('./admin/settings/head/head.component').then(m => m.HeadComponent),   
            },
            {
                path: 'sub-head',
                loadComponent: () => import('./admin/settings/sub-head/sub-head.component').then(m => m.SubHeadComponent),   
            },
            {
                path: 'head-report',
                loadComponent: () => import('./admin/settings/head-report/head-report.component').then(m => m.HeadReportComponent),   
            },



            // {
            //     path: 'add-transaction',
            //     loadComponent: () => import('./admin/add-transaction/add-transaction.component').then(m => m.AddTransactionComponent),   
            // }
        ]
    }

];