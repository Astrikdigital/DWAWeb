import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../../services/http-api-service';
import { StorageService } from '../../../../services/local-storage.service';
import { DeletePopupComponent } from '../../../shared/delete-popup/delete-popup.component';
import { AddUpdateProjectModalComponent } from '../projects/modal/add-update-project-modal/add-update-project-modal.component';
import { AddUpdateMainheadModalComponent } from './modal/add-update-mainhead-modal/add-update-mainhead-modal.component';

@Component({
  selector: 'app-main-head',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './main-head.component.html',
  styleUrl: './main-head.component.css'
})
export class MainHeadComponent {
  
  

  mainHeads:any[]=[];

  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog, private store:StorageService, private toastr:ToastrService){}
  ngOnInit(): void {
    this.GetRegistrationDDL();
  } 

  async GetRegistrationDDL() {
    let res: any = await this.api.GetInventoryUtilizationDll();
    if (res.statusCode == 200) {
      this.mainHeads = res.data.mainhead;
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
      let res:any = await this.api.deleteDynamicRow({tableName:'MainHead',Id:id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.GetRegistrationDDL();
      }
      this.store.IsLoader = false;
  }

  addupdatemodal(id?:any) {
    let dialogDelete = this.dialog.open(AddUpdateMainheadModalComponent, {
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
