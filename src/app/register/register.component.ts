import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DatabaseOperationService } from '../service/database-operation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegisterService } from '../service/user-register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // private emailPattern =  /^[a-z][a-z0-9._]*@[a-z]+\.[a-z]{2,3}$/;
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  private phonePattern = /^[9876]\d{9}$/;
  private namePattern = /^[A-Z][a-zA-Z]*$/;
  private lowercaseEmailPattern = /^[a-z][a-z0-9._%+-]*@gmail\.com$/;
  private uppercaseEmailPattern = /^[A-Z][A-Z0-9._%+-]*@GMAIL\.COM$/
  registerForm: FormGroup;
  user: any;
  constructor(
    private fb: FormBuilder,
    private registerService : UserRegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern), this.emailCaseValidator()]],
      phoneNo: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      imageUrl: [null]
    });
  }
  get usename() { return this.registerForm.get('username'); }
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get phoneNumber() { return this.registerForm.get('phoneNo'); }
  get password() { return this.registerForm.get('password'); }
  onRegister() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill in the form correctly.', 'Close', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      return;
    }
    const user = this.registerForm.value;
    this.registerService.register(user).subscribe({
      next: (data: any) => {
        this.snackBar.open('Registration successfull!', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error.status == 409) {
          this.snackBar.open('Email already present', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
        else {
          this.snackBar.open('Registration failed! Please try again later.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['mat-toolbar', 'mat-warn']
          });
          // console.error('Registration error:', error);
        }
      }
    });
    // this.registerForm.reset();
  }
  
private allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
emailCaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;
    // Extract the domain from the email
    const [localPart, domain] = value.split('@');
    
    // Check if the domain is in the allowed list
    const isAllowedDomain = this.allowedDomains.includes(domain?.toLowerCase() || '');
    // Define patterns for lowercase and uppercase emails
    const lowercasePattern = /^[a-z][a-z0-9._%+-]*@[a-z]+\.[a-z]{2,}$/;
    const uppercasePattern = /^[A-Z][A-Z0-9._%+-]*@[A-Z]+\.[A-Z]{2,}$/;
    // Check if the email matches either pattern and domain validation
    const isLowercase = lowercasePattern.test(value);
    const isUppercase = uppercasePattern.test(value);
    // Return validation result
    return (isAllowedDomain && (isLowercase || isUppercase)) 
      ? null 
      : { 'invalidCase':`Email must belong to domain ('gmail','yahoo','outlook).com` };
  };
}
getErrorMessage(control: AbstractControl | null, errorKey: string): string {
  if (control && control.errors && control.errors[errorKey]) {
    return control.errors[errorKey];
  }
  return '';
}


}