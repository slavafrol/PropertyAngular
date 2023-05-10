import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: any = {};
  constructor() { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      userName: new FormControl('Mark', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    }, this.pwdMatchValidator);
  }

  pwdMatchValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
    { notmatched: true }
  }

  onSubmit() {
    this.user = Object.assign(this.user, this.registrationForm.value);
    let users = [];
    this.addUser(this.user);
  }

  addUser(user: any) {
    let users = [];
    if (localStorage.getItem('Users')) {
      console.log(localStorage.getItem('Users'))
      users = JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

}
