import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild,Renderer2  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpApiService } from '../../../services/http-api-service';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DeletePopupComponent } from '../../shared/delete-popup/delete-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/local-storage.service';
import { firstValueFrom } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-all-faculty',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, RouterLink, MatDialogModule,MatPaginatorModule],
  templateUrl: './all-faculty.component.html',
  styleUrl: './all-faculty.component.css'
})
export class AllFacultyComponent implements OnInit {
  beneficiaryModel: any = { PageNumber: 0,PageSize:50, CountryId: "", CityId: "" };
  beneficiaries: any[] = [];
  lastScrollTop = 0;
  isLoading: boolean = false;
    
  Env = environment.apiUrl.replace("/api","");
  TotalRecord: number = 0;
  Environment = environment.apiUrl.replace("api", "");
  facultycourses: any = [];
  @ViewChild('downloadLink', { static: false }) downloadLink!: ElementRef<HTMLAnchorElement>;

  constructor(private api: HttpApiService, private router: Router, private dialog: MatDialog, private toastr: ToastrService,private store:StorageService) {

  }
  getPagination($event:any){
    this.beneficiaryModel.PageNumber  = $event.pageIndex
    this.beneficiaryModel.PageSize  = $event.pageSize;
        this.getBeneficiary();
      }
     
  ngOnInit(): void {
    this.getBeneficiary();
  }
  OpenDeleteModal(Id: any) {
    let dialogDelete = this.dialog.open(DeletePopupComponent, {
      data: Id, width: '530px',
    });
    dialogDelete.afterClosed().subscribe(async (result) => {
      if (result.Id) {
        this.DeleteFaculty(result.Id);
      }
    })
  }
  async DeleteFaculty(Id: any) {
    let res: any = await this.api.DeleteFaculty({ Id: Id });
    if (res.statusCode == 200) {
      this.toastr.success("Delete Successfully");
      this.getBeneficiary();
    }
  }
  
  async getBeneficiary() { 
    //this.store.IsLoader = true;
    let res: any = await this.api.getBeneficiary(this.beneficiaryModel);
    if (res.statusCode == 200) {
      this.beneficiaries = res.data;
      this.beneficiaryModel.length = res.data[0].Count;
      //this.store.IsLoader = false;
    }
  }
  EditFaculty(id: any) {
    debugger
    this.router.navigate(
      ['/admin/add-beneficiary'],
      { queryParams: { BeneficiaryId: id } }
    );
  }
  onDownloadClick(): void {
    this.downloadExcel();
  }

  async downloadExcel() {
    try {
      let res: any = await this.api.DownloadExcel();
      if (res.statusCode === 200) {
        // const fileUrl = 'http://localhost:5255/' + res.data;
        const fileUrl = 'http://217.76.53.78:9010/' + res.data;

        const downloadLinkElement = document.getElementById('downloadLink') as HTMLAnchorElement;

        if (downloadLinkElement) {
          downloadLinkElement.href = fileUrl;
          downloadLinkElement.download = 'dwa-all-registration.xlsx'; 
          downloadLinkElement.click();
        } else {
          //alert('Failed to generate the Excel file.');
        }
      } else {
        //alert('Failed to generate the Excel file.');
      }
    } catch (error) {
    }
  }


  
}
