import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { StorageService } from '../../../services/local-storage.service';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';

@Component({
  selector: 'app-all-volunteer',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './all-volunteer.component.html',
  styleUrl: './all-volunteer.component.css'
})
export class AllVolunteerComponent {
  
  baseUrl:string= environment.apiUrl
    volunteerList:any=[];
    Env = environment.apiUrl.replace("/api","");
  
   constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog,private toastr:ToastrService,private store:StorageService){
  
  }
    ngOnInit(): void {
      this.getVolunteer();
    }
  
    async getVolunteer(){
      let res: any = await this.api.getVolunteers();
      if(res.statusCode == 200){  
         this.volunteerList = res.data;
      }
    }
  
    EditVolunteer(id:any) {
      this.router.navigate(
        ['/admin/add-volunteer'],
        { queryParams: { volunteerId: id } }
      );
    }
  
    OpenDeleteModal(Id:any){
      let dialogDelete =  this.dialog.open(DeletePopupComponent, {
        data:Id,    width: '530px',
      }); 
      dialogDelete.afterClosed().subscribe(async (result) => {
        if (result.Id) {
          this.DeleteDonor(result.Id);
        } 
      })
    }
    async DeleteDonor(Id:any){
      let res:any = await this.api.deleteDynamicRow({tableName:'Volunteer',Id:Id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.getVolunteer();
      }
    }

}
