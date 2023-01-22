import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pintaalergenos',
  templateUrl: './pintaalergenos.component.html',
  styleUrls: ['./pintaalergenos.component.scss']
})
export class PintaalergenosComponent implements OnInit {
  @Input() alergenosPlato:string[];
  constructor() {
    this.alergenosPlato = []
  }

  ngOnInit(): void {
  }

}
