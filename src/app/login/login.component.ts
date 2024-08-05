import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { Subscriber } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup

  constructor(
    private formBuilder :FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login(){
      this.http.get<any>("http://localhost:8080/signupUsers")
      .subscribe(res=>{
        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if(user){
          this._snackBar.open("Giriş başarılı",'' , {
            duration: 4000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.loginForm.reset();
          this.router.navigate(['cards'])
        }else{
          this._snackBar.open("Yanlış E-posta veya Şifre",'' , {
            duration: 4000,
            panelClass: ['mat-toolbar', 'mat-warn']
            
          });
        }
      },err=>{
          alert("something went wrong!!")
      })
  }

}
 