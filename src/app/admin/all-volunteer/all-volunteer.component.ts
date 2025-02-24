import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { StorageService } from '../../../services/local-storage.service';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-volunteer',
  standalone: true,
  imports: [RouterLink,CommonModule,MatPaginatorModule,FormsModule],
  templateUrl: './all-volunteer.component.html',
  styleUrl: './all-volunteer.component.css'
})
export class AllVolunteerComponent {
  model:any = {PageNumber:0,PageSize:50};
  baseUrl:string= environment.apiUrl
    volunteerList:any=[];
    Env = environment.apiUrl.replace("/api","");
  
   constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog,private toastr:ToastrService,private store:StorageService){
  
  }
    ngOnInit(): void {
      this.getVolunteer();
    }
  
    async getVolunteer(){
      this.store.IsLoader = true; 
      let res: any = await this.api.getVolunteers(this.model);
      if(res.statusCode == 200){  
         this.volunteerList = res.data;
       if(res.data.length)  this.model.length = res.data[0].Count;
      }
      this.store.IsLoader = false;
    }
  
    EditVolunteer(id:any) {
      this.router.navigate(
        ['/admin/add-volunteer'],
        { queryParams: { volunteerId: id } }
      );
    }
    getPagination($event:any){
      this.model.PageNumber  = $event.pageIndex
      this.model.PageSize  = $event.pageSize;
          this.getVolunteer();
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
      this.store.IsLoader = true;
      let res:any = await this.api.deleteDynamicRow({tableName:'Volunteer',Id:Id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.getVolunteer();
      }
      this.store.IsLoader = false;
    }

}
