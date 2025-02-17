import { Component } from '@angular/core';
import { HttpClient } from '@microsoft/signalr/dist/esm/HttpClient';
import { HttpApiService } from '../../../../services/http-api-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-head-report',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './head-report.component.html',
  styleUrl: './head-report.component.css'
})
export class HeadReportComponent {
  activeIndex: number | null = -1;
  activeHeadIndex: number | null = -1; // First item open by default
  MainHeads: any[] = [];
  Heads: any[] = [];
  SubHeads: any[] = [];
  constructor(private http: HttpApiService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getMainHead();
  }

  async getMainHead() {
    let res: any = await this.http.GetMainHead();
    if (res.statusCode == 200) {
      this.MainHeads = res.data;
    }
  }
  async GetReportHeadByMainHeadId(MainHeadId:any) {
    let res: any = await this.http.GetReportHeadByMainHeadId(MainHeadId);
    if (res.statusCode == 200) {
      this.Heads = res.data;
    }
  }
  

  toogleMainhead(MainHeadId:any,index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
    if(this.activeIndex === index){
      this.GetReportHeadByMainHeadId(MainHeadId);
    }
  } 

  toggleHead(HeadId:any,MainHeadId:any,index: number) {
    this.activeHeadIndex = this.activeHeadIndex === index ? null : index;
    if(this.activeHeadIndex === index){
      this.GetReportSubHead(HeadId,MainHeadId);
    }
  }

  async GetReportSubHead(HeadId:any,MainHeadId:any) {
    let res: any = await this.http.GetReportSubHead(HeadId,MainHeadId);
    if(res.statusCode == 200){
      this.SubHeads = res.data;
    }
  }


}
