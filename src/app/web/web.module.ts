import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class WebModule { }
