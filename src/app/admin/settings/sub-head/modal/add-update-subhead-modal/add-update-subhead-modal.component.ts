import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpApiService } from '../../../../../../services/http-api-service';
import { StorageService } from '../../../../../../services/local-storage.service';
import { AddUpdateBankModalComponent } from '../../../banks/modal/add-update-bank-modal/add-update-bank-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-update-subhead-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule,MatDialogTitle,MatDialogContent,MatDialogActions,FormsModule],
  templateUrl: './add-update-subhead-modal.component.html',
  styleUrl: './add-update-subhead-modal.component.css'
})
export class AddUpdateSubheadModalComponent {
  
  
  heads:any[]=[];
  model: any = { userId: 0, Title: "", HeadId: ""};
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
      this.GetSubHeadById(this.SelectedId);
    }
    this.GetRegistrationDDL();

  }

  async GetRegistrationDDL() {
    let res: any = await this.api.GetInventoryUtilizationDll();
    if (res.statusCode == 200) {
      this.heads = res.data.head;
    }
  }
  async SaveChanges() {
    console.log(this.model);
    let res: any = await this.api.AddUpdateSubHead(this.model);
    if (res.statusCode == 200) {
      this.tostr.success("Update Successfully");
      this.dialogRef.close({ isSuccess: res.isSuccess });
    }else{
      this.tostr.error("Something went wrong");
    }   
  }

  async GetSubHeadById(Id:any) {
    let res: any = await this.api.GetSubHeadById(Id);
    if (res.statusCode == 200) {
      this.model = res.data[0];
    }
  }
  cancel() {
    this.dialogRef.close();
  }

}
