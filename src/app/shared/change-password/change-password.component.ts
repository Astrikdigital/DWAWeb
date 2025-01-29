import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpApiService } from '../../../services/http-api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  UserModel: any = {};
  User: any = {};
  constructor(private auth: HttpApiService, private Store: StorageService, private toastr: ToastrService) {
    this.User = this.Store.getItem("User");
    this.UserModel.id = this.User.id;
  }

  ngOnInit(): void {
  }

  async onSubmit(form:any) {
    if (this.UserModel.newPassword != this.UserModel.ConfirmPassword) this.toastr.error("New Password and Confirm Password don not match!")
      else{
    let res: any = await this.auth.ChangePassword(this.UserModel);
    if (res.statusCode == 200) {
      if (res.Type == 0) this.toastr.error(res.Message);
      else {
        form.reset();
        this.UserModel.id = this.User.id;
        const button = document.getElementById('confirmchange');
        button?.click();
      }
    }
  }
}

}
