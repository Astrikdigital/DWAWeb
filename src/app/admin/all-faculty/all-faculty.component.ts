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

@Component({
  selector: 'app-all-faculty',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, RouterLink, MatDialogModule],
  templateUrl: './all-faculty.component.html',
  styleUrl: './all-faculty.component.css'
})
export class AllFacultyComponent implements OnInit {
  beneficiaryModel: any = { PageNumber: 1 };
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
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > this.lastScrollTop && !this.isLoading && this.beneficiaries.length != this.TotalRecord) {
      const scrollPosition = window.innerHeight + currentScrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight - 100) {
        this.beneficiaryModel.PageNumber = this.beneficiaryModel?.PageNumber + 1;
        this.getBeneficiary(true);
      }
    }
    this.lastScrollTop = currentScrollTop;
  }
  async getBeneficiary(IsPagination: any = false) {
    debugger
    //this.store.IsLoader = true;
    let res: any = await this.api.getBeneficiary(this.beneficiaryModel);
    if (res.statusCode == 200) {
      if (!IsPagination) { this.beneficiaries = res.data ; } else {
        this.beneficiaries.push(...res.data);
      }
      this.TotalRecord = res.data[0].TotalRecords;
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
