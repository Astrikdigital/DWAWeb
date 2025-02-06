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

    } async DownloadExcel(): Promise<any> {
        return await this.httpService.getAsync<any>('admin/download-excel')
    }
    async AddFaculty(body: any): Promise<any> {
        const formData = new FormData();
        formData.append('ProjectId', body.ProjectId);
        formData.append('Date', body.Date);
        if (body.Id) formData.append('Id', body.Id);
        if (body.CNIC)formData.append('CNIC', body.CNIC);
        if (body.GenderId)formData.append('GenderId', body.GenderId);
        if (body.Name)formData.append('Name', body.Name);
        if (body.FatherName)formData.append('FatherName', body.FatherName);
        if (body.Address)formData.append('Address', body.Address);
        if (body.DOB)formData.append('DOB', body.DOB);
        if (body.Age)formData.append('Age', body.Age);
        if (body.ReligionId)formData.append('ReligionId', body.ReligionId);
        if (body.QualificationId)formData.append('QualificationId', body.QualificationId);
        if (body.Experience)formData.append('Experience', body.Experience);
        if (body.PhoneNo)formData.append('PhoneNo', body.PhoneNo);
        if (body.MobileNo)formData.append('MobileNo', body.MobileNo);
        if (body.WhatsAppNo)formData.append('WhatsAppNo', body.WhatsAppNo);
        if (body.Email)formData.append('Email', body.Email);
        if (body.DisabilityId)formData.append('DisabilityId', body.DisabilityId);
        if (body.CauseDisabilityId)formData.append('CauseDisabilityId', body.CauseDisabilityId);
        if (body.Reference)formData.append('Reference', body.Reference);
        if (body.NeedsRemarks)formData.append('NeedsRemarks', body.NeedsRemarks);
        if (body.FirstName)formData.append('FirstName', body.FirstName);
        if (body.LastName)formData.append('LastName', body.LastName);
        if (body.BusinessName)formData.append('BusinessName', body.BusinessName);
        if (body.BusinessType)formData.append('BusinessType', body.BusinessType);
        if (body.BeneficiaryTypeId)formData.append('BeneficiaryTypeId', body.BeneficiaryTypeId);
        if (body.Image) formData.append('Image', body.Image);
        if (body.attachProfilePicture) formData.append('attachProfilePicture', body.attachProfilePicture);
        return await this.httpService.postFormData<any>('Admin/insert-update-beneficiary', formData)

    }
    async getAllUsers(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-users', body)
    }
    async getAllEmployee(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-employee')
    }
    async getAllQueries(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-help-center-query', body)
    }
    async getThreadQueries(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-query-by-thread-id', body)
    }

    async AddUser(body: any): Promise<any> {
        const formData = new FormData();
        formData.append('FullName', body.FullName);
        formData.append('UserTypeId', body.UserTypeId);
        if (body.Id) formData.append('Id', body.Id);
        if (body.EntityId) formData.append('EntityId', body.EntityId);
        formData.append('Email', body.Email);
        formData.append('Password', body.Password);
        formData.append('UserName', body.UserName);
        if (body.PictueUrl) formData.append('PictueUrl', body.PictueUrl);
        if (body.attachProfilePicture) formData.append('attachProfilePicture', body.attachProfilePicture);
        return await this.httpService.postFormData<any>('Admin/insert-update-user', formData)
    }
    async AddDonor(body: any): Promise<any> {
        const formData = new FormData();
        if (body.Id) formData.append('Id', body.Id);
        if (body.AttachProfilePicture) formData.append('AttachProfilePicture', body.AttachProfilePicture);
        if (body.AttachmentDocument) formData.append('AttachmentDocument', body.AttachmentDocument);
        if (body.Name) formData.append('Name', body.Name);
        if (body.Email) formData.append('Email', body.Email);
        if (body.PhoneNumber) formData.append('PhoneNumber', body.PhoneNumber?.toString());
        if (body.PictureUrl) formData.append('PictureUrl', body.PictureUrl);
        if (body.DonationTypeId) formData.append('DonationTypeId', body.DonationTypeId);
        if (body.DonationStatusId) formData.append('DonationStatusId', body.DonationStatusId);
        if (body.DonationDetailTypeId) formData.append('DonationDetailTypeId', body.DonationDetailTypeId);
        if (body.TransactionId) formData.append('TransactionId', body.TransactionId);
        if (body.InventoryId) formData.append('InventoryId', body.InventoryId);
        if (body.DonorId) formData.append('DonorId', body.DonorId);
        if (body.Amount) formData.append('Amount', body.Amount);
        if (body.Quantity) formData.append('Quantity', body.Quantity);
        if (body.Date) formData.append('Date', body.Date);
        if (body.Attachment) formData.append('Attachment', body.Attachment);
        return await this.httpService.postFormData<any>('Admin/InsertUpdateDonor', formData)
    }
    async AddDonation(body: any): Promise<any> {
        const formData = new FormData();
        if (body.Id) formData.append('Id', body.Id)
        if (body.DonationTypeId) formData.append('DonationTypeId', body.DonationTypeId)
        if (body.AttachmentDocument) formData.append('AttachmentDocument', body.AttachmentDocument);
        if (body.DonationDetailTypeId) formData.append('DonationDetailTypeId', body.DonationDetailTypeId)
        if (body.TransactionId) formData.append('TransactionId', body.TransactionId)
        if (body.Amount) formData.append('Amount', body.Amount)
        if (body.Date) formData.append('Date', body.Date)
        if (body.DonorId) formData.append('DonorId', body.DonorId)
        if (body.DonationStatusId) formData.append('DonationStatusId', body.DonationStatusId)
        if (body.Attachment) formData.append('Attachment', body.Attachment)
        if (body.Attach) formData.append('Attach', body.Attach)
        if (body.InventoryId) formData.append('InventoryId', body.InventoryId)
        if (body.Quantity) formData.append('Quantity', body.Quantity)
        return await this.httpService.postFormData<any>('Admin/InsertUpdateDonation', formData)
    }

    async DeleteUser(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-user', null, body)
    }
    async DeleteDonor(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-donor', null, body)
    }

    async GetDonor(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/GetDonor', body)
    }
    async GetDonation(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/GetDonation', body)
    }
    async InsertUpdateDonation(body?: any): Promise<any> {
        return await this.httpService.post<any>('Admin/InsertUpdateDonation', body)
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
    async UpdateDonationStatus(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/UpdateDonationStatus', body)
    }

    async UpdateQueryStatus(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/update-query-status', null, body)
    }
    async UpdateSemesterStatus(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/update-semester-status', null, body)
    }
    async GetSemesterStatus(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-semester-status');
    }
    async AddInventoryComponent(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/GetInventory');
    }
    async getDesignation(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-designation');
    }

    async getAssignment(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-assignment');
    }
    async getDepartment(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-department');
    }
    async getGender(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-gender');
    }
    async getShift(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-shift');
    }
    async getStatus(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-status');
    }
    async getReligion(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-religion');
    }
    async getMaritalStatus(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-marital-status');
    }
    async getContractType(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-contract-type');
    }
    async getCity(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-cities');
    }
    async getEmpType(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-employment-type');
    }

    async AddEmployee(body: any): Promise<any> {
        debugger
        const formData = new FormData();
        if (body.Id) formData.append('Id', body.Id);
        // Append nullable integer properties
        formData.append("Id", body.Id ?? '');
        formData.append("DesignationId", body.DesignationId ?? '');
        formData.append("DepartmentId", body.DepartmentId ?? '');
        formData.append("EmployementTypeId", body.EmployementTypeId ?? '');
        formData.append("ContractTypeId", body.ContractTypeId ?? '');
        formData.append("ShiftId", body.ShiftId ?? '');
        if (body.ProfilePicture) formData.append("ProfilePicture", body.ProfilePicture ?? '');
        if (body.attachmentUrl) formData.append("attachmentUrl", body.attachmentUrl ?? '');
        formData.append("GenderId", body.GenderId ?? '');
        formData.append("MaritalStatusId", body.MaritalStatusId ?? '');
        formData.append("ReligionId", body.ReligionId ?? '');
        formData.append("CityId", body.CityId ?? '');
        formData.append("StatusId", body.StatusId ?? '');
        formData.append("Salary", body.Salary ?? '');
        formData.append("EmergencyContactNo", body.EmergencyContactNo ?? '');
        formData.append("PersonalPhoneNumber", body.PersonalPhoneNumber ?? '');

        // Append string properties
        formData.append("Name", body.Name ?? '');
        formData.append("Email", body.Email ?? '');
        formData.append("Phone", body.Phone ?? '');
        formData.append("Location", body.Location ?? '');
        formData.append("EmergencyContactRelation", body.EmergencyContactRelation ?? '');
        formData.append("CNIC", body.CNIC ?? '');
        formData.append("FatherName", body.FatherName ?? '');
        formData.append("PersonalEmail", body.PersonalEmail ?? '');
        formData.append("PermanentAddress", body.PermanentAddress ?? '');
        formData.append("ResidentialAddress", body.ResidentialAddress ?? '');

        // Append date properties (ensure proper format)
        formData.append("DateOfJoining", body.DateOfJoining ? body.DateOfJoining : '');
        formData.append("DateOfExit", body.DateOfExit ? body.DateOfExit : '');
        formData.append("DateOfBirth", body.DateOfBirth ? body.DateOfBirth : '');

        // Append file properties
        if (body.Attachment) formData.append("Attachment", body.Attachment);
        if (body.Profile) formData.append("Profile", body.Profile);
        console.log(formData);

        return await this.httpService.postFormData<any>('Admin/insert-update-employee', formData)

    }

    async getEmpById(Id?: any): Promise<any> {
        debugger
        return await this.httpService.getAsync<any>(`Admin/get-employee-by-id?Id=${Id}`)

    }

    async getVolunteerById(Id?: any): Promise<any> {
        debugger
        return await this.httpService.getAsync<any>(`Admin/get-volunteer-by-id?Id=${Id}`)

    }

    async deleteDynamicRow(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/DeleteTableRow', body);
    }

    async getVolunteers(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-volunteer')
    }

    async AddVolunteer(body: any): Promise<any> {
        debugger
        const formData = new FormData();
        if (body.Id) formData.append('Id', body.Id);
        if (body.ProjectAssigmentId) formData.append('ProjectAssigmentId', body.ProjectAssigmentId);
        if (body.DepartmentId) formData.append('DepartmentId', body.DepartmentId);
        if (body.VolunteerRoleId) formData.append('VolunteerRoleId', body.VolunteerRoleId);
        if (body.AvailabilityTime) formData.append('AvailabilityTime', body.AvailabilityTime);
        if (body.AvailabilityDayIds) formData.append('AvailabilityDayIds', body.AvailabilityDayIds);
        if (body.GenderId) formData.append('GenderId', body.GenderId);
        if (body.MaritalStatusId) formData.append('MaritalStatusId', body.MaritalStatusId);
        if (body.ReligionId) formData.append('ReligionId', body.ReligionId);
        if (body.CityId) formData.append('CityId', body.CityId);
        if (body.StatusId) formData.append('StatusId', body.StatusId);
        if (body.ProfilePicture) formData.append("ProfilePicture", body.ProfilePicture ?? '');
        if (body.attachmentUrl) formData.append("attachmentUrl", body.attachmentUrl ?? '');
        if (body.Name) formData.append('Name', body.Name);
        if (body.Email) formData.append('Email', body.Email);
        if (body.Phone) formData.append('Phone', body.Phone);
        if (body.PermanentAddress) formData.append('PermanentAddress', body.PermanentAddress);
        if (body.DateOfJoining) formData.append('DateOfJoining', body.DateOfJoining);
        if (body.DateOfExit) formData.append('DateOfExit', body.DateOfExit);
        if (body.Location) formData.append('Location', body.Location);
        if (body.EmergencyContactNo) formData.append('EmergencyContactNo', body.EmergencyContactNo);
        if (body.EmergencyContactRelation) formData.append('EmergencyContactRelation', body.EmergencyContactRelation);
        if (body.Cnic) formData.append('Cnic', body.Cnic);
        if (body.DateOfBirth) formData.append('DateOfBirth', body.DateOfBirth);
        if (body.FatherName) formData.append('FatherName', body.FatherName);
        if (body.ResidentialAddress) formData.append('ResidentialAddress', body.ResidentialAddress);
        if (body.PersonalPhoneNumber) formData.append('PersonalPhoneNumber', body.PersonalPhoneNumber);
        if (body.PersonalEmail) formData.append('PersonalEmail', body.PersonalEmail);

        if (body.Profile) formData.append('Profile', body.Profile);
        if (body.Attachment) formData.append('Attachment', body.Attachment);


        console.log(formData);

        return await this.httpService.postFormData<any>('Admin/insert-volunteer', formData)

    }

    async getBenificiarytype(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-beneficiary-type');
    }

}