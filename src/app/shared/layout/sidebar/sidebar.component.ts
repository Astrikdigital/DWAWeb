import {   Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';  
import { StorageService } from '../../../../services/local-storage.service';
import { AuthService } from '../../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true, 
  imports:[NgFor,NgIf,RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent   {
User:any = {};
Menus:any[]=[];

admin:any []= [
  {
      "Title": "Beneficiary", 
      "IsChild":true,
      "Icon": "fas fa-user-plus",
      "Childs":[
          {
              "Title":"All Beneficiary",
              "Icon": "fa-solid fa-chalkboard-user",
            //   "Route":"/admin/add-registration"
              // "Route":"/admin/faculty"
              "Route":"/admin/beneficiary"
          },
          {
              "Title":"Add Beneficiary",
              "Icon": "fa-solid fa-plus",
              "Route":"/admin/add-beneficiary"
          }
      ]
  },
  {
    "Title": "Donor", 
    "IsChild":false,
    "Icon": "fas fa-user-plus",
    "Route":"/admin/donors"
}, {
  "Title": "Donation", 
  "IsChild":false,
  "Icon": "fas fa-user-plus",
  "Route":"/admin/donations"
}, {
  "Title": "Inventory", 
  "IsChild":false,
  "Icon": "fas fa-user-plus",
  "Route":"/admin/inventory"
}


];
constructor(private auth:AuthService,private route:Router,private el: ElementRef,private renderer: Renderer2,private store:StorageService){  
    this.User = store.getItem("User");
  if(route.url.indexOf("/faculty/") > -1){
    //this.Menus = this.faculty;
  }else if(route.url.indexOf("/student/") > -1){
   // this.Menus = this.Students;    
  }else if(route.url.indexOf("/admin/") > -1){
    this.Menus = this.admin;    
  }
}
Profile(){
    if(this.User?.userTypeId == 1) this.route.navigate(['/admin/profile']);
    else if(this.User?.userTypeId == 2) this.route.navigate(['/faculty/profile']);
    else if(this.User?.userTypeId == 3) this.route.navigate(['/student/profile']);   
}

OpenIndex:any;
OpenChildMenu(i:any){
    if(this.OpenIndex != i){ 
        if(this.OpenIndex){
            const div = this.el.nativeElement.querySelector('.treeview.menuNo-'+this.OpenIndex);
            const div1 = this.el.nativeElement.querySelector('.treeview-menu.menuNo-'+this.OpenIndex);
            this.renderer.removeClass(div,"menu-open");  
            this.renderer.setStyle(div1,"display",'none'); 
        } 
      const div = this.el.nativeElement.querySelector('.treeview.menuNo-'+i);
      const div1 = this.el.nativeElement.querySelector('.treeview-menu.menuNo-'+i);
      this.renderer.addClass(div,"menu-open"); 
      this.renderer.setStyle(div1,"display",'block');   
      this.OpenIndex = i;
    }else { 
      const div = this.el.nativeElement.querySelector('.treeview.menuNo-'+i);
      const div1 = this.el.nativeElement.querySelector('.treeview-menu.menuNo-'+i);
      this.renderer.removeClass(div,"menu-open");  
      this.renderer.setStyle(div1,"display",'none');
      this.OpenIndex = null; 
    }
}
  Logout(){
    this.auth.logout();
  }
}