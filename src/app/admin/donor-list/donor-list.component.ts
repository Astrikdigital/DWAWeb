import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';
import { HttpApiService } from '../../../services/http-api-service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { environment } from '../../../environments/environment';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor,RouterLink,NgIf,MatPaginatorModule],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css'
})
export class DonorListComponent {
Search:any;
  donors:any[]=[];
  lastScrollTop=0;
  isLoading:boolean =false;
  
    Env = environment.apiUrl.replace("/api","");
  TotalRecord:number = 0;
  model:any = {PageNumber:0,PageSize:50};
  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog,private toastr:ToastrService,private store:StorageService){

}
  ngOnInit(): void {
    this.getDonor();    
  }
  getPagination($event:any){
    this.model.PageNumber  = $event.pageIndex
    this.model.PageSize  = $event.pageSize;
        this.getDonor();
      }
     
  async getDonor(){
    this.store.IsLoader = true;
    let res: any = await this.api.GetDonor(this.model);
    if(res.statusCode == 200){  
      this.donors = res.data; 
      if(res.data.length) this.model.length = res.data[0].Count; 
       this.store.IsLoader = false;
    }
  }
  EditDonor(id:any) {
    this.router.navigate(
      ['/admin/add-donor'],
      { queryParams: { DonorId: id } }
    );
  }
  AddDonation(body:any) {
    this.router.navigate(
      ['/admin/add-donation'],
      { queryParams: { DonorId: body.Id,Donor: body.Name } }
    );
  }
  
  OpenDeleteModal(Id:any){
    let dialogDelete =  this.dialog.open(DeletePopupComponent, {
      data:Id,    width: '530px',
    }); 
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result.Id) {
        this.DeleteDonor(result.Id);
      } 
    })
  }
  async DeleteDonor(Id:any){
    let res:any = await this.api.DeleteTableRow({tableName:'Donor',Id:Id});
    if(res.statusCode == 200) {
      this.toastr.success("Delete Successfully");
      this.getDonor();
    }
  }
}
