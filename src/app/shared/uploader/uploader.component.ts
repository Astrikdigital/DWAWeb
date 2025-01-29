import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.css'
})
export class UploaderComponent {
  @Output() Update = new EventEmitter<any>();
  @Input() selectedImage : any;
  Environment= environment.apiUrl.replace("api","");
  UploadBtn(){
    const button = document.getElementById('uploadimage');
    button?.click();
  } 
  Upload(event:any){ 
    this.selectedImage = event.target.files[0];
    this.Update.emit(event.target.files[0]);
    this.previewImage(this.selectedImage);
  }
  previewImage(file: File): void {
    const reader = new FileReader(); 
    reader.onload = () => {
      this.selectedImage = reader.result; 
    }; 
    reader.readAsDataURL(file);  
  }
}
