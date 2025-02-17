import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../../../../services/local-storage.service';
import { AuthService } from '../../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  User: any = {};
  Menus: any[] = [];

  admin: any[] = [
    {
      "Title": "Dashboard",
      "IsChild": false,
      "Icon": "fa-solid fa-gauge",
      "Route": "/admin/dashboard"
    },
    {
      "Title": "Donor",
      "IsChild": false,
      "Icon": "fas fa-user-plus",
      "Route": "/admin/donors"
    },
    {
      "Title": "Income",
      "IsChild": false,
      "Icon": "fas fa-user-plus",
      "Route": "/admin/income"
    }, 
    {
      "Title": "Beneficiary",
      "IsChild": false,
      "Icon": "fas fa-user-plus",
      "Route": "/admin/beneficiary"
    },
    {
     "Title": "Inventory",
     "IsChild": false,
     "Icon": "fas fa-user-plus",
     "Route": "/admin/inventory"
   },
   {
    "Title": "Utilization",
    "IsChild": false,
    "Icon": "fas fa-user-plus",
    "Route": "/admin/utilization"
  },
    {
      "Title": "Employee",
      "IsChild": false,
      "Icon": "fas fa-user-plus",
      "Route": "/admin/employees"
    },
    {
      "Title": "Volunteer",
      "IsChild": false,
      "Icon": "fas fa-user-plus",
      "Route": "/admin/volunteers"
    },
    {
      "Title": "Transaction Report",
      "IsChild": false,
      "Icon": "fa-solid fa-tent-arrow-left-right",
      "Route": "/admin/transactions"
    },
    {
      "Title": "Bank Deposit Slip",
      "IsChild": false,
      "Icon": "fa-solid fa-building-columns",
      "Route": "/admin/bank-deposit-slip"
    },
    {
      "Title": "Settings",
      "IsChild": true,
      "Icon": "fas fa-cog",
      "Childs":[ 
        {
          "Title":"Head Report",
          "Icon": "fa-solid fa-cog",
          "Route":"/admin/head-report"
      },
        {
          "Title":"Banks",
          "Icon": "fa-solid fa-cog",
          "Route":"/admin/banks"
      },
        {
            "Title":"Project",
            "Icon": "fa-solid fa-cog",
            "Route":"/admin/projects"
        },
        {
            "Title":"Main Head",
            "Icon": "fa-solid fa-cog",
            "Route":"/admin/main-head"
        },  
        {
            "Title":"Head",
            "Icon": "fa-solid fa-cog",
            "Route":"/admin/head"
        },  
        {
            "Title":"Sub Head",
            "Icon": "fa-solid fa-cog",
            "Route":"/admin/sub-head"
        },  
        
        
    ]
    } 



  ];
  constructor(private auth: AuthService, private route: Router, private el: ElementRef, private renderer: Renderer2, private store: StorageService) {
    this.User = store.getItem("User");
    if (route.url.indexOf("/faculty/") > -1) {
      //this.Menus = this.faculty;
    } else if (route.url.indexOf("/student/") > -1) {
      // this.Menus = this.Students;    
    } else if (route.url.indexOf("/admin/") > -1) {
      this.Menus = this.admin;
    }
  }
  Profile() {
    if (this.User?.userTypeId == 1) this.route.navigate(['/admin/profile']);
    else if (this.User?.userTypeId == 2) this.route.navigate(['/faculty/profile']);
    else if (this.User?.userTypeId == 3) this.route.navigate(['/student/profile']);
  }

  OpenIndex: any;
  OpenChildMenu(i: any) {
    if (this.OpenIndex != i) {
      if (this.OpenIndex) {
        const div = this.el.nativeElement.querySelector('.treeview.menuNo-' + this.OpenIndex);
        const div1 = this.el.nativeElement.querySelector('.treeview-menu.menuNo-' + this.OpenIndex);
        this.renderer.removeClass(div, "menu-open");
        this.renderer.setStyle(div1, "display", 'none');
      }
      const div = this.el.nativeElement.querySelector('.treeview.menuNo-' + i);
      const div1 = this.el.nativeElement.querySelector('.treeview-menu.menuNo-' + i);
      this.renderer.addClass(div, "menu-open");
      this.renderer.setStyle(div1, "display", 'block');
      this.OpenIndex = i;
    } else {
      const div = this.el.nativeElement.querySelector('.treeview.menuNo-' + i);
      const div1 = this.el.nativeElement.querySelector('.treeview-menu.menuNo-' + i);
      this.renderer.removeClass(div, "menu-open");
      this.renderer.setStyle(div1, "display", 'none');
      this.OpenIndex = null;
    }
  }
  Logout() {
    this.auth.logout();
  }
}