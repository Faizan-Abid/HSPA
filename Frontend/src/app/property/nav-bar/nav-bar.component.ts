import { Component } from '@angular/core';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
loggedInUser: string | null = null;

constructor( private alertify: AlertifyService){
   
}

  loggedIn(){
     this.loggedInUser = localStorage.getItem('token');
    return this.loggedInUser
  }
  onLogout(){
    localStorage.removeItem("token");
    this.alertify.success('You are Logged out');
  }
}
