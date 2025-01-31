import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insert-inventory',
  standalone: true,
  imports: [FormsModule,NgFor,CommonModule],
  templateUrl: './insert-inventory.component.html',
  styleUrl: './insert-inventory.component.css'
})
export class InsertInventoryComponent {
  InventoryModel: any = { nationalityId: "", genderId: "", countryResidenceId: "" };
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

  async ngOnInit(): Promise<void> {
   
    await this.GetUserName();
  
    this.activeroute.queryParams.subscribe(params => {
      
      if (params['FacultyId']) {
        this.InventoryModel.id  =params['ProgramId']; 
        this.getfaculties(params['FacultyId']);
      }
    });
  
    await this.GetRegistrationDDL();
  }
  async AddFaculty() {
    let res: any = await this.api.AddFaculty(this.InventoryModel);
      if (res.statusCode == 200) {
        this.toastr.success(res.message);
        this.route.navigate(['/admin/insert-inventory']);
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
    debugger;
    let res: any = await this.api.getfaculties({ Id: Id });
    if (res.statusCode == 200) {
      debugger
      this.InventoryModel = res.data[0];
      if (this.InventoryModel.DOB) {
        this.InventoryModel.DOB = this.datePipe.transform(this.InventoryModel.DOB, 'yyyy-MM-dd'); // For date input
      }

      if (this.InventoryModel.Date) {
        this.InventoryModel.Date = this.datePipe.transform(this.InventoryModel.Date, 'yyyy-MM-dd'); // For date input
      }

      //this.InventoryModel.dateOfBirth = this.datePipe.transform(this.InventoryModel.dateOfBirth, 'yyyy-MM-dd');
    }

  }
  ChangeImage($event: any) {
    this.InventoryModel.attachProfilePicture = $event;
  }

  async GetUserName() {
    let res: any = await this.api.AddInventoryComponent();
    if (res.statusCode == 200) {
      this.usernames = res.data;
    }
  }

}
