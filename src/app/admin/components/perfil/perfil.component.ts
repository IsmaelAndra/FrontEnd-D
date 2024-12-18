import { Component, OnInit } from '@angular/core';
import { PerfilModel } from './entities/perfil.model';
import { PerfilService } from './service/perfil.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {

  perfil: PerfilModel[] = [];
  perfilSeleccionado: PerfilModel = { id: undefined, name: '', email: '', lastname: '', phone: '', password: '' };
  mostrarFormularioCreacion: boolean = false;
  mostrarFormularioEdicion: boolean = false;

  constructor(private perfilService: PerfilService, private authService: AuthService) { }

  ngOnInit(): void {
    this.perfilService.getAll().subscribe(
      (data) => {
        this.perfil = data;
      },
      (error) => {
        console.error('Error al obtener los perfiles:', error);
      }
    );
  }

  abrirFormularioCreacion(): void {
    this.perfilSeleccionado = { id: undefined, name: '', email: '', lastname: '', phone: '', password: '' };
    this.mostrarFormularioCreacion = true;
    this.mostrarFormularioEdicion = false;
  }

  editarPerfil(perfil: PerfilModel): void {
    console.log('Perfil seleccionado para editar:', perfil);
    if (perfil.id) {
      this.perfilSeleccionado = { ...perfil };
      console.log('Perfil seleccionado después de asignación:', this.perfilSeleccionado);
      this.mostrarFormularioEdicion = true;
    } else {
      console.error('El perfil no tiene un ID válido.');
      alert('El perfil no tiene un ID válido.');
    }
  }

  crearPerfil(): void {
    const perfilData = {
      name: this.perfilSeleccionado.name,
      lastname: this.perfilSeleccionado.lastname,
      email: this.perfilSeleccionado.email,
      phone: this.perfilSeleccionado.phone,
      password: this.perfilSeleccionado.password
    };

    console.log('Datos del perfil a crear:', perfilData);

    this.authService.registroConNest(perfilData).subscribe(
      (response) => {
        console.log('Perfil creado con éxito:', response);
        this.perfil.push(response);
        this.mostrarFormularioCreacion = false;
        alert('Perfil creado con éxito!');
      },
      (error) => {
        console.error('Error al crear el perfil:', error);
        alert('Hubo un error al crear el perfil. Intente nuevamente.');
      }
    );
  }
  actualizarPerfil(): void {
    if (!this.perfilSeleccionado.id) {
      console.error('El perfil no tiene un ID válido para actualizar.');
      alert('El perfil no tiene un ID válido para actualizar.');
      return;
    }
  
    const perfilData = {
      name: this.perfilSeleccionado.name,
      lastname: this.perfilSeleccionado.lastname,
      email: this.perfilSeleccionado.email,
      phone: this.perfilSeleccionado.phone,
      password: this.perfilSeleccionado.password,
    };
  
    console.log('Datos enviados al servicio de actualización:', perfilData);
  
    this.perfilService.update(this.perfilSeleccionado.id, perfilData).subscribe(
      (response) => {
        console.log('Perfil actualizado con éxito:', response);
        const index = this.perfil.findIndex((p) => p.id === this.perfilSeleccionado.id);
        if (index !== -1) {
          this.perfil[index] = response;
        }
        this.mostrarFormularioEdicion = false;
        alert('Perfil actualizado con éxito!');
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        alert('Hubo un error al actualizar el perfil. Intente nuevamente.');
      }
    );
  }
  
  cancelarEdicion(): void {
    this.mostrarFormularioCreacion = false;
    this.mostrarFormularioEdicion = false;
    this.perfilSeleccionado = { id: undefined, name: '', email: '', lastname: '', phone: '', password: '' };
  }

  deletePerfil(id_perfil: PerfilModel['id']): void {
    if (confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
      this.perfilService.destroy(id_perfil).subscribe(
        response => {
          this.perfil = this.perfil.filter(perfil => perfil.id !== id_perfil);
          console.log('Perfil eliminado con éxito:', response);
        },
        error => {
          console.error('Error al eliminar el perfil:', error);
        }
      );
    }
  }
}
