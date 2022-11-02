import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

declare var bootstrap:any;

@Component({
  selector: 'app-navsm',
  templateUrl: './navsm.component.html',
  styleUrls: ['./navsm.component.scss']
})
export class NavsmComponent implements OnInit {

  constructor(private _loginService:LoginService) { }

  ngOnInit(): void {
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

}
