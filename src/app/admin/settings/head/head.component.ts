import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../../services/http-api-service';
import { StorageService } from '../../../../services/local-storage.service';
import { DeletePopupComponent } from '../../../shared/delete-popup/delete-popup.component';
import { AddUpdateProjectModalComponent } from '../projects/modal/add-update-project-modal/add-update-project-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUpdateHeadModalComponent } from './modal/add-update-head-modal/add-update-head-modal.component';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
  heads:any[]=[];

  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog, private store:StorageService, private toastr:ToastrService){}
  ngOnInit(): void {
    this.GetRegistrationDDL();
  } 

  async GetRegistrationDDL() {
    let res: any = await this.api.GetHead();
    if (res.statusCode == 200) {
      this.heads = res.data;
    }
  }

  OpenDeleteModal(Id: any) {
    let dialogDelete = this.dialog.open(DeletePopupComponent, {
      data: Id, width: '530px',
    });
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result.Id) {
        this.deleteHead(result.Id);
      }
    })
  }
 
  async deleteHead(id: any) {
    this.store.IsLoader = true;
      let res:any = await this.api.deleteDynamicRow({tableName:'Head',Id:id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.GetRegistrationDDL();
      }
      this.store.IsLoader = false;
  }

  addupdatemodal(id?:any) {
    let dialogDelete = this.dialog.open(AddUpdateHeadModalComponent, {
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
