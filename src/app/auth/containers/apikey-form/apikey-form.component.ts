import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-apikey-form',
  templateUrl: './apikey-form.component.html',
  styleUrls: ['./apikey-form.component.css']
})
export class ApikeyFormComponent implements OnInit ,OnDestroy{
  apiKeyForm!:FormGroup;
  authServiceSub:any;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) {
    this.apiKeyForm=this.fb.group({
      key:['d4942956-87b1-4816-b8f5-45483fa05201',[Validators.required,Validators.minLength(36),Validators.maxLength(36)]]
    })
   }
  ngOnDestroy(): void {
    if(this.authServiceSub) this.authServiceSub.unsubscribe();
  }

  ngOnInit(): void {
     
  }
  getKeyErrorMessage(){
    if(this.apiKeyForm.controls["key"].hasError("required")){
      return "Please enter api key."
    }else {
      return "Api Key length should be equal to 63."
    }
  }

  onSubmit(){
      this.authServiceSub=this.authService.Authenticate(this.apiKeyForm.controls["key"].value).subscribe(
        {
          next: (x: any) => {
            this.authService.ApiKey = x;
            this.router.navigate(['dashboard','product','list']);
           
          },
          error: (err) => {
            console.log(err);
           
          },
        })
      ;
  }

}
