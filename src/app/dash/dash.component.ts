import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  isAuthenticated: boolean = false;

  constructor(
    public authSer: AuthService
  ){}

  userAuthenticated(){
    this.isAuthenticated = !this.isAuthenticated;
  }
}
