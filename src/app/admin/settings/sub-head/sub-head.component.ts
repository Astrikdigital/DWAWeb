import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../../services/http-api-service';
import { StorageService } from '../../../../services/local-storage.service';
import { DeletePopupComponent } from '../../../shared/delete-popup/delete-popup.component';
import { AddUpdateHeadModalComponent } from '../head/modal/add-update-head-modal/add-update-head-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUpdateSubheadModalComponent } from './modal/add-update-subhead-modal/add-update-subhead-modal.component';

@Component({
  selector: 'app-sub-head',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sub-head.component.html',
  styleUrl: './sub-head.component.css'
})
export class SubHeadComponent {
  
  subHeads:any[]=[];

  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog, private store:StorageService, private toastr:ToastrService){}
  ngOnInit(): void {
    this.getSubHead();
  } 

  async getSubHead() {
    let res: any = await this.api.GetSubHead();
    if (res.statusCode == 200) {
      this.subHeads = res.data;
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
      let res:any = await this.api.deleteDynamicRow({tableName:'SubHead',Id:id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.getSubHead();
      }
      this.store.IsLoader = false;
  }

  addupdatemodal(id?:any) {
    let dialogDelete = this.dialog.open(AddUpdateSubheadModalComponent, {
      data: id,
      width: '800px',
    });
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result) {
        this.getSubHead();
      }
    })
  }
}
