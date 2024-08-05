import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Card } from '../models/card';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;


  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder : FormBuilder,
    private https : HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:['',
        [Validators.required, Validators.maxLength(255)],
      ],
      email:['',
        [Validators.required, Validators.maxLength(255)],
      ],
      password:['',
        [Validators.required, Validators.maxLength(255)],
      ],
      mobile:['',
        [Validators.required, Validators.maxLength(255)],
      ]
    })
  }
  signup(){
    this.https.post<any>("http://localhost:8080/signupUsers", this.signupForm.value)
      .subscribe(res=>{
        this._snackBar.open("Kayıt başarılı",'' , {
          duration: 4000,})
          this.signupForm.reset();
          this.router.navigate(['login']);
      }, err =>{
        this._snackBar.open("Kayıt başarısız",'' , {
          duration: 4000,})
      })
  }

}
