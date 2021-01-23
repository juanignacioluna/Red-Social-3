import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';
import Granim from 'granim';
import AOS from 'aos';
import Elevator from 'elevator.js';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    AOS.init();

  }

  login(event){


    let user = $("#user").val();

    let password = $("#password").val();


    const data = { user: user, password: password };

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/login', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then((data) => {

      if(data=="Datos incorrectos"){
        alert(data); 
      }else{
        this.router.navigate(['/timeline']);
      }

    })

  }


  registro(event){

    let fullName = $("#fullName").val();

    let user = $("#user1").val();

    let password = $("#password1").val();


    const data = { user: user, password: password, fullName: fullName };

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/registro', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then((data) => {

      if(data=="Usuario registrado correctamente"){

        this.router.navigate(['/timeline']);

      }else{
        alert(data);
      }

    })


  }


  


}