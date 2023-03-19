import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Turno } from '../list/model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void{
    this.cargarTurno()
  }

  public turno: Turno = new Turno();

  guardarTurno() {
    this.apiService.guardarTurno(this.turno)
    .subscribe( response => {
      this.router.navigate(['/list']);
    })
  }

  cargarTurno(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.apiService.getTurno(id).subscribe(turno => {this.turno = turno;
          console.log(turno);
        });
      }
    });
  }

  update(): void {
    this.apiService.update(this.turno).subscribe( (json) => this.router.navigate(['/list'])
    )
  }
}
