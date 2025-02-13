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
DonationModel:any = {DonationDetailTypeId:"",DonationTypeId:"",DonorId:"",InventoryId:"",BankId:"",IncomeTypeId:"",DonationStatusId:1,ProjectId:""};
  usernames:any[]=[];
  inventores:any[]=[];
  projects:any[]=[];
  incometypes:any = [];
  banks:any = [];
  donationtypes:any[]=[];
  detailtypes:any[]=[];
  donationstatus:any[]=[];
  donors:any[] = [];
  Attachment:any;
  Env = environment.apiUrl.replace("/api","");
  IsView:any =false;
  IsDonar:Boolean = false;
  constructor(private api:HttpApiService,private route:Router,private toastr:ToastrService,private activeroute: ActivatedRoute,private datePipe: DatePipe,public location: Location){

  }
async ngOnInit(): Promise<void> { 
    this.GetDonationType();
    this.GetDonationDetailType(); 
    this.Inventory();
    this.GetProject();
    this.getIncomeTypes();
    this.GetBank();
  this.activeroute.queryParams.subscribe(params => {
    if(params['DonorId']){
      this.DonationModel.DonorId = params['DonorId']; 
      this.IsDonar =true;
      this.DonationModel.Name = params['Donor'];    
  } 
    if(params['DonationId']){
        this.DonationModel.Id = params['DonationId'];  
      this.IsDonar =true; 
        this.IsView = params['View']; 
       this.getDonation();
    } 
});
if(!this.DonationModel.DonorId && !this.DonationModel.Id) await this.GetDonors(); 
  
}

async GetDonors(){ 
  let res:any = await this.api.GetDonor({PageNumber:0,PageSize:500});
  if(res.statusCode == 200){
    this.donors = res.data;  
  }
} 
async getDonation(){ 
  let res:any = await this.api.GetDonation({Id:this.DonationModel.Id,PageNumber:0,PageSize:2});
  if(res.statusCode == 200){ 
    this.DonationModel = res.data[0];  
    this.DonationModel.Date = this.datePipe.transform(this.DonationModel.Date, 'yyyy-MM-dd'); 
    this.Attachment = this.DonationModel?.Attachment.split("//")[1];
    
  }
} 
parseInt(Id?:any){
 return parseInt(Id);
}
Upload(event:any){  
  this.DonationModel.AttachmentDocument = event.target.files[0];  
  this.Attachment = this.DonationModel.AttachmentDocument.name;
}
ChangeImage($event:any){
  this.DonationModel.AttachProfilePicture=$event;
}
async AddDonation(){   
  if(this.DonationModel.DonationDetailTypeId == 4 || this.DonationModel.DonationDetailTypeId == 5) this.DonationModel.DonationStatusId = 2;
  let res:any = await this.api.AddDonation(this.DonationModel);
  if(res.statusCode == 200){
    this.toastr.success(res.message);
    this.route.navigate(['/admin/income']);
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
async GetProject(){
  let res:any = await this.api.GetProject();
  if(res) this.projects = res.data;
}
async Inventory(){
  let res:any = await this.api.GetInventory({PageNumber:0,PageSize:500});
  if(res) this.inventores = res.data;
}
async getIncomeTypes(){
  let res:any = await this.api.GetIncomeTypes();
  if(res) this.incometypes = res.data;
}
async GetBank(){
  let res:any = await this.api.GetBank();
  if(res) this.banks = res.data;
}
}

