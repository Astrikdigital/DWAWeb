import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';
import { HttpApiService } from '../../../services/http-api-service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor,RouterLink,NgIf],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css'
})
export class AllUserComponent implements OnInit {
  Search:any;
  users:any[]=[];
  lastScrollTop=0;
  isLoading:boolean =false;
  
  TotalRecord:number = 0;
  UserModel:any = {PageNumber:1,PageSize:50};
  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog,private toastr:ToastrService,private store:StorageService){

}
  ngOnInit(): void {
    this.getUsers();    
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void { 
    const currentScrollTop = window.scrollY; 
    if (currentScrollTop > this.lastScrollTop && !this.isLoading && this.users.length != this.TotalRecord) { 
      const scrollPosition = window.innerHeight + currentScrollTop;
      const documentHeight = document.documentElement.scrollHeight; 
      if (scrollPosition >= documentHeight - 100) {
        this.UserModel.PageNumber = this.UserModel?.PageNumber+1;
        this.getUsers(true); 
      }
    } 
    this.lastScrollTop = currentScrollTop;
  }
  async getUsers(IsPagination:any=null){
    this.store.IsLoader = true;
    let res: any = await this.api.getAllUsers(this.UserModel);
    if(res.statusCode == 200){  
      if(!IsPagination){this.users = res.data;}else{
        this.users.push(...res.data);
       } 
       this.TotalRecord = res.data[0].TotalRecords;
       this.store.IsLoader = false;
    }
  }
  EditUser(id:any) {
    this.router.navigate(
      ['/admin/add-user'],
      { queryParams: { UserId: id } }
    );
  }
  OpenDeleteModal(Id:any){
    let dialogDelete =  this.dialog.open(DeletePopupComponent, {
      data:Id,    width: '530px',
    }); 
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result.Id) {
        this.DeleteUser(result.Id);
      } 
    })
  }
  async DeleteUser(Id:any){
    let res:any = await this.api.DeleteUser({Id:Id});
    if(res.statusCode == 200) {
      this.toastr.success("Delete Successfully");
      this.getUsers();
    }
  }
}
