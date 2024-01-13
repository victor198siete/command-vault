import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    fb = inject(FormBuilder);
    http = inject(HttpClient);

    form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    username: string = '';
    password: string = '';
    loginValue: boolean = false;
    btnValue: string = 'Login';

    constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(){
    this.changeBtnValue();
  }

  changeBtnValue(){
    this.loginValue = !this.loginValue;
    if(this.loginValue === true){
      this.btnValue = "Login";
    } else {
      this.btnValue = "Register";
    }
  }

  submitForm(){
    console.log("Submitting Form!");
    console.log("username:", this.username);
    console.log("password:", this.password);
    this.authService.login(this.username, this.password);
  }

  login() {
    this.http.post('http://localhost:3000/api/login', { username: this.username, password: this.password })
        .subscribe(
          {
            next: (response: any) => {
              localStorage.setItem('token', response.token);
            },
            error: (error:any) => {
              console.error(error);
            }
          })
  }
}

