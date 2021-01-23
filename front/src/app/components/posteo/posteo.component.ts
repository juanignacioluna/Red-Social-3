import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
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
    selector: 'app-posteo',
    templateUrl: './posteo.component.html',
    styleUrls: ['./posteo.component.less']
})
export class PosteoComponent implements OnInit {

  classDIV;

  fullName;

  rtSiOnoBOOL;

  hidden = false;

  @Input('idTUIT') idTUIT: number;
  @Input('userTuit2') userTuit2: string;
  @Input('mgTuit') mgTuit: number;
  @Input('rtTuit') rtTuit: number;
  @Input('tuitTuit') tuitTuit: string;
  @Input('tuitOrRetuit') tuitOrRetuit: string;
  @Input('rtSiOno') rtSiOno: string;
  @Input('rtPOR') rtPOR: string;
  
  headers = new Headers();

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) {

    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/');

   }


  ngOnInit() {

    this.verificarSiLoFavie();
    this.verificarSiLoRT();


    if(this.rtSiOno=="si"){
      this.rtSiOnoBOOL = true;
    }else if(this.rtSiOno=="no"){
      this.rtSiOnoBOOL = false;
    }
    


    if(this.tuitOrRetuit=="tuit"){

      this.classDIV = "card text-white orange darken-4 mb-3";

    }else{

      this.classDIV = "card text-white green darken-4 mb-3";

      var node = document.createElement("DIV");                 
      node.setAttribute("class", "card-header header");
      var textnode = document.createTextNode("RT por @leomessi");         
      node.appendChild(textnode);                              
      document.getElementById("post01").appendChild(node);     

      document.getElementById("post01").insertBefore(node, document.getElementById("post01").firstChild);

    }




    let user = this.userTuit2;

    const data = { user: user};

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

    })



  }

  verificarSiLoFavie(){

    let idTUIT = this.idTUIT;

    const data = { idTUIT: idTUIT};

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/verificarSiLoFavie', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then(response2 => response2.text())
    .then((data3) => {

      console.log(data3);

      if(data3=="si"){

        $("#"+this.idTUIT).attr("class", "btn pink lighten-3");

        $("#" + this.idTUIT + " > i").attr("class", "fas fa-heartbeat");

      }else if(data3=="no"){

      }

    })

  }


  verificarSiLoRT(){

    let idTUIT = this.idTUIT;

    const data = { idTUIT: idTUIT};

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/verificarSiLoRT', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then(response2 => response2.text())
    .then((data3) => {

      console.log(data3);

      if(data3=="si"){

        $('button[name="'+this.idTUIT+'"]').attr("class", "btn cyan");

        $('button[name="'+this.idTUIT+'"] > i').attr("class", "fas fa-bullhorn");

      }else if(data3=="no"){

      }

    })

  }



  getDataPosteo(){

    let idTUIT = this.idTUIT;

    const data = { idTUIT: idTUIT};

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getDataPosteo', {
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

      this.mgTuit = data3[0]['mg'];
      this.rtTuit = data3[0]['rt'];

      
    })

  }

  fetchMG(){

    let idTUIT = this.idTUIT;

    const data = { idTUIT: idTUIT};

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/mg', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then(response2 => response2.text())
    .then((data3) => {

      console.log(data3);

      this.getDataPosteo();

    })

  }


  clickMG(event){


    console.log(event.target.tagName);


    if(event.target.tagName=="BUTTON"){

      console.log("butt");

      var iconElement = event.target.querySelector('i');

      var boton = event.target;

    }else if(event.target.tagName=="I"){

      console.log("iiii");

      var iconElement = event.target;

      var boton = event.target.parentElement;

    }

    console.log(iconElement);

    console.log(iconElement.getAttribute("class"));


    if(iconElement.getAttribute("class")=="fas fa-heart"){

        var options = {
          from: 'fa-heart',
          to: 'fa-heartbeat',
          animation: 'zoomIn'
        };

        boton.setAttribute("class", "btn pink lighten-3");

    }else if(iconElement.getAttribute("class")=="fas fa-heartbeat"){

        var options = {
          from: 'fa-heartbeat',
          to: 'fa-heart',
          animation: 'tada'
        };

        boton.setAttribute("class", "btn red darken-4");

    }


    iconate(iconElement, options);

    this.fetchMG();

  }

  fetchRT(){

    let idTUIT = this.idTUIT;

    const data = { idTUIT: idTUIT};

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/rt', {
        method: 'POST', 
        credentials : 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/'

          
        },
        body: JSON.stringify(data),
    })
    .then(response2 => response2.text())
    .then((data3) => {

      fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getPersonalData', { 
        credentials : 'include', 
        headers: this.headers
      })
      .then(response3 => response3.json())
      .then((data4) => {


        if(data3=="Desretuiteado" && this.rtPOR==data4[0]['user']){

          this.hidden = true;

        }
  
        this.getDataPosteo();


      })



    })

  }

  clickRT(event){


    console.log(event.target.tagName);


    if(event.target.tagName=="BUTTON"){

      console.log("butt");

      var iconElement = event.target.querySelector('i');

      var boton = event.target;

    }else if(event.target.tagName=="I"){

      console.log("iiii");

      var iconElement = event.target;

      var boton = event.target.parentElement;

    }

    console.log(iconElement);

    console.log(iconElement.getAttribute("class"));
    

    if(iconElement.getAttribute("class")=="fas fa-retweet"){

        var options = {
          from: 'fa-retweet',
          to: 'fa-bullhorn',
          animation: 'zoomIn'
        };

        boton.setAttribute("class", "btn cyan");

    }else if(iconElement.getAttribute("class")=="fas fa-bullhorn"){

        var options = {
          from: 'fa-bullhorn',
          to: 'fa-retweet',
          animation: 'tada'
        };

        boton.setAttribute("class", "btn green lighten-1");

    }

    // console.log(boton.clientHeight);


    iconate(iconElement, options);

    this.fetchRT();

  }


  otroPerfil(event, userTuit2){

    this.router.navigate(['/otroPerfil/'+userTuit2]);

  }





}