import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
item={email:"",
password:""}
submitted =false;
LoginError ={
  error : false,
  errorMsg : ''
};
  constructor(private auth:AuthorizeService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){   
    this.auth.loginUser(this.item)
    .subscribe(res=>{
      
        localStorage.setItem('token', res.tok)   
        localStorage.setItem('category', res.category)         
        //localStorage.setItem('currentUser', this.User.email);
        
        if (res.category=="professor")
        this.router.navigate(['/sidebar'])
        else{
          this.router.navigate(['/signup'])
        }
      },
      err => {
        
        if (err.error=="Invalid credentials")       
       
        {alert("Invalid Credentials");}
        else if(err.error=="User not registered.Please sign up")
        {alert("User not registered.Please sign up");}
        else{
          alert("Error in the backend ");
        }
        
      }
    ) 
  }
}

