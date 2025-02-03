import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../services/http-api-service';
import { FormsModule } from '@angular/forms';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,UploaderComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  Env = environment.apiUrl.replace("/api","");
    FacultyModel: any = { 
      DesignationId:"",
      DepartmentId:"",
      EmployementTypeId:"",
      ContractTypeId:"",
      ShiftId:"",
      GenderId:"",
      MaritalStatusId:"",
      ReligionId:"",
      CityId:"",
      StatusId:""
    };
    designations: any[] = [];
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
    constructor(private api: HttpApiService, private route: Router, private toastr: ToastrService, private activeroute: ActivatedRoute, private datePipe: DatePipe,private store:StorageService) {
  
    }
  
    async ngOnInit(): Promise<void> {

      // await this.getCountries();
      // await this.GetUserName();
      this.getOG();
      this.activeroute.queryParams.subscribe(params => {
        
        if (params['empId']) {
          this.FacultyModel.id  =params['empId'];  
          this.getEmpById(params['empId']);
        }
      });
      
      // await this.GetRegistrationDDL();
   
  
    }

    async getOG() {
      let dep: any = await this.api.getDepartment();
      if (dep.statusCode == 200) {
        this.departments = dep.data;
      }

      let desg: any = await this.api.getDesignation();
      if (desg.statusCode == 200) {
        this.designations = desg.data;
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
      this.store.IsLoader = true;
      let res: any = await this.api.AddEmployee(this.FacultyModel);
        if (res.statusCode == 200 && res.isSuccess) {
          debugger
          this.toastr.success(res.message);
          this.route.navigate(['/admin/employees']);
        } else   this.toastr.error(res.message);
        this.store.IsLoader = false;
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
  
    async getEmpById(Id: any) {

      let res: any = await this.api.getEmpById(Id);
      if (res.statusCode == 200) {
        this.FacultyModel = res.data[0];
        if (this.FacultyModel.DateOfJoining) {
          this.FacultyModel.DateOfJoining = this.datePipe.transform(this.FacultyModel.DateOfJoining, 'yyyy-MM-dd'); // For date input
        }

        if (this.FacultyModel.DateOfExit) {
          this.FacultyModel.DateOfExit = this.datePipe.transform(this.FacultyModel.DateOfExit, 'yyyy-MM-dd'); // For date input
        }  

        if (this.FacultyModel.DateOfBirth) {
          this.FacultyModel.DateOfBirth = this.datePipe.transform(this.FacultyModel.DateOfBirth, 'yyyy-MM-dd'); // For date input
        }  
      }
      this.store.IsLoader = false;
    }

    ChangeImage($event: any) {
      this.FacultyModel.Profile = $event;
    }
    selectAttachment(event:any){
      this.FacultyModel.attachmentUrl = event.target.files[0];
    }
    
  
    NextStep() {
      const button = document.getElementById('pills-2-tab');
      button?.click();
    } 
}
