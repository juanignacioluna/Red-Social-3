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
    selector: 'app-fondo',
    templateUrl: './fondo.component.html',
    styleUrls: ['./fondo.component.less']
})
export class FondoComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    var granimInstance = new Granim({
      element: '#granim-canvas',
      direction: 'radial',
      isPausedWhenNotInView: true,
      states : {
          "default-state": {
              gradients: [
                  [
                      { color: '#ba00b4', pos: .2 },
                      { color: '#0f00b3', pos: .8 },
                      { color: '#00509c', pos: 1 }
                  ], [
                      { color: '#008f81', pos: 0 },
                      { color: '#00471d', pos: .2 },
                      { color: '#470014', pos: .75 }
                  ],
              ]
          }
      }
  });


  }


  


}