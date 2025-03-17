import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener productos mediante GET', () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Producto 1',
        price: 10,
        description: 'Descripción 1',
        category: 'Categoría 1',
        image: 'imagen1.jpg',
      },
      {
        id: 2,
        title: 'Producto 2',
        price: 20,
        description: 'Descripción 2',
        category: 'Categoría 2',
        image: 'imagen2.jpg',
      },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/products`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('debería obtener un producto por su ID mediante GET', () => {
    const mockProduct = {
      id: 1,
      title: 'Producto 1',
      price: 10,
      description: 'Descripción 1',
      category: 'Categoría 1',
      image: 'imagen1.jpg',
    };
    const productId = 1;

    service.getProductById(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/products/${productId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
