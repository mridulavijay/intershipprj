import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../authorize.service';
import {MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import{ BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
 
  constructor(public auth:AuthorizeService,private router:Router,private observer:BreakpointObserver) { }
  usercat=localStorage.getItem("category");
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  getusercat(){
  
    if(this.usercat=="professor"){
      return true;
    }
    else{
      return false;
    }
  }
  logoutUser()
  {
  localStorage.removeItem('token')
  localStorage.removeItem('category')
  localStorage.removeItem('currentUser');
  this.router.navigate([''])
  }
}
