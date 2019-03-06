import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
//import { HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  private userForm:FormGroup
  private user:any
  private errorMessage:string
  private isSaved:boolean
  
  private users:any[]

  constructor(private builder:FormBuilder,private service:UserService, private router:Router) {
    this.buildForm()
  }
  ngOnInit(){
    // this.users = this.service.fetchUsers()
    this.service.fetchUsers((data)=>{
      this.users = data
    })
  }
 
  buildForm() {
    this.userForm = this.builder.group({
      name: ['',Validators.required],
      email: ['',[
        Validators.required,
        Validators.email
      ]
    ],
    password:['',Validators.required],
    organization:['',Validators.required],
    orgurl:['',Validators.required],
    phone:['',Validators.required]
  
  

    })
    // alternate approach
   /* this.userForm = new FormGroup({
      name: new FormControl('',
        Validators.required),
      email: new FormControl('',
      [
        Validators.required,
        Validators.email
      ])
    }) */
  }
  
  save(){
    //console.log(this.userForm)
    if(this.userForm.status !='INVALID'){
      //alert(JSON.stringify(this.userForm.value))
      this.user={
        name: this.userForm.controls['name'].value,
        email: this.userForm.controls['email'].value,
        password:this.userForm.controls['password'].value,
        organization:this.userForm.controls['organization'].value,
        organizationUrl:this.userForm.controls['orgurl'].value,
        phoneno:this.userForm.controls['phone'].value
      },
      // Add a new User 
      this.service.buildAndCreateUser({ 
        name:this.user.name,
        email:this.user.email,
        password:this.user.password,
        organization:this.user.organization,
        organizationUrl:this.user.orgnizationUrl,
        phoneno:this.user.phoneno
      },(err)=>{
        if(err! =null){
          console.log('Unable to Process request')
          // re load users
          this.service.fetchUsers((users)=>{
            this.users = users
          })
        }else{
           // just to display the success message
           this.isSaved= true
           // reset the form
           if(this.isSaved){
             this.router.navigate(['/profile'])
           }
           this.userForm.reset()
          // re load users
          this.service.fetchUsers((users)=>{
            this.users = users
          })
        }
      })
      // Add new User
      //this.service.addUser(this.user.name,this.user.email,this.users)

    }else{
      this.errorMessage = 'Please verify your errors'
    }
  }
}
