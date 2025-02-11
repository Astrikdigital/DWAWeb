import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { CommonModule, NgFor, NgIf } from '@angular/common'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor,RouterLink,NgIf,MatPaginatorModule],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent {
model:any = {PageNumber:0,PageSize:50};
  donations:any[]=[]; 
  isLoading:boolean =false;
  donationstatus:any[]=[];
    Env = environment.apiUrl.replace("/api","");
  TotalRecord:number = 0; 
  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog,private toastr:ToastrService,private store:StorageService){

}
  async ngOnInit(): Promise<void> {
    await    this.GetDonation();    
   await this.GetDonationStatus();
  }
  async GetDonationStatus(){
    let res:any = await this.api.GetDonationStatus();
    if(res) this.donationstatus = res.data;
  }
  async GetDonation(){
    this.store.IsLoader = true;
    let res: any = await this.api.GetDonation(this.model);
    if(res.statusCode == 200){  
      this.donations = res.data; 
      if(res.data.length) this.model.length = res.data[0].Count;
       this.store.IsLoader = false;
    }
  }
  async ChangeDonationStatus(body?:any){
    this.store.IsLoader = true;
    var obj:any = {Id:body.Id,DonationStatusId:body.DonationStatusId}
    let res: any = await this.api.UpdateDonationStatus(obj);
    if(res.statusCode == 200){  
      this.toastr.success("you have successfuly update status")
       this.store.IsLoader = false;
       this.GetDonation();
    }
  }
  getPagination($event:any){
this.model.PageNumber  = $event.pageIndex
this.model.PageSize  = $event.pageSize;
    this.GetDonation();
  }
 
  EditDpnation(id:any) {
    this.router.navigate(
      ['/admin/add-donation'],
      { queryParams: { DonationId: id } }
    );
  }
  
  ViewDpnation(id:any) {
    this.router.navigate(
      ['/admin/add-donation'],
      { queryParams: { DonationId: id,View:true } }
    );
  }
}
