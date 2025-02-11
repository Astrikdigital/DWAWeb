import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import { StorageService } from '../../../services/local-storage.service';
import { HttpApiService } from '../../../services/http-api-service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-utilization',
  standalone: true,
  imports: [MatTabsModule,  NgFor,NgIf,FormsModule,MatPaginatorModule],
  templateUrl: './utilization.component.html',
  styleUrl: './utilization.component.css'
})
export class UtilizationComponent implements OnInit { 
  inkindmodel:any = {InventoryId:"",BeneficiaryId:"",ProjectId:""};
  cashModel:any = {ProjectId:"",MainHeadId:"",HeadId:"",SubHeadId:"",BankId:""};
  inventories:any =[];
  inventorys:any[] =[];
  transactions:any =[];
  mainhead:any =[];
  heads:any =[];
  ddl:any = {};
  BankDetail:any = {};
  subheads:any =[];
  employee:any =[];
  banks:any =[];
  projects:any =[];
  beneficiary:any = [];
  modelTransaction:any = {PageNumber:0,PageSize:50};
  modelInventory:any = {PageNumber:0,PageSize:50};
  constructor(private store:StorageService,private api:HttpApiService,private cdRef: ChangeDetectorRef){

  }
  ChangeMainHead($event:any){ 
    this.heads = this.ddl.head.filter((x:any)=>x.MainHeadId == $event);
  }
  ChangeHead($event:any){
    // if($event==1) this.subheads = this.ddl.employee; 
    // else
    this.subheads = this.ddl.subhead.filter((x:any)=>x.HeadId == $event);
  }
  ngOnInit(): void {
    this.GetInventoryUtilization();
    this.GetDebitTransactions();
    this.GetInventoryUtilizationDll();
    
  }

  getPaginationInventory($event:any){
    this.modelInventory.PageNumber  = $event.pageIndex
    this.modelInventory.PageSize  = $event.pageSize;
        this.GetInventoryUtilization();
      }
  async GetInventoryUtilizationDll(){ 
    let res: any = await this.api.GetInventoryUtilizationDll();
    if(res.statusCode == 200){  
      
      this.mainhead = res.data.mainhead;
      this.ddl = res.data;
       this.employee = res.data.employee;
       this.projects = res.data.project;
       this.beneficiary = res.data.beneficiary;
       this.inventorys = res.data.inventory;
       this.banks = res.data.banks;
    } 
  }
  async AddInventoryUtilization(form:any){
    let res:any = await this.api.InsertUpdateInventoryUtilization(this.inkindmodel);
    if(res.statusCode == 200){
      form.reset();
      this.inkindmodel = {InventoryId:"",BeneficiaryId:"",ProjectId:""};
      this.GetInventoryUtilization();
    }
  }
  async AddTransaction(form:any){
   var obj:any = {
      "id": this.cashModel.Id,
      "transactionTypeId": 2,
      "bankId": this.cashModel.BankId,
      "amount": this.cashModel.Amount,
      "Date": this.cashModel.Date,
      "projectId": this.cashModel.ProjectId ?  this.cashModel.ProjectId : null,
      "mainHeadId": this.cashModel.MainHeadId,
      "headId": this.cashModel.HeadId,
      "subHeadId": this.cashModel.SubHeadId ? this.cashModel.SubHeadId: null
    }
    let res:any = await this.api.InsertUpdateTransaction(obj);
    if(res.statusCode == 200){
      form.reset();
      this.cashModel = {ProjectId:"",MainHeadId:"",HeadId:"",SubHeadId:"",BankId:""};
      this.GetDebitTransactions();
    }
  }
  async GetInventoryUtilization(){
    this.store.IsLoader = true;
    let res: any = await this.api.GetInventoryUtilization(this.modelInventory);
    if(res.statusCode == 200){  
       this.inventories = res.data;
      if(res.data.length) this.modelInventory.length = res.data[0].Count;

    }
    this.store.IsLoader = false;
  }
  ChangeBank(Id:any){
    this.BankDetail = this.banks.find((x:any)=>x.Id == Id);
  }
  async GetDebitTransactions(){
    this.store.IsLoader = true;
    let res: any = await this.api.GetDebitTransactions(this.modelTransaction);
    if(res.statusCode == 200){  
       this.transactions = res.data;
       if(res.data.length)  this.modelTransaction.length = res.data[0].Count;
    }
    this.store.IsLoader = false;
  }
 async ChangeQuantity($event:any){  
  let inventorys = this.inventorys.find(x=>x.Id == this.inkindmodel.InventoryId);
  if($event < inventorys?.Quantity){
  this.inkindmodel.Quantity = $event
}
else{
  this.inkindmodel.Quantity = inventorys.Quantity;
  $event = inventorys.Quantity;
}
this.cdRef.detectChanges();
 }
 getPaginationTransaction($event:any){
 this.modelTransaction.PageNumber  = $event.pageIndex
this.modelTransaction.PageSize  = $event.pageSize;
    this.GetDebitTransactions();
  }
 
}
