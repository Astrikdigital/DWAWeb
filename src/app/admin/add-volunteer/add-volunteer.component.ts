import { CommonModule, NgFor, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,UploaderComponent,MatSelectModule,MatFormFieldModule],
  templateUrl: './add-volunteer.component.html',
  styleUrl: './add-volunteer.component.css'
})
export class AddVolunteerComponent {
  
    Env = environment.apiUrl.replace("/api","");
      VolunteerModel: any = { 
        ProjectAssigmentId:"",
        DepartmentId:"",
        VolunteerRoleId:"",
        AvailabilityTime:"",
        AvailabilityDayIds:"",
        GenderId:"",
        MaritalStatusId:"",
        ReligionId:"",
        CityId:"",
        StatusId:""
      };
      selectedDays: number[] = [];
      projectAssignment: any[] = [];
      departments: any[] = [];
      genders: any[] = [];
      religions: any = [];  
      shifts: any = []; 
      status: any = []; 
      cities: any = []; 
      maritalStatus: any = []; 
      contractType: any = []; 
      employmentType: any = []; 
    
      faculty: any;
      IsUserNameErr: any = false;
      selectedImage: string | ArrayBuffer | null = null;
      environment = environment.apiUrl.replace("/api", "");
      constructor(private api: HttpApiService, private route: Router, private toastr: ToastrService, private activeroute: ActivatedRoute, private datePipe: DatePipe) {
    
      }
    
      async ngOnInit(): Promise<void> {
        await this.getOG();
        // await this.getCountries();
        // await this.GetUserName();
      
        this.activeroute.queryParams.subscribe(params => {
          
          if (params['volunteerId']) {
            this.VolunteerModel.id  =params['volunteerId']; 
            this.getVolunteerById(params['volunteerId']);
          }
        });
      
        // await this.GetRegistrationDDL();
     
    
      }
  
      async getOG() {
        let dep: any = await this.api.getDepartment();
        if (dep.statusCode == 200) {
          this.departments = dep.data;
        }
  
        let desg: any = await this.api.getAssignment();
        if (desg.statusCode == 200) {
          this.projectAssignment = desg.data;
        }

        let gen: any = await this.api.getGender();
        if (gen.statusCode == 200) {
          this.genders = gen.data;
        }
        let shift: any = await this.api.getShift();
        if (shift.statusCode == 200) {
          this.shifts = shift.data;
        }
        let contract: any = await this.api.getContractType();
        if (contract.statusCode == 200) {
          this.contractType = contract.data;
        }
        let rel: any = await this.api.getReligion();
        if (rel.statusCode == 200) {
          this.religions = rel.data;
        }
        let res: any = await this.api.getDepartment();
        if (res.statusCode == 200) {
          this.departments = res.data;
        }
  
        let maritalStatus: any = await this.api.getMaritalStatus();
        if (maritalStatus.statusCode == 200) {
          this.maritalStatus = maritalStatus.data;
        }
        let city: any = await this.api.getCity();
        if (city.statusCode == 200) {
          this.cities = city.data;
        }
  
        let status: any = await this.api.getStatus();
        if (status.statusCode == 200) {
          this.status = status.data;
        }
  
        let empType: any = await this.api.getEmpType();
        if (empType.statusCode == 200) {
          this.employmentType = empType.data;
        }
      }
  
  
      async AddFaculty() {
        console.log('Volunteer Model',
          this.VolunteerModel
        );
        let res: any = await this.api.AddVolunteer(this.VolunteerModel);
          if (res.statusCode == 200 && res.isSuccess) {
            debugger
            this.toastr.success(res.message);
            this.route.navigate(['/admin/volunteers']);
          } else   this.toastr.error(res.message);
          return;
      }
      
      // async GetRegistrationDDL() {
      //   debugger
      //   let res: any = await this.api.GetRegistrationDDL();
      //   if (res.statusCode == 200) {
      //     this.projects = res.data.project;
      //     this.disabilities = res.data.disability;
      //     this.causeOfDisability = res.data.causeOfDisability;
      //     this.qualifications = res.data.qualification;
      //     this.religions = res.data.religion;
      //   }
      // }
    
      async getVolunteerById(Id: any) {
        let res: any = await this.api.getVolunteerById(Id);
        if (res.statusCode == 200) {
          this.VolunteerModel = res.data;
          console.log(this.VolunteerModel);
          
          if (this.VolunteerModel.DateOfJoining) {
            this.VolunteerModel.DateOfJoining = this.datePipe.transform(this.VolunteerModel.DateOfJoining, 'yyyy-MM-dd'); // For date input
          }
  
          if (this.VolunteerModel.DateOfExit) {
            this.VolunteerModel.DateOfExit = this.datePipe.transform(this.VolunteerModel.DateOfExit, 'yyyy-MM-dd'); // For date input
          }  
  
          if (this.VolunteerModel.DateOfBirth) {
            this.VolunteerModel.DateOfBirth = this.datePipe.transform(this.VolunteerModel.DateOfBirth, 'yyyy-MM-dd'); // For date input
          }  

          if(this.VolunteerModel.AvailabilityDayIds){
            debugger
            this.selectedDays = this.VolunteerModel.AvailabilityDayIds.split(',');
            this.selectedDays = this.selectedDays.map(Number);
            console.log(this.selectedDays);
            
          }
        }
      }
  
      ChangeImage($event: any) {
        this.VolunteerModel.Profile = $event;
      }
      selectAttachment(event:any){
        this.VolunteerModel.attachmentUrl = event.target.files[0];
      }
      
    
      NextStep() {
        const button = document.getElementById('pills-2-tab');
        button?.click();
      } 

    

updateAvailability() {
  console.log(this.selectedDays);
  
  this.VolunteerModel.AvailabilityDayIds = this.selectedDays.join(",");
}

}
