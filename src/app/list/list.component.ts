import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Turno } from './model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  
  turnos: Turno[];
  constructor(private apiService: ApiService,
              private router: Router) {}

  
  ngOnInit(): void {
      this.apiService.getTurnos()
      .subscribe(turnos => this.turnos = turnos);
  }
  delete(turno: Turno): void {
    this.apiService.delete(turno.id).subscribe(
      response => {
        this.turnos = this.turnos.filter(turno => turno !== turno)
        console.log(response);
      })
    }
}
