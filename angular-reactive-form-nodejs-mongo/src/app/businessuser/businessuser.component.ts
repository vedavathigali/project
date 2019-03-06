import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-businessuser',
  templateUrl: './businessuser.component.html',
  styleUrls: ['./businessuser.component.css']
})
export class BusinessuserComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
