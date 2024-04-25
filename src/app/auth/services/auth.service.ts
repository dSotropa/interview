import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, delay, of, tap} from 'rxjs';
import {SalesDataService} from "../../shared/services/sales-data.service";
import {User} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private fakeUserInfo: User = {
    name: 'User Test'
  }

  constructor(private router: Router, private salesDataService: SalesDataService) {
  }

  login(email: string, password: string): Observable<User | boolean> {
    // top-notch security here
    const areCredentialsValid = email === 'test@email.com' && password === "Password123";
    return of(areCredentialsValid ? this.fakeUserInfo : false)
      .pipe(
        tap((value: User | boolean) => {
          if (value) {
            this.$user.next(value as User);
            this.salesDataService.getSalesData();
            this.router.navigate(['']);
          }
        }),
        delay(250));
  }

  logout() {
    this.$user.next(null);
    this.router.navigate(['/login']);
  }
}
