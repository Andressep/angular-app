import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Credentials, Roles } from '../list/model';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  roles = [
    { value: Roles.Administrador, label: 'Administrador' },
    { value: Roles.UsuarioRestringido, label: 'Usuario' }
  ];
  creds: Credentials = {
    nombreUsuario: '',
    clave: '',
    rol: Roles.Administrador
  } 

  constructor( 
    private apiService: ApiService, 
    private router: Router
    ) {}

  public usuario: Credentials = new Credentials();

  public register(form:NgForm)  {
    console.log('form value: ', form.value);

    return this.apiService.register(this.creds)
    .subscribe(response => {
      this.router.navigate(['/login']);
    })
  }
}
