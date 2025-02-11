import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-all-bank-deposit-slip',
  standalone: true,
  imports: [RouterLink, CommonModule, MatPaginatorModule, FormsModule, MatCheckboxModule],
  templateUrl: './all-bank-deposit-slip.component.html',
  styleUrl: './all-bank-deposit-slip.component.css'
})
export class AllBankDepositSlipComponent {

  model: any = { donorId: "", PageNumber: 0, PageSize: 50 };
  baseUrl: string = environment.apiUrl
  transactionSlipList: any = [];
  Env = environment.apiUrl.replace("/api", "");
  banks: any = [];
  transactionType: any = [];
  donors: any = [];

  constructor(private api: HttpApiService, private router: Router, private dialog: MatDialog, private toastr: ToastrService, private store: StorageService) {
  }
  ngOnInit(): void {
    this.GetRegistrationDDL();
    this.getDepositSlip();
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

  selectedIds: number[] = [];

  update(checked: boolean, id: number) {
    if (checked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }
    console.log(this.selectedIds.join(','));
  }

}
