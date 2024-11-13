import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Inject, Injectable, inject } from "@angular/core"; 
import { UserCredential } from "../model/user.credential.interface"; 
import { Observable, catchError, retry, throwError } from "rxjs"; 
import { CommonMessage } from "../model/common.message"; 
import { CommonService } from "./common.service"; 
import { AppSetting } from "../model/app.setting"; 
import { CurrentUser } from "../model/currentUser"; 
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' }) 

export class AuthenticationService{ 
  appSet: AppSetting = new AppSetting(); 
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) }; 
  helper = new JwtHelperService; 
  http = inject(HttpClient); 
  service = inject(CommonService); 
  
  validateCredential(cred: UserCredential): Observable<UserCredential> { 
    var result = this.http.post<UserCredential>(this.appSet.urlApi + 'user/validatecredential', cred, this.httpOptions) 
    .pipe(retry(0), catchError(this.errorHandler));
     return result; 
  } 
  
  login(token: string){ 
    localStorage.setItem(this.appSet.tokenName, token); 
    window.location.href = '/'; 
  } 
  
  logout(){ 
    this.http.patch(this.appSet.urlApi + 'user/logout', this.httpOptions) 
    .pipe(retry(0), catchError(this.errorHandler)).subscribe( _ => { }); 
    localStorage.removeItem(this.appSet.tokenName); 
    window.location.href = '/login'; 
  } 
  
  public get currentUser(): CurrentUser{ 
    var token = localStorage.getItem(this.appSet.tokenName); 
    var currUser = new CurrentUser(); 
    
    if (token != null){ 
      const decodedToken = this.helper.decodeToken(token.toString()); 
      const date = new Date(0); date.setUTCSeconds(decodedToken.exp); 
      currUser.username = 'Web App User'; 
      currUser.expirationDate = date; 
    } 
    return currUser; 
  } 
  
  errorHandler(error: any) { 
    let errorMessage = ''; 
    
    if (error.error instanceof ErrorEvent) { 
      errorMessage = error.error.message; 
    } else { 
      errorMessage = 'Error:' + error.status + error.error;
      if (error.status == 0) { 
        errorMessage = this.appSet.errorMessage; 
      } 
      if (error.status == 401) { 
        alert(errorMessage); 
        localStorage.removeItem(this.appSet.tokenName); 
        window.location.href = '/login'; 
      } 
    } 
    alert(errorMessage); 
    return throwError(errorMessage); }
  }