import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-enduser',
  templateUrl: './enduser.component.html',
  styleUrls: ['./enduser.component.css']
})
export class EnduserComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
