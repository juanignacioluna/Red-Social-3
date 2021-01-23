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
    selector: 'app-buscar',
    templateUrl: './buscar.component.html',
    styleUrls: ['./buscar.component.less']
})
export class BuscarComponent implements OnInit {


  busqueda;

  users;

  siguiendo;


  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    AOS.init();

    this.activatedRoute.params.subscribe( params => {

      this.busqueda = params['id'];



      let busqueda = this.busqueda;


      const data = { busqueda: busqueda};
  
      fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/buscar', {
          method: 'POST', 
          credentials : 'include', 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'
  
            
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then((data) => {
  
  
        console.log(data);
  
        this.users = data;

        this.getQuienSigo();
  
  
      })

    });


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


    })


  }

  otroPerfil(event, user){

    this.router.navigate(['/otroPerfil/'+user.user]);

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

      this.siguiendo = data;

      console.log(this.siguiendo);



      
      $('.btnUser').attr("class","btn orange darken-4 btnUser");

      $('.btnUser').html('SEGUIR');



      
      var i;

      for (i = 0; i < this.siguiendo.length; i++) {

        $('#' + this.siguiendo[i]['sigueAa']).attr("class","btn brown btnUser");

        $('#' + this.siguiendo[i]['sigueAa']).html('SIGUIENDO');
        
      }


    })


  }



}