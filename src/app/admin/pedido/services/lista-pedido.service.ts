import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListaPedidoService {

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>('api/pedidos') // Cambia la URL según tu API
      .pipe(
        catchError(error => {
          console.error('Error al obtener pedidos', error);
          throw error;
        })
      );
  }

  updatePedido(pedido: any): Observable<any> {
    return this.http.put<any>(`api/pedidos/${pedido.id}`, pedido)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar pedido', error);
          throw error;
        })
      );
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete<any>(`api/pedidos/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar pedido', error);
          throw error;
        })
      );
  }
}
