import { Component } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';

@Component({
  selector: 'app-all-employee',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.css'
})
export class AllEmployeeComponent {
baseUrl:string= environment.apiUrl
  employeeList:any=[];
  Env = environment.apiUrl.replace("/api","");

 constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog,private toastr:ToastrService,private store:StorageService){

}
  ngOnInit(): void {
    this.getEmployee();
  }

  async getEmployee(){
    let res: any = await this.api.getAllEmployee();
    if(res.statusCode == 200){  
       this.employeeList = res.data;
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
  async DeleteDonor(Id:any){
    let res:any = await this.api.deleteDynamicRow({tableName:'Employee',Id:Id});
    if(res.statusCode == 200) {
      this.toastr.success("Delete Successfully");
      this.getEmployee();
    }
  }
}
