import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login', { replaceUrl: true });
          return false;
        }
        return true;
      })
    );
  }
}
