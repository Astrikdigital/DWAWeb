import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-donation-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, UploaderComponent],
  templateUrl: './donation-add.component.html',
  styleUrl: './donation-add.component.css'
})
export class DonationAddComponent {
DonationModel:any = {DonationDetailTypeId:"",DonationTypeId:"",DonorId:""};
  usernames:any[]=[];
  donationtypes:any[]=[];
  detailtypes:any[]=[];
  donationstatus:any[]=[];
  donors:any[] = [];
  Attachment:any;
  Env = environment.apiUrl.replace("/api","");
  IsView:any =false;
  constructor(private api:HttpApiService,private route:Router,private toastr:ToastrService,private activeroute: ActivatedRoute,private datePipe: DatePipe,public location: Location){

  }
async ngOnInit(): Promise<void> { 
  await this.GetDonationType();
  await this.GetDonationDetailType(); 
  this.activeroute.queryParams.subscribe(params => {
    if(params['DonorId']){
      this.DonationModel.DonorId = params['DonorId']; 
      this.DonationModel.Name = params['Donor'];    
  } 
    if(params['DonationId']){
        this.DonationModel.Id = params['DonationId'];  
        this.IsView = params['View']; 
       this.getDonation();
    } 
});
if(!this.DonationModel.DonorId && !this.DonationModel.Id) await this.GetDonors(); 
  
}

async GetDonors(){ 
  let res:any = await this.api.GetDonor();
  if(res.statusCode == 200){
    this.donors = res.data;  
  }
} 
async getDonation(){ 
  let res:any = await this.api.GetDonation({Id:this.DonationModel.Id});
  if(res.statusCode == 200){
    this.DonationModel = res.data[0];  
    this.DonationModel.Date = this.datePipe.transform(this.DonationModel.Date, 'yyyy-MM-dd'); 
    this.Attachment = this.DonationModel?.Attachment.split("//")[1];
  }
} 
Upload(event:any){  
  this.DonationModel.AttachmentDocument = event.target.files[0];  
  this.Attachment = this.DonationModel.AttachmentDocument.name;
}
ChangeImage($event:any){
  this.DonationModel.AttachProfilePicture=$event;
}
async AddDonation(){   
  if(this.DonationModel.DonationDetailTypeId == 4) this.DonationModel.DonationStatusId = 2;
  let res:any = await this.api.AddDonation(this.DonationModel);
  if(res.statusCode == 200){
    this.toastr.success(res.message);
    this.route.navigate(['/admin/donations']);
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

}

