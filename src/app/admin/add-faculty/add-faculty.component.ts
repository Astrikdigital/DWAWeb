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
  FacultyModel: any = { nationalityId: "", genderId: "", countryResidenceId: "" };
  countries: any[] = [];
  programs: any[] = [];
  usernames: any[] = [];
  religions: any = [];  
  projects: any = []; 
  disabilities: any = []; 
  causeOfDisability: any = []; 
  qualifications: any = []; 

  faculty: any;
  IsUserNameErr: any = false;
  selectedImage: string | ArrayBuffer | null = null;
  environment = environment.apiUrl.replace("/api", "");
  constructor(private api: HttpApiService, private route: Router, private toastr: ToastrService, private activeroute: ActivatedRoute, private datePipe: DatePipe) {

  }
  ChangeUserName($event: any) {  
    if (this.usernames.find((x: any) => x.UserName?.toLowerCase() == $event?.toLowerCase())) this.IsUserNameErr = true;
    else this.IsUserNameErr = false;
  }
  async ngOnInit(): Promise<void> {
    await this.getCountries();
    // await this.GetUserName();
  
    this.activeroute.queryParams.subscribe(params => {
      
      if (params['FacultyId']) {
        this.FacultyModel.id  =params['ProgramId']; 
        this.getfaculties(params['FacultyId']);
      }
    });
  
    await this.GetRegistrationDDL();
 

  }
  async AddFaculty() {
    let res: any = await this.api.AddFaculty(this.FacultyModel);
      if (res.statusCode == 200) {
        this.toastr.success(res.message);
        this.route.navigate(['/admin/get-registration']);
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

  async getfaculties(Id: any) {
    let res: any = await this.api.getfaculties({ Id: Id });
    if (res.statusCode == 200) {
      debugger
      this.FacultyModel = res.data[0];
      if (this.FacultyModel.DOB) {
        this.FacultyModel.DOB = this.datePipe.transform(this.FacultyModel.DOB, 'yyyy-MM-dd'); // For date input
      }

      if (this.FacultyModel.Date) {
        this.FacultyModel.Date = this.datePipe.transform(this.FacultyModel.Date, 'yyyy-MM-dd'); // For date input
      }

      //this.FacultyModel.dateOfBirth = this.datePipe.transform(this.FacultyModel.dateOfBirth, 'yyyy-MM-dd');
    }
  }
  ChangeImage($event: any) {
    this.FacultyModel.attachProfilePicture = $event;
  }
  
  async getCountries() {
    let res: any = await this.api.getCountries();
    if (res.statusCode == 200) {
      this.countries = res.data;
    }
  }

  NextStep() {
    const button = document.getElementById('pills-2-tab');
    button?.click();
  }
  
  async GetUserName() {
    let res: any = await this.api.GetUserName();
    if (res.statusCode == 200) {
      this.usernames = res.data;
    }
  }
}
