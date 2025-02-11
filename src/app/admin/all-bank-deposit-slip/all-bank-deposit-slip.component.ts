import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { HttpApiService } from '../../../services/http-api-service';
import { StorageService } from '../../../services/local-storage.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DepositSlipModalComponent } from '../deposit-slip-modal/deposit-slip-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';
@Component({
  selector: 'app-all-bank-deposit-slip',
  standalone: true,
  imports: [RouterLink, CommonModule, MatPaginatorModule, FormsModule, MatCheckboxModule,MatTabsModule,NgFor],
  templateUrl: './all-bank-deposit-slip.component.html',
  styleUrl: './all-bank-deposit-slip.component.css'
})
export class AllBankDepositSlipComponent {
  modelDeposit: any = {PageNumber: 0, PageSize: 50 };
  model: any = { donorId: "", PageNumber: 0, PageSize: 50 };
  baseUrl: string = environment.apiUrl
  transactionSlipList: any = [];
  Env = environment.apiUrl.replace("/api", "");
  banks: any = [];
  transactionType: any = [];
  donors: any = [];
  depositBtn: boolean = false;
  selectedIds: number[] = [];
  depositSlips:any = [];
  constructor(private api: HttpApiService, private router: Router, private dialog: MatDialog, private toastr: ToastrService, private store: StorageService) {
  }
  ngOnInit(): void {
    this.GetRegistrationDDL();
    this.getDepositSlip();
    this.GetDepositBankSlip();
  }
  async getDepositSlip() {
    this.store.IsLoader = true;
    let res: any = await this.api.getDepositSlip(this.model);
    if (res.statusCode == 200) {
      this.transactionSlipList = res.data;
      if (res.data.length) this.model.length = res.data[0].Count; else this.model.length = 0;
    }
    this.store.IsLoader = false;
  }


  getPagination($event: any) {
    this.model.PageNumber = $event.pageIndex
    this.model.PageSize = $event.pageSize;
    this.getDepositSlip();
  }
  getDepositPagination($event: any) {
    this.modelDeposit.PageNumber = $event.pageIndex
    this.modelDeposit.PageSize = $event.pageSize;
    this.GetDepositBankSlip();
  }
  

  editTransaction(id: any) {
    this.router.navigate(
      ['/admin/add-volunteer'],
      { queryParams: { volunteerId: id } }
    );
  }

  async deleteTransaction(id: any) {
    this.store.IsLoader = true;
    let res: any = await this.api.deleteDynamicRow({ tableName: 'Transaction', Id: id });
    if (res.statusCode == 200) {
      this.toastr.success("Delete Successfully");
      this.getDepositSlip();
    }
    this.store.IsLoader = false;
  }

  async GetRegistrationDDL() {
    let res: any = await this.api.GetRegistrationDDL();
    if (res.statusCode == 200) {
      this.donors = res.data.donors;
    }
  }

  
  update(checked: boolean, id: number) {
    if (checked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }
    console.log(this.selectedIds.join(','));
    if (this.selectedIds.length > 0) {
      this.depositBtn = true;
    } else {
      this.depositBtn = false;
    }
  }
  async GetDepositBankSlip() {
    let res: any = await this.api.GetDepositBankSlip(this.modelDeposit);
    if (res.statusCode == 200) {
      debugger
      this.depositSlips = res?.data;
      if (res.data.length) this.modelDeposit.length = res?.data[0].Count; else this.modelDeposit.length = 0;
    }
  }
  

  deposit() {
    console.log(this.selectedIds.join(','));
    let dialogDelete = this.dialog.open(DepositSlipModalComponent, {
      data: this.selectedIds, width: '800px',
    });
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result) {
        debugger
        this.getDepositSlip();
      }
    })
  }
 OpenDeleteModal(Id:any){
    let dialogDelete =  this.dialog.open(DeletePopupComponent, {
      data:Id,    width: '530px',
    }); 
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result.Id) {
        this.DeleteDepositBankSlip(result.Id);
      } 
    })
  }
  async DeleteDepositBankSlip(Id:any){
    let res:any = await this.api.DeleteDepositBankSlip({Id:Id});
    if(res.statusCode == 200) {
      this.toastr.success("Delete Successfully");
      this.getDepositSlip();
      this.GetDepositBankSlip();
    }
  }
}
