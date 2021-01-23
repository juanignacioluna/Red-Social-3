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
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit {

  esUnTuit: string = "tuit";

  tuits;

  headers = new Headers();

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) {
    
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/');

   }


  ngOnInit() {

    AOS.init();

    $(".modal-backdrop").hide();

    this.getTuitsTimeline();

  }

  getTuitsTimeline(){

    fetch('http://localhost/pruebasLARAVEL/socialNetworkLaravelAngular01/back/public/getTuitsTimeline', { 
      credentials : 'include', 
      headers: this.headers
    })
    .then(response3 => response3.json())
    .then(tuits => this.tuits=tuits)

  }



}