import { Component, OnInit } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-faculty',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, UploaderComponent],
  templateUrl: './add-faculty.component.html',
  styleUrl: './add-faculty.component.css'
})
export class AddFacultyComponent implements OnInit {
  BeneficiaryModel: any = {   GenderId: "", ReligionId:"",QualificationId:"",ProjectId:"",DisabilityId:"",CauseDisabilityId:"" };
  countries: any[] = [];  
  religions: any = [];  
  projects: any = []; 
  disabilities: any = []; 
  causeOfDisability: any = []; 
  qualifications: any = [];   
  selectedImage: string | ArrayBuffer | null = null;
  environment = environment.apiUrl.replace("/api", "");
  constructor(private api: HttpApiService, private route: Router, private toastr: ToastrService, private activeroute: ActivatedRoute, private datePipe: DatePipe) {

  }
 
  async ngOnInit(): Promise<void> {
    //await this.getCountries();
    // await this.GetUserName();
  
    this.activeroute.queryParams.subscribe(params => {
      
      if (params['BeneficiaryId']) {
        this.BeneficiaryModel.Id  =params['BeneficiaryId']; 
        this.getBeneficiary(params['BeneficiaryId']);
      }
    });
  
    await this.GetRegistrationDDL();
  }
  async AddFaculty() {
    let res: any = await this.api.AddFaculty(this.BeneficiaryModel);
      if (res.statusCode == 200) {
        this.toastr.success(res.message);
        this.route.navigate(['/admin/beneficiary']);
      } else   this.toastr.error(res.message);
      return;
  }
  


  async GetRegistrationDDL() {
    debugger
    let res: any = await this.api.GetRegistrationDDL();
    if (res.statusCode == 200) {
      this.projects = res.data.project;
      this.disabilities = res.data.disability;
      this.causeOfDisability = res.data.causeOfDisability;
      this.qualifications = res.data.qualification;
      this.religions = res.data.religion;
    }
  }

  async getBeneficiary(Id: any) {
    debugger;
    let res: any = await this.api.getBeneficiary({ Id: Id });
    if (res.statusCode == 200) {
      debugger
      this.BeneficiaryModel = res.data[0];
      if (this.BeneficiaryModel.DOB) {
        this.BeneficiaryModel.DOB = this.datePipe.transform(this.BeneficiaryModel.DOB, 'yyyy-MM-dd');
      }

      if (this.BeneficiaryModel.Date) {
        this.BeneficiaryModel.Date = this.datePipe.transform(this.BeneficiaryModel.Date, 'yyyy-MM-dd');
      }
    }
  }
  ChangeImage($event: any) {
    this.BeneficiaryModel.attachProfilePicture = $event;
  }
  
  async getCountries() {
    let res: any = await this.api.getCountries();
    if (res.statusCode == 200) {
      this.countries = res.data;
    }
  }
 
  
}
