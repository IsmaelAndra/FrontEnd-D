import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent {
  private productoService = inject(ProductoService);

  categorias: any = [
    { name: 'Ropa Dama', code: 'RD' },
    { name: 'Ropa Caballero', code: 'RC' },
    { name: 'Herramientas', code: 'He' },
    { name: 'Tecnologia', code: 'Tec' },
    { name: 'Hogar', code: 'Hgr' },
  ];
  products:any[] = [
    { id: 1, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 2, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 3, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 4, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
    { id: 5, nombre: 'Teclado', precio: 394.96, categoria_id:5,stock:12,estado:"COMPLETO"},
  ];
  mostrarEditor: boolean = false;
  productoSeleccionado: any = null;

  constructor() {
    this.productoService.funListar().subscribe((res: any) => {
      this.products = res.data;
    });
  }

  openNew() {
    console.log('Abrir formulario para crear un nuevo producto');
  }

  editProduct(product: any) {
    this.productoSeleccionado = { ...product };
    this.mostrarEditor = true;
  }

  guardarProducto() {
    const index = this.products.findIndex(p => p.id === this.productoSeleccionado.id);
    if (index !== -1) {
      this.products[index] = { ...this.productoSeleccionado };
      console.log('Producto actualizado:', this.productoSeleccionado);
    }
    this.cerrarEditor();
  }

  cerrarEditor() {
    this.mostrarEditor = false;
    this.productoSeleccionado = null;
  }

  deleteProduct(product: any) {
    this.products = this.products.filter(p => p !== product);
    console.log('Producto eliminado:', product);
  }
}
