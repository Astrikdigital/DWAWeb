import { Component, OnInit } from '@angular/core';
import { HttpApiService } from '../../../../services/http-api-service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddUpdateBankModalComponent } from './modal/add-update-bank-modal/add-update-bank-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../services/local-storage.service';
import { DeletePopupComponent } from '../../../shared/delete-popup/delete-popup.component';

@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css'
})
export class BanksComponent implements OnInit {

  Banks:any[]=[];

  constructor(private api:HttpApiService,private router:Router,private dialog:MatDialog, private store:StorageService, private toastr:ToastrService){}
  ngOnInit(): void {
    this.GetRegistrationDDL();
  } 

  async GetRegistrationDDL() {
    let res: any = await this.api.GetBank();
    if (res.statusCode == 200) {
      this.Banks = res.data;
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
      let res:any = await this.api.deleteDynamicRow({tableName:'Bank',Id:id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.GetRegistrationDDL();
      }
      this.store.IsLoader = false;
  }

  addupdatemodal(id?:any) {
    let dialogDelete = this.dialog.open(AddUpdateBankModalComponent, {
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
