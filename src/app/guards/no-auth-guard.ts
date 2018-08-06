import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, pipe} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
      .pipe(take(1), map(authState => {
        if (authState) {
          this.router.navigate(['']);
        }
        return true;
      }));
  }
}
