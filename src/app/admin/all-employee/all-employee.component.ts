import { Component } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-employee',
  standalone: true,
  imports: [RouterLink,CommonModule,MatPaginatorModule,FormsModule],
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.css'
})
export class AllEmployeeComponent {
baseUrl:string= environment.apiUrl
  employeeList:any=[];
  Env = environment.apiUrl.replace("/api","");
  model:any = {PageNumber:0,PageSize:50};
 constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog,private toastr:ToastrService,private store:StorageService){

}
  ngOnInit(): void {
    this.getEmployee();
  }

  async getEmployee(){ 
    let res: any = await this.api.getAllEmployee(this.model);
    if(res.statusCode == 200){  
       this.employeeList = res.data;
      if(res.data.length) this.model.length = res.data[0].Count;
    } 
  }

  EditEmployee(id:any) {
    this.router.navigate(
      ['/admin/add-employee'],
      { queryParams: { empId: id } }
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
  getPagination($event:any){
    this.model.PageNumber  = $event.pageIndex
    this.model.PageSize  = $event.pageSize;
        this.getEmployee();
      }
     
  async DeleteDonor(Id:any){
    this.store.IsLoader = true;
    let res:any = await this.api.deleteDynamicRow({tableName:'Employee',Id:Id});
    if(res.statusCode == 200) {
      this.toastr.success("Delete Successfully");
      this.getEmployee();
    }
    this.store.IsLoader = false;
  }
}
