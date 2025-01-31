import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor,RouterLink,NgIf],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent {
Search:any;
  donations:any[]=[]; 
  isLoading:boolean =false;
  donationstatus:any[]=[];
    Env = environment.apiUrl.replace("/api","");
  TotalRecord:number = 0;
  UserModel:any = {PageNumber:1,PageSize:50};
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
    let res: any = await this.api.GetDonation();
    if(res.statusCode == 200){  
      this.donations = res.data; 
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
    }
  }
  
 
  EditDpnation(id:any,View:any = false) {
    this.router.navigate(
      ['/admin/add-donation'],
      { queryParams: { DonationId: id,View:View } }
    );
  }
  
}
