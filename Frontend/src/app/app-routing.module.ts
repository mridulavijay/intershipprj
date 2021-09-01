import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { CreatecourseComponent } from './createcourse/createcourse.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [{path:'',component:LoginComponent},{path:'signup',component:SignupComponent},{path:'sidebar',component:SidebarComponent,children:[{path:'',component:StudenthomeComponent},
{path:'createcourse',component:CreatecourseComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
