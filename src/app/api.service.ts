import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials, Turno } from './list/model';
import { Router } from '@angular/router';
import { isConstructorDeclaration } from 'typescript';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private urlEndpoint: string = 'http://localhost:8080/api/v1/model';
    private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

    constructor(private http: HttpClient,
				private router: Router) {}

    private authToken: string; // Variable para almacenar el token

	register(creds: Credentials): Observable<Credentials> {
		return this.http.post<Credentials>('http://localhost:8080/api/v1/user/register', creds, {headers: this.httpHeaders})
	}

	login(creds: Credentials) {
		return this.http.post('http://localhost:8080/api/v1/user/login', creds, {
			observe: 'response'
		}).pipe(map((response: HttpResponse<any>) => {
			const body = response.body;
			const token = body.token;
			console.log(token);

			this.authToken = token; // Almacena el token en la variable de servicio

			localStorage.setItem('token', token);

			return body;
		}));
	}
	getToken() {
		return localStorage.getItem('token');
	}

        // METODOS CRUD //
    getTurnos(): Observable<Turno[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authToken}` // Usa el valor de authToken en la cabecera
        });
        
        return this.http.get<Turno[]>(this.urlEndpoint, { headers }).pipe(
           map(response => response as Turno[])
        );
    }

	guardarTurno(turno: Turno) {
		return this.http.post(this.urlEndpoint, turno, {headers: this.httpHeaders}).pipe(
			catchError(e => {
				this.router.navigate(['/list']);
				console.log(e.error.mensaje);
				return throwError(e);
			})
		);
    }

	getTurno(id: number): Observable<Turno> {
		return this.http.get<Turno>(`${this.urlEndpoint}/${id}`).pipe(
			catchError(e => {
				this.router.navigate(['/list']);
				console.log(e.error.mensaje);
				return throwError(e);
			})
		);
	}
	update(turno: Turno): Observable<Turno> {
		return this.http.put<Turno>(`${this.urlEndpoint}/${turno.id}`, turno, {headers: this.httpHeaders}).pipe(
			catchError(e => {
				this.router.navigate(['/list']);
				console.log(e.error.mensaje);
				return throwError(e);
			})
		);
	}
	delete(id: number): Observable<Turno> {
		return this.http.delete<Turno>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders});
	}
}