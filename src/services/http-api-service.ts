import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { AlertService } from "./alert.service"; 

@Injectable({
    providedIn: 'root'
})
export class HttpApiService {
    userForm: any;

    constructor(readonly httpService: HttpService, readonly alert: AlertService) { }

    async getCountries(): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-countries');
    } 
    async getCities(stateId: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-cities', { stateId: stateId });
    } 
    async GetRegistrationDDL(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-beneficiaryddl')

    }async DownloadExcel(): Promise<any> {
        return await this.httpService.getAsync<any>('admin/download-excel')
    }
    async AddFaculty(body: any): Promise<any> {
        const formData = new FormData();
        formData.append('ProjectId', body.ProjectId);
        formData.append('Date', body.Date);
        if (body.Id) formData.append('Id', body.Id);
        formData.append('CNIC', body.CNIC);
        formData.append('GenderId', body.GenderId);
        formData.append('Name', body.Name);
        formData.append('FatherName', body.FatherName);
        formData.append('Address', body.Address);
        formData.append('DOB', body.DOB);
        formData.append('Age', body.Age);
        formData.append('ReligionId', body.ReligionId);
        formData.append('QualificationId', body.QualificationId);
        formData.append('Experience', body.Experience);
        formData.append('PhoneNo', body.PhoneNo);
        formData.append('MobileNo', body.MobileNo);
        formData.append('WhatsAppNo', body.WhatsAppNo);
        formData.append('Email', body.Email);
        formData.append('DisabilityId', body.DisabilityId);
        formData.append('CauseDisabilityId', body.CauseDisabilityId);
        formData.append('Reference', body.Reference);
        formData.append('NeedsRemarks', body.NeedsRemarks);
       if(body.Image) formData.append('Image', body.Image);
        if(body.attachProfilePicture) formData.append('attachProfilePicture', body.attachProfilePicture);
        return await this.httpService.postFormData<any>('Admin/insert-update-beneficiary', formData)

    } 
    async getAllUsers(body:any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-users',body) 
    } 
    async AddUser(body:any): Promise<any> {
        const formData = new FormData();
        formData.append('FullName', body.FullName);
        formData.append('UserTypeId', body.UserTypeId);
       if(body.Id) formData.append('Id', body.Id);
       if(body.EntityId) formData.append('EntityId', body.EntityId); 
        formData.append('Email', body.Email);
        formData.append('Password', body.Password);
        formData.append('UserName', body.UserName); 
       if(body.PictueUrl) formData.append('PictueUrl', body.PictueUrl); 
       if(body.attachProfilePicture) formData.append('attachProfilePicture', body.attachProfilePicture);  
        return await this.httpService.postFormData<any>('Admin/insert-update-user',formData) 
    }
    async AddDonor(body:any): Promise<any> {
        const formData = new FormData();
        if(body.Id) formData.append('Id',body.Id); 
        if(body.AttachProfilePicture) formData.append('AttachProfilePicture',body.AttachProfilePicture); 
        if(body.AttachmentDocument) formData.append('AttachmentDocument',body.AttachmentDocument); 
        if(body.Name) formData.append('Name',body.Name); 
        if(body.Email) formData.append('Email',body.Email); 
        if(body.PhoneNumber) formData.append('PhoneNumber',body.PhoneNumber?.toString()); 
        if(body.PictureUrl) formData.append('PictureUrl',body.PictureUrl); 
        if(body.DonationTypeId) formData.append('DonationTypeId',body.DonationTypeId); 
        if(body.DonationStatusId) formData.append('DonationStatusId',body.DonationStatusId); 
        if(body.DonationDetailTypeId) formData.append('DonationDetailTypeId',body.DonationDetailTypeId); 
        if(body.TransactionId) formData.append('TransactionId',body.TransactionId); 
        if(body.InventoryId) formData.append('InventoryId',body.InventoryId); 
        if(body.DonorId) formData.append('DonorId',body.DonorId); 
        if(body.Amount) formData.append('Amount',body.Amount); 
        if(body.Quantity) formData.append('Quantity',body.Quantity); 
        if(body.Date) formData.append('Date',body.Date); 
        if(body.Attachment) formData.append('Attachment',body.Attachment);   
        return await this.httpService.postFormData<any>('Admin/InsertUpdateDonor',formData) 
    }
    async AddDonation(body:any): Promise<any> {
        const formData = new FormData();
        if(body.Id) formData.append('Id',body.Id)
            if(body.DonationTypeId) formData.append('DonationTypeId',body.DonationTypeId)
        if(body.AttachmentDocument) formData.append('AttachmentDocument',body.AttachmentDocument);  
            if(body.DonationDetailTypeId) formData.append('DonationDetailTypeId',body.DonationDetailTypeId)
            if(body.TransactionId) formData.append('TransactionId',body.TransactionId)
            if(body.Amount) formData.append('Amount',body.Amount)
            if(body.Date) formData.append('Date',body.Date)
            if(body.DonorId) formData.append('DonorId',body.DonorId)
            if(body.DonationStatusId) formData.append('DonationStatusId',body.DonationStatusId)
            if(body.Attachment) formData.append('Attachment',body.Attachment)
            if(body.Attach) formData.append('Attach',body.Attach)
            if(body.InventoryId) formData.append('InventoryId',body.InventoryId)
            if(body.Quantity) formData.append('Quantity',body.Quantity)      
        return await this.httpService.postFormData<any>('Admin/InsertUpdateDonation',formData) 
    }
         
    async DeleteUser(body:any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-user',null,body) 
    } 
    async DeleteDonor(body:any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-donor',null,body) 
    } 
    async AddInventoryComponent(userForm: any, any: any): Promise<any> {
        return await this.httpService.post<any>('api/Admin/InsertUpdateInventory', this.userForm.value)
    }
    async GetDonor(body?:any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/GetDonor',body)
    }
    async GetDonation(body?:any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/GetDonation',body)
    }
    async InsertUpdateDonation(body?:any): Promise<any> {
        return await this.httpService.post<any>('Admin/InsertUpdateDonation',body)
    }
    async getBeneficiary(body?: any): Promise<any> { 
        return await this.httpService.getAsync<any>('Admin/get-beneficiary', body) 
    }
    async DeleteFaculty(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-beneficiary', null, body) 
    }
    async DeleteTableRow(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/DeleteTableRow', body) 
    }
    async GetDonationType(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-donation-type') 
    }
    async GetDonationDetailType(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-donation-detail-type') 
    }
    async GetDonationStatus(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-donation-status') 
    }
    async GetInventory(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/GetInventory') 
    }
    async UpdateDonationStatus(body?:any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/UpdateDonationStatus',body) 
    }
    
}