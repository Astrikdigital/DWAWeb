import { Component, HostListener, OnInit } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { CommonModule, NgFor, NgIf, ɵnormalizeQueryParams } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { query } from '@angular/animations';

@Component({
  selector: 'app-help-center-queries',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor,RouterLink,NgIf,RouterLink],
  templateUrl: './help-center-queries.component.html',
  styleUrl: './help-center-queries.component.css'
})
export class HelpCenterQueriesComponent  implements OnInit{
  Search:any;
  Queries:any[]=[];
  lastScrollTop=0;
  isLoading:boolean =false; 
  QueryModel:any = {PageNumber:1}; 
  User:any = {}; 
  TotalRecord:number = 0;
  constructor(private api:HttpApiService,private router:Router,private store:StorageService,private toastr:ToastrService){
    this.User = this.store.getItem("User");
    this.QueryModel.UserId = this.User.id;
  }
@HostListener('window:scroll', ['$event'])
  onScroll(event: any): void { 
    const currentScrollTop = window.scrollY; 
    if (currentScrollTop > this.lastScrollTop && !this.isLoading && this.Queries.length != this.TotalRecord) { 
      const scrollPosition = window.innerHeight + currentScrollTop;
      const documentHeight = document.documentElement.scrollHeight; 
      if (scrollPosition >= documentHeight - 100) {
        this.QueryModel.PageNumber = this.QueryModel?.PageNumber+1;
        this.getQueries(true); 
      }
    } 
    this.lastScrollTop = currentScrollTop;
  }
  ngOnInit(): void {
    this.getQueries();    
  }
  async getQueries(IsPagination:any = null){    
    this.store.IsLoader = true;
    let res:any = await this.api.getAllQueries(this.QueryModel);
    if(res.statusCode == 200){
      if(!IsPagination){this.Queries = res.data;}else{
       this.Queries.push(...res.data);
      } 
      this.TotalRecord = res.data[0].TotalRecords;
    }
    this.store.IsLoader = false;
  }
   
  RouteToQuery(item:any){ 
     if(this.User.userTypeId == 3) this.router.navigate(['/student/queries'], { queryParams: { ThreadId: item.ThreadId } });
    else if(this.User.userTypeId == 2) this.router.navigate(['/faculty/queries'], { queryParams: { ThreadId: item.ThreadId } });
  }
}
