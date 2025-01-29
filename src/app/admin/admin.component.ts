import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { HeaderComponent } from '../shared/layout/header/header.component';
import { SidebarComponent } from '../shared/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FooterComponent,HeaderComponent,SidebarComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
