import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
})
export class ListaPedidoComponent {
  categorias = [
    { name: 'Electrónica', code: 'ELE' },
    { name: 'Ropa', code: 'ROP' },
    { name: 'Muebles', code: 'MUE' }
  ];

  pedidos = [
    { id: '#12345', fecha: new Date(), cliente: 'Juan Pérez', estado: 'Pendiente', total: 150.00 },
    { id: '#12346', fecha: new Date(), cliente: 'María Gómez', estado: 'Enviado', total: 120.00 },
    { id: '#12347', fecha: new Date(), cliente: 'Carlos López', estado: 'Entregado', total: 180.00 }
  ];

  estados = ['Pendiente', 'Enviado', 'Entregado'];

  pedidoSeleccionado: any;
  mostrarEditor: boolean = false;

  verDetalles(pedido: any) {
    this.pedidoSeleccionado = { ...pedido };
    this.mostrarEditor = true;
  }

  cambiarEstado(pedido: any) {
    const currentIndex = this.estados.indexOf(pedido.estado);
    const nextIndex = (currentIndex + 1) % this.estados.length;
    pedido.estado = this.estados[nextIndex];
  }

  eliminarPedido(pedido: any) {
    const index = this.pedidos.indexOf(pedido);
    if (index > -1) {
      this.pedidos.splice(index, 1);
    }
  }

  guardarPedido() {
    const index = this.pedidos.findIndex(p => p.id === this.pedidoSeleccionado.id);
    if (index > -1) {
      this.pedidos[index] = { ...this.pedidoSeleccionado };
    }
    this.mostrarEditor = false;
  }

  cerrarEditor() {
    this.mostrarEditor = false;
  }
}
