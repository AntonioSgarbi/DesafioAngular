import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from "../public/service/token.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private tokenService: TokenService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return this.tokenService.isAdmin() ? true : this.router.navigateByUrl('home');
  }

}
