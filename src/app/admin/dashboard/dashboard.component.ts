import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpApiService } from '../../../services/http-api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  name = 'Angular'; 
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;
constructor(private api:HttpApiService){

}
    view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true; 
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  }; 
  showLabels = true; 
chartdonation:any= [];
chartexpense:any= [];
head:any= [];
summary:any= []; 
  month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(new Date());
 model:any = {DonationYear:new Date().getFullYear(),Expense:new Date().getFullYear()+'-'+this.month};
async ngOnInit(): Promise<void> { 
 await this.GetDashboard();
}

async GetDashboard(){ 
  
  var obj:any = {
    DonationYear:this.model.DonationYear,
    ExpenseYear: parseInt(this.model?.Expense?.split("-")[0]),
    ExpenseMonth:parseInt(this.model?.Expense?.split("-")[1]) 
  } 
  let res: any = await this.api.GetDashboard(obj);
  if(res.statusCode == 200){ 
   this.head = res?.data?.head;  
   this.chartdonation = res?.data?.chartdonation;  
   this.chartexpense = res?.data?.chartexpense;  
   this.summary = res?.data?.summary;  
  }
}
formatXAxisTick(value: any): string {
  return value ? value.toLocaleString() : 'N/A';
}
}
