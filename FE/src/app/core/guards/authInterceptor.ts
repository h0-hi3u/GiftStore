import { AuthService } from './../services/auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const access_token = this.authService.getToken();
        const authReq = req.clone( {
            headers: req.headers.set('Authorization', "Bearer " + access_token || '')
        });
        return next.handle(authReq);
    }
}