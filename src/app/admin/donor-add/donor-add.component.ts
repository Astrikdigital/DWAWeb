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
 DonorModel:any = {DonationDetailTypeId:"",DonationTypeId:"",InventoryId:"",DonationStatusId:1,BankId:"",IncomeTypeId:"",ProjectId:""
,DonorTypeId:"",CountryId:"",CityId:""


 };
 cities :any = [];
  usernames:any[]=[];
  donationtypes:any[]=[];
  detailtypes:any[]=[];
  donationstatus:any[]=[];
  donations:any = [];
  inventores:any[]=[];
  incometypes:any[]=[];
  countries:any[]=[];
  donorTypes:any[]=[];
  IsView:any = false;
  banks:any[]=[];
  projects:any[]=[];
  Env = environment.apiUrl.replace("/api","");
  IsUserNameErr:any =false;
  constructor(private api:HttpApiService,private route:Router,private toastr:ToastrService,private activeroute: ActivatedRoute,private datePipe: DatePipe){

  }
async ngOnInit(): Promise<void> { 
   
    this.GetDonorDll(); 
  this.activeroute.queryParams.subscribe(params => {
    if(params['IsView']){
      this.IsView = params['IsView']; 
    // this.getDonor();
  } 
    if(params['DonorId']){
        this.DonorModel.Id  =params['DonorId']; 
      this.getDonor();
    } 
});  
}

async getDonor(){ 
  let res:any = await this.api.GetDonor({Id:this.DonorModel.Id,PageNumber:0,PageSize:2,IsView:this.IsView ? this.IsView : false});
  if(res.statusCode == 200){
    if(res.data[0]?.CountryId) this.ChangeCountry(res.data[0].CountryId)
    this.DonorModel = res.data?.donor[0];  
    this.donations = res.data?.donations;  
    this.DonorModel.Date = this.datePipe.transform(this.DonorModel.Date, 'yyyy-MM-dd'); 
    if(this.DonorModel.CountryId) this.ChangeCountry(this.DonorModel.CountryId);
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
  if(this.DonorModel.DonationDetailTypeId == 4 || this.DonorModel.DonationDetailTypeId == 5) this.DonorModel.DonationStatusId = 2;
  let res:any = await this.api.AddDonor(this.DonorModel);
  if(res.statusCode == 200){
    this.toastr.success(res.message);
    this.route.navigate(['/admin/donors']);
  } else   this.toastr.error(res.message);
  return; 
} 
async ChangeCountry($event:any){
  this.cities= [];
  let res:any = await this.api.GetCityByCountryId({CountryId:$event});
  if(res) this.cities = res.data;
}
async GetDonorDll(){
  let res:any = await this.api.GetDonorDll();
  if(res.data) {
    this.projects = res.data.project;
    this.donationtypes = res.data.donationType;
    this.detailtypes = res.data.donationDetailType;
    this.inventores = res.data.inventory;
    this.donationstatus = res.data.donationStatus;
    this.incometypes = res.data.incomeType;
    this.banks = res.data.bank;
    this.countries = res.data.countries;
    this.donorTypes = res.data.donorType;
  }
}
}

