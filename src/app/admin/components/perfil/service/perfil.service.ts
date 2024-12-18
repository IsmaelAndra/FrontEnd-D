import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CreatePerfilDto, PerfilModel, UpdatePerfilDto } from '../entities/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl=environment.urlServidor

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<PerfilModel[]> {
    const url = `${this.baseUrl}/users`;
    return this.httpClient.get<PerfilModel[]>(url);
  }

  getOne(id: PerfilModel['id']): Observable<PerfilModel>{
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.get<PerfilModel>(url);
  }

  store(Perfil: CreatePerfilDto):Observable<PerfilModel> {
    const url = `${this.baseUrl}/users`;
    return this.httpClient.post<PerfilModel>(url, Perfil)
  }

  update(id: number, perfil: UpdatePerfilDto): Observable<PerfilModel> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.put<PerfilModel>(url, perfil)
  }

  destroy(id: PerfilModel['id']):Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
        return response.rta;
      })
      );
  }
}
