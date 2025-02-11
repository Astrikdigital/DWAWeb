import { Component, OnInit } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { HttpService } from '../../../services/http.service';
import { CommonModule, NgFor } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [CommonModule,NgFor,MatPaginatorModule,FormsModule,RouterLink],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css'
})
export class AddInventoryComponent implements OnInit{
  users: any []= []
  bseUrl:string = environment.apiUrl.replace("/api","");
  model:any = {PageNumber:0,PageSize:50};

  constructor(private Http:HttpApiService){}

  ngOnInit(){ 
    this.GetInventory()
  }
  getPagination($event:any){
    this.model.PageNumber  = $event.pageIndex
    this.model.PageSize  = $event.pageSize;
        this.GetInventory();
      }

    async GetInventory() {
      let res: any = await this.Http.GetInventory(this.model);
      if (res.statusCode == 200) {
        this.users = res.data;
       if(res.data.length) this.model.length = res.data[0].Count;
      }
    }
     
}
