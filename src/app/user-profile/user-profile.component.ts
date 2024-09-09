import { Component } from '@angular/core';
import { DatabaseOperationService } from '../service/database-operation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user: any;

  constructor(private dbOperation: DatabaseOperationService, private snackBar: MatSnackBar,private router :Router) { }

   ngOnInit(){
    this.dbOperation.getUser().subscribe(data=>{
      this.user = data;
      console.log(this.user);
      
    })
   }


   navigateTo(movieId : number)
{
  this.router.navigate([`movie/${movieId}`])
}
}
