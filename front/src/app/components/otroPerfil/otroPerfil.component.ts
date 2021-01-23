import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';
import Granim from 'granim';
import AOS from 'aos';
import Elevator from 'elevator.js';
import iconate from 'iconate';

@Component({
    selector: 'app-otroPerfil',
    templateUrl: './otroPerfil.component.html',
    styleUrls: ['./otroPerfil.component.less']
})
export class OtroPerfilComponent implements OnInit {


  esUnTuit: string = "tuit";


  fullName;

  user;

  siguiendo;

  siguiendoObject;

  seguidores;


  tuits;

  headers = new Headers();


  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) {
    
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/');

   }


  ngOnInit() {

      AOS.init();

      this.activatedRoute.params.subscribe( params => {

        this.user = params['id'];

        this.getPersonalDataCostum();
  
        this.getTuitsOtroPerfil();

        this.getQuienSigo();
      
      
      });


  }

  getPersonalDataCostum(){

    let user = this.user;


    const data = { user: user };

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getPersonalDataCostum', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then(response2 => response2.json())
    .then((data3) => {

      console.log(data3[0]);


      this.fullName = data3[0]['fullName'];

      this.user = data3[0]['user'];

      this.siguiendo = data3[0]['siguiendo'];

      this.seguidores = data3[0]['seguidores'];



    })

  }

  getQuienSigo(){


    let headers = new Headers();

    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/');


    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getQuienSigo', { 
      credentials : 'include', 
      headers: headers
    })
    .then(response => response.json())
    .then((data) => {

      this.siguiendoObject = data;

      console.log(this.siguiendoObject);



      
      $('.btnUser').attr("class","btn orange darken-4 btnUser");

      $('.btnUser').html('SEGUIR');



      
      var i;

      for (i = 0; i < this.siguiendoObject.length; i++) {

        $('#' + this.siguiendoObject[i]['sigueAa']).attr("class","btn brown btnUser");

        $('#' + this.siguiendoObject[i]['sigueAa']).html('SIGUIENDO');
        
      }


    })


  }


  seguir(event){


    let user = event.target.getAttribute("id");


    const data = { user: user};

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/seguir', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then((data) => {

      console.log(data.text());

      this.getQuienSigo();

      this.getPersonalDataCostum();


    })


  }



  getTuitsOtroPerfil(){

    let user = this.user;


    const data = { user: user };

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getTuitsOtroPerfil', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then(response3 => response3.json())
    .then(tuits => this.tuits=tuits)

  }



}