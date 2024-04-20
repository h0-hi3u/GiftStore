import { jwtDecode } from 'jwt-decode';
// import decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('access_token') || '';
    // decode the token to get its payload
    const tokenPayload = this.getRoleToken(token);
    console.log(tokenPayload);
    
    if (
      !this.auth.isLoggedIn() || 
      tokenPayload !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  private getRoleToken(token: string): any {
    if(token !== '') {
        const expiry = JSON.parse(window.atob(token.split('.')[1]));
        console.log(expiry);
        
        return expiry['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    } else {
        return '';
    }
  }
}
