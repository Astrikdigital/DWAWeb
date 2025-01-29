import { Component, HostListener, OnInit } from '@angular/core';
import { HttpApiService } from '../../../services/http-api-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueryComposeComponent } from '../query-compose/query-compose.component';

@Component({
  selector: 'app-queries',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, RouterLink, NgIf],
  templateUrl: './queries.component.html',
  styleUrl: './queries.component.css'
})
export class QueriesComponent implements OnInit {
  Search: any;
  Queries: any[] = [];
  lastScrollTop = 0;
  isLoading: boolean = false;
  QueryModel: any = { PageNumber: 1 };
  TotalRecord: number = 0;
  User: any = {};
  SubjectTitle: any;
  constructor(private api: HttpApiService, private router: Router, private Store: StorageService, private toastr: ToastrService,
    private dialog: MatDialog,
    private activeroute: ActivatedRoute) {
    this.User = this.Store.getItem("User");
    this.QueryModel.UserId = this.User.id;
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(params => {
      if (params['ThreadId']) {
        this.QueryModel.ThreadId = params['ThreadId'];
        this.getQueries();
      }
    });
  }
  async UpdateQueryStatus(Id: any) {
    let res: any = await this.api.UpdateQueryStatus({ Id: Id, UserId: this.User.id });
    if (res.statusCode == 200) { this.toastr.success(res.message); this.getQueries(); }
    else this.toastr.error(res.message);
  }
  async getQueries() {
    this.Store.IsLoader = true;
    let res: any = await this.api.getThreadQueries(this.QueryModel);
    if (res.statusCode == 200) {
      this.Queries = res.data;
      this.SubjectTitle = res.data.find((x: any) => x.IsOwner == true).Subject;
    }
    this.Store.IsLoader = false;
  }
  Reply() {
    let Query = this.dialog.open(QueryComposeComponent, {
      data: this.Queries.find((x: any) => x.IsOwner == true),
      width: '730px', disableClose: true
    });
    Query.afterClosed().subscribe(async (result) => {
      if (result) {
        this.getQueries();
      }
    })
  }

}
