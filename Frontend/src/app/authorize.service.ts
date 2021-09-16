import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  item={
    fname:"",
    lname:"",
    email:"",
    phone:"",
    address:"",
    gender:"",
    password:"",
    photo:"",
    qualification:"",
    dob:"",
    experience:"",
    courses:"",
    category:""
  }
  constructor(public http:HttpClient) { }
  newEntry(image:any, item : any)
  {
    
    const formData = new FormData();
    formData.append('file', image);  
     
    formData.append('firstname', item.fname); 
    formData.append('lastname',item.lname); 
    formData.append('email', item.email); 
    formData.append('phone', item.phone); 
    formData.append('address', item.address); 
    formData.append('qualification', item.qualification); 
    formData.append('gender', item.gender); 
    formData.append('password', item.password); 
    formData.append('DoB', item.dob); 
    if(item.courses!=""){
      formData.append('courses', item.courses); 
      formData.append('experience', item.experience); 
    }
    formData.append('category', item.category);
    formData.append('photo', item.photo); 
   
    return this.http.post<any>('http://localhost:3000/signup',formData);
    
  }
  loginUser(item:any){
    return this.http.post<any>('http://localhost:3000/login',{"profile":item});
  }
  loggedIn()
  {
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }

}
