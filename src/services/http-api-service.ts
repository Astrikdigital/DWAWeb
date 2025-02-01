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
    async getStates(countryId: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-states', { countryId: countryId });
    }
    async getCities(stateId: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-cities', { stateId: stateId });
    }
    async getAllPrograms(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-programs', body);
    }

    async GetRegistrationDDL(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-registrationddl')

    }

    async getAllBatches(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-batches', body);
    }
    async GetStudentFacultyByString(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('notification/get-student-faculty-by-string', body);
    }
    async getSemesterDesigns(body: any = null): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-new-semester-design', body)

    }
    async getSemesterCourses(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-semester-mapped-courses', body)

    }
    async getProgramCourses(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-program-courses', body)

    }

    async getfaculties(body?: any): Promise<any> {
        debugger
        return await this.httpService.getAsync<any>('Admin/get-registration', body)

    }
    async getAllSections(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-sections', body)

    }
    async getAllSemesters(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-semester', body)

    }
    async getFacultyCourses(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('admin/get-faculty-course-mapping', body)

    }
    

    async DownloadExcel(): Promise<any> {
        return await this.httpService.getAsync<any>('admin/download-excel')
    }

    
    async getAdminDashboard(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-admin-dashboard')

    }
    async getFacultyDashboard(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Faculty/get-faculty-dashboard', body)

    }
    async getFacultyStudent(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Faculty/get-faculty-student', body)

    }
    async AddFaculty(body: any): Promise<any> {
debugger
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
        return await this.httpService.postFormData<any>('Admin/insert-update-registration', formData)

    }
    async AddCourse(body: any): Promise<any> {

        const formData = new FormData();
        formData.append('IsEnabled', body.isEnabled);
       if(body.attachPicture) formData.append('attachPicture', body.attachPicture);
       if(body.pictureUrl) formData.append('PictureUrl', body.pictureUrl);
        if (body.id) formData.append('Id', body.id);
        formData.append('Description', body.description);
        formData.append('CourseCode', body.courseCode);
        formData.append('CourseName', body.courseName);
        formData.append('ProgramId', body.programId); return await this.httpService.postFormData<any>('Admin/insert-update-course', formData)

    }
    async AddProgram(body: any): Promise<any> {

        const formData = new FormData(); 
        formData.append('Title', body.title);
        formData.append('ProgramShortCode', body.programShortCode);
        formData.append('TotalSemesters', body.totalSemesters);
        formData.append('Description', body.description);
        formData.append('TotalCourses', body.totalCourses);
        if (body.id) formData.append('Id', body.id);
       if(body.programPicUrl) formData.append('ProgramPicUrl', body.programPicUrl);
      if(body.attachProfilePicture)  formData.append('attachProfilePicture', body.attachProfilePicture); 
        return await this.httpService.postFormData<any>('Admin/insert-update-program', formData)

    }
    async AddBatch(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/insert-update-batch', body)

    }
    async AddSemesterDesign(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/insert-update-semester-design', body)

    }
    async AddSection(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/insert-update-section', body)

    }
    async AddSemester(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/insert-update-semester', body)

    }
    async GetStudents(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-all-student', body)

    }
    async AddStudent(body: any): Promise<any> {

        const formData = new FormData();
        formData.append('FirstName', body.firstName);
        formData.append('LastName', body.lastName);
        formData.append('Email', body.email);
        formData.append('DateOfBirth', body.dateOfBirth);
        formData.append('GenderId', body.genderId);
        formData.append('Phone', body.phone);
        formData.append('UserName', body.userName);
        formData.append('Address', body.address);
        formData.append('CityId', body.cityId);
        if (body.id) formData.append('Id', body.id);
      if(body.pictureUrl)  formData.append('pictureUrl', body.pictureUrl);
        formData.append('CountryId', body.countryId);
        formData.append('StateId', body.stateId);
        formData.append('PostalCode', body.postalCode);
        formData.append('EmergencyPhone', body.emergencyPhone);
        formData.append('EmergencyPersonRelation', body.emergencyPersonRelation);
        if (body.attachPicture) formData.append('attachPicture', body.attachPicture);
         return await this.httpService.postFormData<any>('Admin/insert-update-student', formData)

    }
    async getMappedBatches(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-mapped-batches', body)

    }
    async getMappedSemesters(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-mapped-semesters', body)

    }
    async getMappedSections(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-mapped-sections', body)

    }
    async getProgramsByProgramId(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-programs-byids', body)

    }
    async getCoursesByProgramId(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-courses-by-program-ids', body)

    }
    async getCoursesProgramById(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-semester-data', body)

    }
    async getBatchesByProgramId(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-batches-by-programids', body)

    }
    async AddStudentEnrollment(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/insert-update-student-enrollment', body)

    }

    async AddStudentEnrollmentCourse(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/insert-update-student-enrollment-course', body)

    }
    async GetStudentById(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-student-by-id', body)

    }
    async GetEnrollmentByStudentId(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-enrollment-by-student-id', body)

    }
    async GetEnrollmentCourseByEnrollmentId(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-enrollment-course-by-enrollment-id', body)

    }
    async DeleteFaculty(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-registration', null, body)

    }
    async DeleteStudent(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-student', null, body)

    }
    async DeleteProgram(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-program', null, body)

    }
    async DeleteCourse(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-course', null, body)

    }
    async DeleteBatch(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-batch', null, body)

    }
    async DeleteBatchRoaster(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-batchroaster', null, body)

    }
    async DeleteSemester(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-semester', null, body)

    }
    async DeleteSemesterDesign(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-semester-design', null, body)

    }
    async DeleteSection(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-section', null, body)

    }
    async DeleteEnrollment(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-student-enrollment', null, body)

    }
    async GetSemesterDesignByCourseFaculty(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-semester-design-bycoursefaculty', body)

    }
    async GetCourseFaculty(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-all-course-faculty')

    }
    async GetRooms(): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-all-rooms')

    }

    async GetBatchRoasterStatus(): Promise<any> {
        return await this.httpService.getAsync<any>('Common/get-batchroaster-status')

    }


    async GetWeekRoasterByDate(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-weekroasterbydate', body)

    }
    async AddBatchRoaster(body: any): Promise<any> {
        return await this.httpService.post<any>('Admin/insert-update-batch-roaster', body)

    }
    async AddNotification(body: any): Promise<any> {

        const formData = new FormData();
        formData.append('AudienceTypeId', body.audienceTypeId);
        formData.append('NotificationTypeId', body.notificationTypeId);
        if (body.id) formData.append('Id', body.id);
        formData.append('NotificationTitle', body.notificationTitle);
        formData.append('Summary', body.summary);
        formData.append('StatusId', body.statusId);
        if (body.scheduledDate) formData.append('ScheduledDate', body.scheduledDate);
        if (body.scheduledTime) formData.append('ScheduledTime', body.scheduledTime);
        if (body.entityId) formData.append('EntityId', body.entityId);
        if (body.attachProfilePicture) formData.append('attachProfilePicture', body.attachProfilePicture);
        if (body?.batchIds?.length)
            body.batchIds.forEach((id: any) => {
                formData.append('BatchIds', id);
            }); return await this.httpService.postFormData<any>('Notification/insert-update-notification', formData)

    }
    async GetNotificationById(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Notification/notification-by-id', body)

    }
    async GetAdminNotifications(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Notification/get-admin-notifications', body)

    }
    async GetAllNotification(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Notification/get-all-notifications', body)

    }
    async GetNotificationDll(): Promise<any> {
        return await this.httpService.getAsync<any>('Notification/get-notifications-ddl')

    }
    async GetBatchRoasterDetail(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('admin/get-batch-roasterdetails', body)

    }
    async UpdateRead(body: any): Promise<any> {
        return await this.httpService.post<any>('Notification/update-read-notification', null, body)

    }
    async getFacultyStudentDetail(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-faculty-student-detail', body)

    }
    async getFacultyAssignedCourse(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-faculty-courses', body)

    }
    async getFacultyCourseDetail(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-faculty-course-detail', body)

    }
    async getFacultyAssignments(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-assignment-by-faculty', body)

    }
    async getFacultyAssignmentChecking(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-assignment-checking', body)

    }
    async GetAssignmentStudentByAssignment(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-assignment-student-by-assignment-id', body)

    }

    async getFacultyPastAssignment(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-faculty-past-assignment', body)

    }
    async getMyProfile(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Common/my-profile', body);
    }
    async ChangePassword(body: any): Promise<any> {
        return await this.httpService.post<any>('auth/change-password', body)

    }
    async AddCourseMaterial(body: any): Promise<any> {

        const formData = new FormData();
        formData.append('CourseFacultyId', body.CourseFacultyId);
        formData.append('CourseMaterialTypeId', body.CourseMaterialTypeId);
        if (body.ReadingTypeId) formData.append('ReadingTypeId', body.ReadingTypeId);
        formData.append('Topic', body.Topic);
        formData.append('Description', body.Description);
        formData.append('SemesterCourseId', body.SemesterCourseId);
        if (body.Author) formData.append('Author', body.Author);
        if (body.Link) formData.append('Link', body.Link);
        if (body.DocumentUrl) formData.append('DocumentUrl', body.DocumentUrl);
        if (body.Id) formData.append('Id', body.Id);
        if (body.AttachFile) formData.append('AttachFile', body.AttachFile);
         return await this.httpService.postFormData<any>('faculty/insert-update-course-material', formData)

    }
    async GetCourseMaterial(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-course-material', body)

    }
    async GetSemesterDesignByFaculty(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Faculty/get-semester-design-by-faculty-id', body)

    }
    async GetReadingType(): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-reading-types')

    }
    async AddAssignment(body: any): Promise<any> {

        const formData = new FormData();
        formData.append('Title', body.Title);
        formData.append('Summary', body.Summary);
        formData.append('TotalMark', body.TotalMark);
        if(body.Id) formData.append('Id', body.Id);
        formData.append('PassingMark', body.PassingMark);
        formData.append('Deadline', body.Deadline);
       if(body.DocumentUrl) formData.append('DocumentUrl', body.DocumentUrl);
        formData.append('IsCompleted', body.IsCompleted);
        formData.append('SemesterCourseIds', body.SemesterCourseIds);
        formData.append('IsCompleted', "false");
        if (body.AttachFile) formData.append('AttachFile', body.AttachFile);
         return await this.httpService.postFormData<any>('faculty/insert-update-assignment', formData)

    }
    async EvaluateAssignment(body: any): Promise<any> {
        return await this.httpService.post<any>('Faculty/evaluate-assignment', body)

    }


    async GetAssignmentStudentById(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Faculty/get-assignment-student-by-id', body)

    }
    async GetAssignmentDetailById(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Faculty/get-assignment-detail-by-id', body)

    }
    async GetStudentDashboard(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Student/get-student-dashboard', body)

    }
    async GetStudentAssignment(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Student/get-student-assignment', body)

    }
    async GetStudentCourseDetail(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Student/get-course-detail', body)

    }
    async GetAssignmentById(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Student/get-assignment-by-id', body)

    }
    async StudentAssignmentUpload(body: any): Promise<any> {

        const formData = new FormData();
        formData.append('Id', body.Id);
        if (body.AttachFile) formData.append('AttachFile', body.AttachFile); 
        return await this.httpService.postFormData<any>('Student/student-assignment-upload', formData)

    }
    async GetFacultyClassSchedule(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('faculty/get-faculty-class-schedule', body)

    }
    async GetStudentClassSchedule(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('student/get-student-class-schedule', body)

    }
    async GetStudentCourses(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-student-courses', body)

    }
    async GetEnrollCourseStatus(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-enroll-course-status')

    }
    async UpdateStdenrollCourseStatus(body: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/update-stdenroll-course-status', body);
    }
    async GetUserName(body?: any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-user-name', body);
    }

    async getAssignmentByAssignmentId(body:any): Promise<any> {
        return await this.httpService.getAsync<any>('Faculty/get-assignment-by-assignment-id',body) 
    }
    async getAssignmnets(body:any): Promise<any> {
        return await this.httpService.getAsync<any>('Faculty/get-assignments',body) 
    }
    async getAllUsers(body:any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-users',body)
    }
    async getAllQueries(body:any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-help-center-query',body)
    }
    async getThreadQueries(body:any): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-query-by-thread-id',body) 
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
        
    async AddQuery(body:any): Promise<any> {
        const formData = new FormData();
        formData.append('CourseFacultyId', body.CourseFacultyId);
        formData.append('SemesterCourseId', body.SemesterCourseId); 
        formData.append('ToUserId', body.ToUserId); 
        formData.append('Subject', body.Subject);  
        formData.append('Body', body.Body);  
        formData.append('IsOwner', body.IsOwner);
      if(body.ThreadId)  formData.append('ThreadId', body.ThreadId);
        formData.append('ThreadStatusId', body.ThreadStatusId);  
        formData.append('FromUserId', body.FromUserId);  
       if(body?.Attachments?.length) {
        for (let index = 0; index < body.Attachments.length; index++) { 
            formData.append('Attachments', body.Attachments[index]);
        } 
    }  
        return await this.httpService.postFormData<any>('Admin/insert-update-query',formData) 
    }
    async DeleteUser(body:any): Promise<any> {
        return await this.httpService.post<any>('Admin/delete-user',null,body) 
    }
    async UpdateQueryStatus(body:any): Promise<any> {
        return await this.httpService.post<any>('Admin/update-query-status',null,body) 
    }
    async UpdateSemesterStatus(body:any): Promise<any> {
        return await this.httpService.post<any>('Admin/update-semester-status',null,body) 
    }
    async GetSemesterStatus(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/get-semester-status'); 
    }
    async AddInventoryComponent(): Promise<any> {
        return await this.httpService.getAsync<any>('Admin/GetInventory');
    }
    async UpdateInventory(body:any): Promise<any> {
        return await this.httpService.post<any>('Admin/InsertUpdateInventory',null,body)
    }    
    
    
}