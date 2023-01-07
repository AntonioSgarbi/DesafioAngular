import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {AuthResponse} from 'src/app/types/auth.type';
import {TokenService} from 'src/app/public/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder, private http: HttpClient, private router: Router, private tokenService: TokenService) {

    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    })

  }

  login(): void {
    if (this.formGroup.valid) {
      this.http.post<AuthResponse>(`${environment.api}/login`, this.formGroup.getRawValue())
        .subscribe({
          next: (data) => {
            console.error(data)
            this.tokenService.setAccessToken(data.result.token)
            this.tokenService.isAdmin() ? this.router.navigateByUrl('/admin') : this.router.navigateByUrl('/user')
          }
        });
    }
  }

}
