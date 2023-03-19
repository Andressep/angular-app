import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './api.service';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './helpers/auth.interceptor';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'list', component: ListComponent},
  {path: 'list/form', component: FormComponent},
  {path: 'list/form/:id', component: FormComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ 
    ApiService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
