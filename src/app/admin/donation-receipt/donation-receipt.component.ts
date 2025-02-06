import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpApiService } from '../../../services/http-api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-donation-receipt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donation-receipt.component.html',
  styleUrl: './donation-receipt.component.css'
})
export class DonationReceiptComponent implements OnInit {
  DonationModel:any = {};
  detailtypes:any = [];
  randomNumber:any = 0;
constructor(private activeroute:ActivatedRoute,private api:HttpApiService,private title:Title){

}

  ngOnInit(): void {
    this.randomNumber = Math.floor(100000  + Math.random() * 900000);
    this.GetDonationDetailType();
    this.activeroute.queryParams.subscribe(params => { 
      if(params['DonationId']){
          this.DonationModel.Id = params['DonationId'];   
         this.getDonation();
      } 
  });
  }
  async GetDonationDetailType(){
    let res:any = await this.api.GetDonationDetailType();
    if(res) this.detailtypes = res.data;
  }
  async getDonation(){ 
    let res:any = await this.api.GetDonation({Id:this.DonationModel.Id});
    if(res.statusCode == 200){
      this.DonationModel = res.data[0];  
      this.title.setTitle(this.DonationModel.Project);
    }
  } 

}
