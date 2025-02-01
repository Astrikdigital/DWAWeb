import { Component } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-donor-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, UploaderComponent],
  templateUrl: './donor-add.component.html',
  styleUrl: './donor-add.component.css'
})
export class DonorAddComponent {
 DonorModel:any = {DonationDetailTypeId:"",DonationTypeId:"",InventoryId:"",DonationStatusId:1};
  usernames:any[]=[];
  donationtypes:any[]=[];
  detailtypes:any[]=[];
  donationstatus:any[]=[];
  inventores:any[]=[];
  
  Env = environment.apiUrl.replace("/api","");
  IsUserNameErr:any =false;
  constructor(private api:HttpApiService,private route:Router,private toastr:ToastrService,private activeroute: ActivatedRoute,private datePipe: DatePipe){

  }
async ngOnInit(): Promise<void> { 
  await this.GetDonationType();
  await this.GetDonationDetailType();
  await this.Inventory();
  
  await this.GetDonationStatus();
  this.activeroute.queryParams.subscribe(params => {
    if(params['DonorId']){
        this.DonorModel.Id  =params['DonorId']; 
      this.getDonor();
    } 
});  
}

async getDonor(){ 
  let res:any = await this.api.GetDonor({Id:this.DonorModel.Id});
  if(res.statusCode == 200){
    this.DonorModel = res.data[0];  
    this.DonorModel.Date = this.datePipe.transform(this.DonorModel.Date, 'yyyy-MM-dd'); 
  }
}
ChangeUserName($event: any) {  
  if (this.usernames.find((x: any) => x.UserName?.toLowerCase() == $event?.toLowerCase())) this.IsUserNameErr = true;
  else this.IsUserNameErr = false;
}
Upload(event:any){ 
  this.DonorModel.AttachmentDocument = event.target.files[0]; 
}
ChangeImage($event:any){
  this.DonorModel.AttachProfilePicture=$event;
}
async AddDonor(){  
  if(this.DonorModel.DonationDetailTypeId == 4) this.DonorModel.DonationStatusId = 2;
  let res:any = await this.api.AddDonor(this.DonorModel);
  if(res.statusCode == 200){
    this.toastr.success(res.message);
    this.route.navigate(['/admin/donors']);
  } else   this.toastr.error(res.message);
  return; 
}
async GetDonationType(){
  let res:any = await this.api.GetDonationType();
  if(res) this.donationtypes = res.data;
}
async GetDonationDetailType(){
  let res:any = await this.api.GetDonationDetailType();
  if(res) this.detailtypes = res.data;
}
async Inventory(){
  let res:any = await this.api.GetInventory();
  if(res) this.inventores = res.data;
}
async GetDonationStatus(){
  let res:any = await this.api.GetDonationStatus();
  if(res) this.donationstatus = res.data;
}
}

