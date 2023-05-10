import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm);
    const token = this.authService.authUser(loginForm.value);
    if (token) {
      localStorage.setItem('token', token.userName);
      console.log('Login successful');
      this.router.navigate(['/']);
    } else {
      console.log('Login insuccessful');
    }
  }

}
