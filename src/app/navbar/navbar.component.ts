import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckLoginService } from '../service/check-login.service';
import { DatabaseOperationService } from '../service/database-operation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin: boolean = false;
  userName?:string;

  constructor(private router: Router, private checkLogin: CheckLoginService, private dbOperation: DatabaseOperationService) { }

  ngOnInit(): void {

    this.checkLogin.loggedIn$.subscribe(
      loggedIn => {
        this.isLogin = loggedIn;
        if(loggedIn){
          this.dbOperation.getUser().subscribe(data=> console.log(this.userName = data.name))
        }
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  userLogout() {
    console.log(this.isLogin);
    this.checkLogin.logout();
    this.isLogin = false; // Update the component's state
    this.router.navigate(['']);
  }


  navigateTo(path: string) {
    this.router.navigate(['path']);
  }

  showDropdown: boolean = false; // To toggle dropdown visibility

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
