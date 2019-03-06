import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url:string = 'http://localhost:4200'
  constructor(private http:HttpClient){ }
  
  fetchUsers(callback) {
    // fetch data from backend /server side
    this.http
    .get(this._url+'/users')
    .subscribe(data=>{
      callback(data)
    },error=>{
      console.log('Unable to load data ',error)
    })
    //return users
 }

 getMaxId(callback){
  this.http
  .get(this._url+'/user/find/id/max')
  .subscribe(data=>{
    callback(data)
  },error=>{
    console.log('Unable to Process the request')
  })
 }
 createUser(userObj:any,callback){
  this.http
  .post(this._url+'/user/add',userObj).subscribe(response=>{
    callback(null)
  },error=>{
    callback(error)
  })
 }
 buildAndCreateUser(user:any,callback){
  this.getMaxId((data)=>{
    // build user object
    let userObj:any ={
      _id: parseInt(data.maxId) + 1,
      name: user.name,
      email: user.email,
      password:user.password,
      organization:user.organization,
      organizationUrl:user.orgnizationUrl,
      phoneno:user.phoneno
    }
    this.createUser(userObj,(err)=>{
      callback(err)
    })
  })
 }
}
