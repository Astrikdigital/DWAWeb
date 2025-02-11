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
  selector: 'app-all-transactions',
  standalone: true,
  imports: [RouterLink, CommonModule, MatPaginatorModule, FormsModule],
  templateUrl: './all-transactions.component.html',
  styleUrl: './all-transactions.component.css'
})
export class AllTransactionsComponent {
  model: any = {bankId: "", transactionTypeId: "", PageNumber: 0, PageSize: 50 };
  baseUrl: string = environment.apiUrl
  transactionList: any = [];
  Env = environment.apiUrl.replace("/api", "");
  banks: any = [];
  transactionType: any = [];

  constructor(private api: HttpApiService, private router: Router, private dialog: MatDialog, private toastr: ToastrService, private store: StorageService) {
  }
  ngOnInit(): void {
    this.getTransaction();
    this.GetRegistrationDDL();
  }
  async getTransaction() {
    this.store.IsLoader = true;
    let res: any = await this.api.getTransactions(this.model);
    if (res.statusCode == 200) {
      this.transactionList = res.data;
      if (res.data.length) this.model.length = res.data[0].Count; else this.model.length = 0;
    }
    this.store.IsLoader = false;
  }


  getPagination($event: any) {
    this.model.PageNumber = $event.pageIndex
    this.model.PageSize = $event.pageSize;
    this.getTransaction();
  }

  editTransaction(id:any) {
    this.router.navigate(
      ['/admin/add-volunteer'],
      { queryParams: { volunteerId: id } }
    );
  }

  async deleteTransaction(id: any) {
    this.store.IsLoader = true;
      let res:any = await this.api.deleteDynamicRow({tableName:'Transaction',Id:id});
      if(res.statusCode == 200) {
        this.toastr.success("Delete Successfully");
        this.getTransaction();
      }
      this.store.IsLoader = false;
  }

  async GetRegistrationDDL() {
    let res: any = await this.api.GetRegistrationDDL();
    if (res.statusCode == 200) {
      this.banks = res.data.banks;
      this.transactionType = res.data.transactionType;
    }
  }
}
