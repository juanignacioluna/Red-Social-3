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
    selector: 'app-ascensor',
    templateUrl: './ascensor.component.html',
    styleUrls: ['./ascensor.component.less']
})
export class AscensorComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    var elevator = new Elevator({
        element: document.querySelector('.elevator-button'),
        endAudio: '/assets/ding.mp3'
      });

  }


  


}