import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpApiService } from '../../../services/http-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UploaderComponent } from '../../shared/uploader/uploader.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,UploaderComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  UserModel:any = {isActive:true,UserTypeId:1};
  usernames:any[]=[];
  IsUserNameErr:any =false;
  constructor(private api:HttpApiService,private route:Router,private toastr:ToastrService,private activeroute: ActivatedRoute,private datePipe: DatePipe){

  }
ngOnInit(): void { 
  this.activeroute.queryParams.subscribe(params => {
    if(params['UserId']){
        this.UserModel.Id  =params['UserId']; 
      this.getAllUsers();
    } 
}); 
this.GetUserName();
}

async getAllUsers(){ 
  let res:any = await this.api.getAllUsers({UserId:this.UserModel.Id});
  if(res.statusCode == 200){
    this.UserModel = res.data[0]; 
    this.UserModel.startDate = this.datePipe.transform(this.UserModel.startDate, 'yyyy-MM-dd');
    this.UserModel.endDate = this.datePipe.transform(this.UserModel.endDate, 'yyyy-MM-dd'); 
  }
}
ChangeUserName($event: any) {  
  if (this.usernames.find((x: any) => x.UserName?.toLowerCase() == $event?.toLowerCase())) this.IsUserNameErr = true;
  else this.IsUserNameErr = false;
}

async GetUserName() {
  let res: any = await this.api.GetUserName();
  if (res.statusCode == 200) {
    this.usernames = res.data;
  }
}
ChangeImage($event:any){
  this.UserModel.attachProfilePicture=$event;
}
async AddUser(){  
  let res:any = await this.api.AddUser(this.UserModel);
  if(res.statusCode == 200){
    this.toastr.success(res.message);
    this.route.navigate(['/admin/users']);
  } else   this.toastr.error(res.message);
  return;
 
}
}
