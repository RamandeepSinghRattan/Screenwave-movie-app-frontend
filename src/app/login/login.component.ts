import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseOperationService } from '../service/database-operation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CheckLoginService } from '../service/check-login.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // myForm: FormGroup;

  private emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;  // Email regex pattern
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password regex pattern

  constructor(
    private fb: FormBuilder,
    private dbOperation: DatabaseOperationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private checkLogin: CheckLoginService
  ) { }

  ngOnInit(){
    window.scrollTo(0, 0);
  }

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern), this.noUppercaseValidator()]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
  });

  onLogin() {
    console.log(this.myForm.value);
    this.dbOperation.generateToken(this.myForm.value).subscribe(
      (response: any) => {
        console.log(response);

        const token = response.token;
        console.log("Token: " + token);

        this.dbOperation.login(token);  

        this.checkLogin.login();
        this.router.navigateByUrl("movies")
        this.snackBar.open('Login successful', 'Close', { duration: 2000 });
        
        
      },
      (err) => {
        
        this.snackBar.open('Invalid username and password', 'Close', { duration: 2000 });
        this.checkLogin.logout();
        // console.log("Error:", err.message);
      }
    );
  }

   noUppercaseValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const email = control.value;
      if (email && /[A-Z]/.test(email)) {
        return { noUppercase: true };
      }
      return null;
    };
  }

}
