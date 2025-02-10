import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { StorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';   
import { AuthService } from '../../auth/auth.service'; 
import { CommonModule } from '@angular/common'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';


 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,MatSnackBarModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css', 
})
export class LoginComponent implements OnInit {
  UserModel:any = {};  
  User:any = {};
  IsLoader: boolean = false;
  constructor( private auth:AuthService,private route:Router,private Store:StorageService,private toastr:ToastrService){
    this.User= this.Store.getItem("User");
  }

  ngOnInit(): void {
    if(this.User?.userTypeId == 1) this.route.navigate(['/admin/dashboard']);
  }

async onSubmit(){ 
  this.IsLoader = true;
  let res:any =await this.auth.login(this.UserModel);
  if(res.statusCode == 200){    
    res.data.ReadCount = res?.data?.unReadCount;
    this.Store.setItem("User",res.data); 
    this.Store.setItem("Token",res.data.token);
 location.href = "/#/admin/dashboard";   
    location.reload();
  }else this.toastr.error(res.message);
this.IsLoader = false;
}


}
