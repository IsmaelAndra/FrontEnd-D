import { TestBed } from '@angular/core/testing';

import { NuevoPedidoService } from './nuevo-pedido.service';

describe('NuevoPedidoService', () => {
  let service: NuevoPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
