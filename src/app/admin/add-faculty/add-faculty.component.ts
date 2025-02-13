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
  BeneficiaryModel: any = { BeneficiaryTypeId: "", BusinessType: "", GenderId: "", ReligionId: "", QualificationId: "", ProjectId: "", DisabilityId: "", CauseDisabilityId: "", CountryId: "", CityId: "" };
  countries: any;
  cnicList: any[] = [];
  benifTypeList: any[] = [];
  religions: any = [];
  projects: any = [];
  Env = environment.apiUrl.replace("/api", "");
  disabilities: any = [];
  causeOfDisability: any = [];
  qualifications: any = [];
  selectedImage: string | ArrayBuffer | null = null;
  environment = environment.apiUrl.replace("/api", "");
  isCorporate: boolean = false;
  benifType: any; cities: any[] = [];
  cnicExist: boolean = false;
  constructor(private api: HttpApiService, private route: Router, private toastr: ToastrService, private activeroute: ActivatedRoute, private datePipe: DatePipe) {

  }

  async ngOnInit(): Promise<void> {
    await this.GetRegistrationDDL();
    this.getBenifType();
    this.GetCountry();

    // await this.getCountries();
    // await this.GetUserName();

    this.activeroute.queryParams.subscribe(params => {

      if (params['BeneficiaryId']) {
        this.BeneficiaryModel.Id = params['BeneficiaryId'];
        this.getBeneficiary(params['BeneficiaryId']);
      }
    });

    
  }
  async AddFaculty() {
    console.log(this.BeneficiaryModel);

    let res: any = await this.api.AddFaculty(this.BeneficiaryModel);
    if (res.statusCode == 200) {
      this.toastr.success(res.message);
      this.route.navigate(['/admin/beneficiary']);
    } else this.toastr.error(res.message);
    return;
  }



  async GetRegistrationDDL() {
    let res: any = await this.api.GetRegistrationDDL();
    if (res.statusCode == 200) {
      this.projects = res.data.project;
      this.disabilities = res.data.disability;
      this.causeOfDisability = res.data.causeOfDisability;
      this.qualifications = res.data.qualification;
      this.religions = res.data.religion;
    }
  }

  async GetCountry() {
    let res: any = await this.api.GetCountry();
    if (res) this.countries = res.data;
    console.log(this.countries);
    
  }
  async getBeneficiary(Id: any) {
    let res: any = await this.api.getBeneficiary({ Id: Id, PageNumber: 0, PageSize: 2 });
    if (res.statusCode == 200) {
      this.BeneficiaryModel = res.data[0];
      if (this.BeneficiaryModel.DOB) {
        this.BeneficiaryModel.DOB = this.datePipe.transform(this.BeneficiaryModel.DOB, 'yyyy-MM-dd');
      }

      if (this.BeneficiaryModel.Date) {
        this.BeneficiaryModel.Date = this.datePipe.transform(this.BeneficiaryModel.Date, 'yyyy-MM-dd');
      }
      if (this.BeneficiaryModel.CountryId) {
        this.ChangeCountry(this.BeneficiaryModel.CountryId);
        this.BeneficiaryModel.CountryId = this.BeneficiaryModel.CountryId;
        this.BeneficiaryModel.CityId = this.BeneficiaryModel.CityId;
      }
      if (this.BeneficiaryModel.BeneficiaryTypeId == 1 || this.BeneficiaryModel.BeneficiaryTypeId == 3 || !this.BeneficiaryModel.BeneficiaryTypeId) {
        this.isCorporate = false;
      } else {
        this.isCorporate = true;
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

  async getBenifType() {
    let res: any = await this.api.getBenificiarytype();
    if (res.statusCode == 200) {
      this.benifTypeList = res.data;
    }
  }
  benifTypeForm() {
    console.log(this.BeneficiaryModel.BeneficiaryTypeId);
    if (this.BeneficiaryModel.BeneficiaryTypeId == 1 || this.BeneficiaryModel.BeneficiaryTypeId == 3 || this.BeneficiaryModel.BeneficiaryTypeId == "") {
      this.isCorporate = false;
    } else {
      this.isCorporate = true;
    }
  }

  async ChangeCountry($event: any) {
    this.cities = [];
    let res: any = await this.api.GetCityByCountryId({ CountryId: $event });
    if (res) this.cities = res.data;
  }
  async ChangeCNIC($event: any) { 
    let cnic = await this.getAllCnic($event);
    if (cnic) { 
      this.cnicExist = true;
    } else {
      this.cnicExist = false;
      this.BeneficiaryModel.CNIC = $event;
    }
  }
  async getAllCnic($event:any = null) {
    let res: any = await this.api.getAllCnic({ cnic: $event });
    if (res.statusCode == 200) {
      return res.data;
    }
  }

}
