import { TestBed } from '@angular/core/testing';

import { ListaPedidoService } from './lista-pedido.service';

describe('ListaPedidoService', () => {
  let service: ListaPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
