import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploaderComponent } from '../../shared/uploader/uploader.component';

@Component({
  selector: 'app-insert-inventory',
  standalone: true,
  imports: [FormsModule,NgFor,CommonModule,UploaderComponent],
  templateUrl: './insert-inventory.component.html',
  styleUrl: './insert-inventory.component.css'
})
export class InsertInventoryComponent {
  InventoryModel: any = { nationalityId: "", genderId: "", countryResidenceId: "" };
  FacultyModel: any = { nationalityId: "", genderId: "", countryResidenceId: "" };
  countries: any[] = [];
  programs: any[] = []; 
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
  
    this.activeroute.queryParams.subscribe(params => {
      
      if (params['FacultyId']) {
        this.FacultyModel.id  =params['ProgramId'];  
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
  async addinventory() {
    this.route.navigate(['/admin/inventory']);
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
 
  ChangeImage($event: any) {
    this.InventoryModel.attachProfilePicture = $event;
  } 

}
