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
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {


  esUnTuit: string = "tuit";


  fullName;

  user;

  siguiendo;

  seguidores;


  tuits;

  headers = new Headers();


  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) {
    
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/');

   }


  ngOnInit() {

      AOS.init();

  
      fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getPersonalData', { 
        credentials : 'include', 
        headers: this.headers
      })
      .then(response2 => response2.json())
      .then((data3) => {

        console.log(data3[0]);


        this.fullName = data3[0]['fullName'];

        this.user = data3[0]['user'];

        this.siguiendo = data3[0]['siguiendo'];

        this.seguidores = data3[0]['seguidores'];



      })


      this.getTuitsMiPerfil();


  }



  getTuitsMiPerfil(){

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getTuitsMiPerfil', { 
      credentials : 'include', 
      headers: this.headers
    })
    .then(response3 => response3.json())
    .then(tuits => this.tuits=tuits)

  }



}