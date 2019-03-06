import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { UserformComponent } from './userform/userform.component';
import{LoginComponent}from './login/login.component';
import{BusinessuserComponent}from './businessuser/businessuser.component'


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'register',
    component: BusinessuserComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
  path:'userform',
    component:UserformComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
