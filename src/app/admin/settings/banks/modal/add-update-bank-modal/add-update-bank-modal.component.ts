import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../../../../services/http-api-service';
import { DepositSlipModalComponent } from '../../../../deposit-slip-modal/deposit-slip-modal.component';
import { StorageService } from '../../../../../../services/local-storage.service';

@Component({
  selector: 'app-add-update-bank-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,FormsModule],
  templateUrl: './add-update-bank-modal.component.html',
  styleUrl: './add-update-bank-modal.component.css'
})
export class AddUpdateBankModalComponent {

  model: any = { userId: 0, Title: "", IBAN: "", Account: "", BranchName: "", BranchCode: "", Amount: 0};
  SelectedId: any;

  constructor( private localStorage: StorageService, private tostr: ToastrService, private api: HttpApiService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddUpdateBankModalComponent>) {
    this.SelectedId = data;
    if(this.SelectedId){
      this.model.Id = this.SelectedId;
    }
  }
  ngOnInit(): void {
   var user:any = this.localStorage.getItem("User")
    this.model.userId = user.id;
    if(this.SelectedId){
      this.GetBankById(this.SelectedId);
    }

  }
  async SaveChanges() {
    console.log(this.model);
    let res: any = await this.api.AddUpdateBank(this.model);
    if (res.statusCode == 200) {
      this.tostr.success("Add Successfully");
      this.dialogRef.close({ isSuccess: res.isSuccess });
    }else{
      this.tostr.error("Something went wrong");
    }   
  }

  async GetBankById(Id:any) {
    let res: any = await this.api.GetBankById(Id);
    if (res.statusCode == 200) {
      this.model = res.data[0];
      this.model.IBAN= this.model.IbanNumber
    }
  }
  cancel() {
    this.dialogRef.close();
  }

}