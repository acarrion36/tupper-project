import { Component, OnInit } from '@angular/core';

declare var bootstrap:any;

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  public count:number=0

  constructor() { }

  ngOnInit(): void {
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  isChecked(radio:string):void {
    let checkbox=document.getElementById(radio) as HTMLInputElement | null;

    if (checkbox!=null) {
      if (checkbox.checked) {
        this.count++
      } else {
        this.count--
      }
    }
  }

}
