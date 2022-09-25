import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;

  constructor(
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }

  login(loginForm:any){
    this.api.login(loginForm.value).subscribe((result:any) =>{
      if(result.status == 400){
          alertify.error(result.message);
      }else{
        alertify.success(result.message);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.data._id)
        this.router.navigate(["/home"])
      }
    })
  }

}
