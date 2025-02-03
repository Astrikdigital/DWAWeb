import { Component, OnInit } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { HttpService } from '../../../services/http.service';
import { CommonModule, NgFor } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css'
})
export class AddInventoryComponent implements OnInit{
  users: any []= []
  bseUrl:string = environment.apiUrl.replace("/api","");

  constructor(private Http:HttpApiService){}

  ngOnInit(){
    console.log(this.bseUrl);
    this.AddInventoryComponent()
  }

    async AddInventoryComponent() {
      let res: any = await this.Http.AddInventoryComponent();
      if (res.statusCode == 200) {
        this.users = res.data;
      }
    }
     
}
