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
  selector: 'app-add-update-head-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,FormsModule],
  templateUrl: './add-update-head-modal.component.html',
  styleUrl: './add-update-head-modal.component.css'
})
export class AddUpdateHeadModalComponent {
  
  mainHeads:any[]=[];
  model: any = { userId: 0, Title: "", MainHeadId: ""};
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
      this.GetHeadById(this.SelectedId);
    }
    this.GetRegistrationDDL();

  }

  async GetRegistrationDDL() {
    let res: any = await this.api.GetInventoryUtilizationDll();
    if (res.statusCode == 200) {
      this.mainHeads = res.data.mainhead;
    }
  }
  async SaveChanges() {
    console.log(this.model);
    let res: any = await this.api.AddUpdateHead(this.model);
    if (res.statusCode == 200) {
      this.tostr.success("Update Successfully");
      this.dialogRef.close({ isSuccess: res.isSuccess });
    }else{
      this.tostr.error("Something went wrong");
    }   
  }

  async GetHeadById(Id:any) {
    let res: any = await this.api.GetHeadById(Id);
    if (res.statusCode == 200) {
      this.model = res.data[0];
    }
  }
  cancel() {
    this.dialogRef.close();
  }

}
