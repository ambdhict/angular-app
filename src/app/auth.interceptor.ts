import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('WebAppToken') ?? '';

    request = request.clone({
        setHeaders:{
            Authorization: token? `Bearer ${token}` : ``;
        }
    })
}