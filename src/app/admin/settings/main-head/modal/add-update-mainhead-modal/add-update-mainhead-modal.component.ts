import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../../../../services/http-api-service';
import { StorageService } from '../../../../../../services/local-storage.service';
import { AddUpdateBankModalComponent } from '../../../banks/modal/add-update-bank-modal/add-update-bank-modal.component';

@Component({
  selector: 'app-add-update-mainhead-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,FormsModule],
  templateUrl: './add-update-mainhead-modal.component.html',
  styleUrl: './add-update-mainhead-modal.component.css'
})
export class AddUpdateMainheadModalComponent {
  
  

  model: any = { Title: ""};
  SelectedId: any;

  constructor( private localStorage: StorageService, private tostr: ToastrService, private api: HttpApiService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddUpdateBankModalComponent>) {
    this.SelectedId = data;
    if(this.SelectedId){
      this.model.Id = this.SelectedId;
    }
  }
  ngOnInit(): void {
    if(this.SelectedId){
      this.GetMainHeadById(this.SelectedId);
    }

  }
  async SaveChanges() {
    let res: any = await this.api.AddUpdateMainHead(this.model);
    if (res.statusCode == 200) {
      this.tostr.success("Updated Successfully");
      this.dialogRef.close({ isSuccess: res.isSuccess });
    }else{
      this.tostr.error("Something went wrong");
    }   
  }

  async GetMainHeadById(Id:any) {
    let res: any = await this.api.GetMainHeadById(Id);
    if (res.statusCode == 200) {
      this.model = res.data[0];
    }
  }
  cancel() {
    this.dialogRef.close();
  }

}
