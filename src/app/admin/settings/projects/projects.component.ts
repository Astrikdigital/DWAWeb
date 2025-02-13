import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../../services/http-api-service';
import { StorageService } from '../../../../services/local-storage.service';
import { DeletePopupComponent } from '../../../shared/delete-popup/delete-popup.component';
import { AddUpdateBankModalComponent } from '../banks/modal/add-update-bank-modal/add-update-bank-modal.component';
import { AddUpdateProjectModalComponent } from './modal/add-update-project-modal/add-update-project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  

  Projects:any[]=[];

  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog, private store:StorageService, private toastr:ToastrService){}
  ngOnInit(): void {
    this.GetRegistrationDDL();
  } 

  async GetRegistrationDDL() {
    let res: any = await this.api.GetProject();
    if (res.statusCode == 200) {
      this.Projects = res.data;
    }
  }

  OpenDeleteModal(Id: any) {
    let dialogDelete = this.dialog.open(DeletePopupComponent, {
      data: Id, width: '530px',
    });
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result.Id) {
        this.deleteBank(result.Id);
      }
    })
  }
 
  async deleteBank(id: any) {
    this.store.IsLoader = true;
      let res:any = await this.api.deleteDynamicRow({tableName:'Project',Id:id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.GetRegistrationDDL();
      }
      this.store.IsLoader = false;
  }

  addupdatemodal(id?:any) {
    let dialogDelete = this.dialog.open(AddUpdateProjectModalComponent, {
      data: id,
      width: '800px',
    });
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result) {
        this.GetRegistrationDDL();
      }
    })
  }

}
