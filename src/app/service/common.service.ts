import { Injectable, inject } from '@angular/core'; 
import { AppSetting } from '../model/app.setting'; 
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Observable, catchError, retry, throwError } from 'rxjs'; 
import { ToastrService } from 'ngx-toastr'; 
import { CommonMessage } from '../model/common.message'; 
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
// import { ModalMessageComponent } from '../view/pop-up/modal-message/modal-message.component'; 
// import { ModalYesnoComponent } from '../view/pop-up/modal-yesno/modal-yesno.component'; 
import { SpParam } from '../model/spParam'; 

@Injectable({ providedIn: 'root' }) 

export class CommonService { 
    httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'}); 
    httpOptions = { headers: this.httpHeaders }; 
    // modalService = inject(NgbModal); 
    toastSvr = inject(ToastrService); 
    http = inject(HttpClient); 
    appSet: AppSetting = new AppSetting(); 
    
    get token(){ return localStorage.getItem(this.appSet.tname); } 
    
    removeUserInfo() { localStorage.removeItem(this.appSet.tname); } 
    
    showSuccess(msg: string, title: string){ 
        this.toastSvr.success(msg, title, { positionClass: 'toast-bottom-right' }); } 
    
    showError(msg: string, title: string){ 
        this.toastSvr.error(msg, title, { positionClass: 'toast-bottom-right' }); } 
    
    showInfo(msg: string, title: string){ 
        this.toastSvr.info(msg, title, { positionClass: 'toast-top-right' }); } 
    
    showWarning(msg: string, title: string){ 
        this.toastSvr.warning(msg, title, { positionClass: 'toast-bottom-right' }); } 
    
    // displayModalMessage(msg: CommonMessage) { 
    //     const modalRef = this.modalService.open(ModalMessageComponent, { size: msg.size, centered: msg.isCenter}); 
    //     modalRef.componentInstance.name = msg.name; 
    //     modalRef.componentInstance.errMessage = msg.errorMessages; } 
    
    // diplayModalYesNo(msg: CommonMessage) : any { 
    //     const modalRef = this.modalService.open(ModalYesnoComponent, { size: msg.size, centered: msg.isCenter}); 
    //     modalRef.componentInstance.name = msg.name; 
    //     modalRef.componentInstance.errMessage = msg.errorMessages; 
    //     modalRef.componentInstance.buttonYes = msg.buttonYes; 
    //     modalRef.componentInstance.buttonNo = msg.buttonNo; 
    //     return modalRef.componentInstance.outResponse; } 
    
    getClassName(modal: object ): string { 
        return modal.constructor.name; } save<T>(model: T, moduleName: string): Observable<string> { 
            let result = this.http.post<string>(this.appSet.urlApi + moduleName.toLowerCase() +'/save', model, this.httpOptions) 
            .pipe(retry(0), catchError(this.errorHandler)); return result; } 
            
    getById<T>(id: string, moduleName: string): Observable<T> { 
        let searcharams = new HttpParams().set("id", id); 
        let result = this.http.get<T>(this.appSet.urlApi + moduleName.toLowerCase() + '/getbyid', { headers: this.httpHeaders, params: searcharams }) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
    
    getParentById<T>(id: string, moduleName: string): Observable<T[]> { 
        let searcharams = new HttpParams().set("id", id); 
        let result = this.http.get<T[]>(this.appSet.urlApi + moduleName.toLowerCase() + '/getbyparentid', { headers: this.httpHeaders, params: searcharams }) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
    
    search<T>(param: string, moduleName: string): Observable<T[]> { 
        let searcharams = new HttpParams().set("param", param); 
        let result = this.http.get<T[]>(this.appSet.urlApi + moduleName.toLowerCase() + '/search', { headers: this.httpHeaders, params: searcharams }) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
    
    searchBySingleParam<T>(param: string, moduleName: string): Observable<T[]> { 
        let searcharams = new HttpParams().set("param", param); 
        let result = this.http.get<T[]>(this.appSet.urlApi + moduleName.toLowerCase() + '/searchbysingleparam', { headers: this.httpHeaders, params: searcharams }) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
        
    searchwithUrl<T>(param: string, url: string): Observable<T[]> { 
        let searcharams = new HttpParams().set("param", param); 
        let result = this.http.get<T[]>(this.appSet.urlApi + url.toLowerCase(), { headers: this.httpHeaders, params: searcharams }) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
    
    getall<T>(moduleName: string): Observable<T[]> { 
        let result = this.http.get<T[]>(this.appSet.urlApi + moduleName.toLowerCase() + '/getall', this.httpOptions) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
        
    delete(id: string, moduleName: string): Observable<boolean> { 
        let searcharams = new HttpParams().set("id", id); 
        let result = this.http.delete<boolean>(this.appSet.urlApi + moduleName.toLowerCase() + '/delete', { headers: this.httpHeaders, params: searcharams }) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
        
    getMethodList<T>(moduleName: string): Observable<T[]> { 
        let result = this.http.get<T[]>(this.appSet.urlApi + moduleName.toLowerCase() , this.httpOptions) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 

    getMethodById<T>(moduleName: string, id: string): Observable<T> { 
        let searcharams = new HttpParams().set("id", id); 
        let result = this.http.get<T>(this.appSet.urlApi + moduleName.toLowerCase() , { 
            headers: this.httpHeaders, params: searcharams }) 
            .pipe(retry(0), catchError(this.errorHandler)); 
            return result; 
    } 
            
    generateExcel(moduleName: string, spParam: SpParam){ 
        let result = this.http.post(this.appSet.urlApi + moduleName.toLowerCase() + '/generateexcel', spParam, { headers: this.httpHeaders, observe: 'response', responseType: 'blob' }) 
            .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
    
    downloadExcel(param: string, clearParam: string, moduleName: string){ 
        var searcharams = new HttpParams().set('param', param).set('clearParam', clearParam); 
        return this.http.get(this.appSet.urlApi + moduleName.toLowerCase() + '/generateexcel', { params: searcharams, observe: 'response', responseType: 'blob' }) 
            .pipe(retry(0), catchError(this.errorHandler)); 
    } 
    
    getTrustManualReport(reportId: string, startDate: string, endDate: string, paramString: string){ 
        var searcharams = new HttpParams().set('reportId', reportId).set('startDate', startDate).set('endDate', endDate).set('paramString', paramString); 
        return this.http.get(this.appSet.urlApi + 'trustreport/downloadreport', { params: searcharams, observe: 'response', responseType: 'blob' }) 
        .pipe(retry(0), catchError(this.errorHandler)); } 
        
    getNewGuid() : Observable<string> { 
        let result = this.http.get<string>(this.appSet.urlApi + "common/getnewguid" , { headers: this.httpHeaders }) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
        
    searchByUserId<T>(moduleName: string): Observable<T[]> { 
        let result = this.http.get<T[]>(this.appSet.urlApi + moduleName.toLowerCase() + '/searchbyuserid', this.httpOptions) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
    
    getLookupByModule<T>(url: string): Observable<T[]> { 
        let result = this.http.get<T[]>(this.appSet.urlApi + url.toLowerCase(), this.httpOptions) 
        .pipe(retry(0), catchError(this.errorHandler)); 
        return result; 
    } 
    
    errorHandler(error: any) { 
        let errorMessage = ''; 
        if (error.error instanceof ErrorEvent) { 
            errorMessage = error.error.message; } 
        else { 
            errorMessage = 'Error:' + error.status + error.error; 
            if (error.status == 0) { 
                errorMessage = this.appSet.errorMessage; 
            } 
            if (error.status == 401) { 
                alert(errorMessage); 
                localStorage.removeItem(this.appSet.tokenName); window.location.href = '/login'; 
            } 
        } 
        alert(errorMessage); return throwError(errorMessage); 
    } 

}