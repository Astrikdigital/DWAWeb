import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpApiService } from '../../../services/http-api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deposit-slip-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
  ],
  templateUrl: './deposit-slip-modal.component.html',
  styleUrl: './deposit-slip-modal.component.css'
})
export class DepositSlipModalComponent {
  model: any = { bankId: "", attachmentUrl: "" };
  SelectedId: any;
  banks: any = [];


  constructor(private tostr: ToastrService, private api: HttpApiService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DepositSlipModalComponent>) {
    this.SelectedId = data;
  }

  ngOnInit(): void {
    this.GetRegistrationDDL();
  }
  async SaveChanges() {

    let obj = {
      TransactionId: this.SelectedId,
      BankId: this.model.bankId,
      DocSlip: this.model.attachmentUrl
    }
    let res: any = await this.api.bankdepositSlip(obj);
    if (res.statusCode == 200) {
      this.tostr.success("Deposit Successfully");
      this.dialogRef.close({ isSuccess: res.isSuccess });
    }


    console.log(obj);
    // this.dialogRef.close({Id:this.SelectedId});
  }
  cancel() {
    this.dialogRef.close();
  }
  selectAttachment(event: any) {
    this.model.attachmentUrl = event.target.files[0];
  }

  async GetRegistrationDDL() {
    let res: any = await this.api.GetRegistrationDDL();
    if (res.statusCode == 200) {
      this.banks = res.data.banks;
    }
  }

}
