import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm !: FormGroup;

  constructor(
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name:["", [Validators.required]],
      email:["",[Validators.required]],
      password:["",[Validators.required]],
      mobile:["",[Validators.required]]
    })
  }
  register(regForm:any){
    this.api.register(regForm.value).subscribe((res:any) =>{
      if(res.status == 400){
        alertify.error(res.message)
      }else{
        alertify.success(res.message);
        this.router.navigate(["/login"])
      }
    })
  }
}
