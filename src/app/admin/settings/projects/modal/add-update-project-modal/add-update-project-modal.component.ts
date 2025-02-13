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
  selector: 'app-add-update-project-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,FormsModule],
  templateUrl: './add-update-project-modal.component.html',
  styleUrl: './add-update-project-modal.component.css'
})
export class AddUpdateProjectModalComponent {
  

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
      this.GetProjectById(this.SelectedId);
    }

  }
  async SaveChanges() {
    console.log(this.model);
    let res: any = await this.api.AddUpdateProject(this.model);
    if (res.statusCode == 200) {
      this.tostr.success("Updated Successfully");
      this.dialogRef.close({ isSuccess: res.isSuccess });
    }else{
      this.tostr.error("Something went wrong");
    }   
  }

  async GetProjectById(Id:any) {
    let res: any = await this.api.GetProjectById(Id);
    if (res.statusCode == 200) {
      this.model = res.data[0];
    }
  }
  cancel() {
    this.dialogRef.close();
  }


}
