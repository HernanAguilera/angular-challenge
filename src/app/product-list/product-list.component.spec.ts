import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService, Product } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    mockProductService.getProducts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener productos al inicializar', () => {
    fixture.detectChanges();
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });

  it('debería filtrar productos por categoría', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Producto 1',
        category: 'Categoría 1',
        price: 10,
        image: 'image1',
        description: 'Descripción 1',
      },
      {
        id: 2,
        title: 'Producto 2',
        category: 'Categoría 1',
        price: 20,
        image: 'image2',
        description: 'Descripción 2',
      },
      {
        id: 3,
        title: 'Producto 3',
        category: 'Categoría 2',
        price: 30,
        image: 'image3',
        description: 'Descripción 3',
      },
    ];

    mockProductService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    component.selectedCategory = 'Categoría 1';
    component.applyFilter();

    expect(component.filteredProducts.length).toBe(2);
  });

  it('debería abrir el modal de detalles del producto', () => {
    const product = {
      id: 1,
      title: 'Producto 1',
      category: 'Categoría 1',
      price: 10,
      image: 'image1',
      description: 'Descripción 1',
    };
    component.openProductDetail(product);
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('debería navegar al login al hacer logout', () => {
    component.onLogout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería paginar los productos correctamente', () => {
    const mockProducts: Product[] = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      title: `Producto ${index + 1}`,
      category: 'Categoría 1',
      price: 10,
      image: 'image1',
      description: 'Descripción 1',
    }));

    mockProductService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(component.paginatedProducts.length).toBe(5);

    component.nextPage();
    expect(component.currentPage).toBe(1);
    expect(component.paginatedProducts.length).toBe(5);

    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.paginatedProducts.length).toBe(2);

    component.prevPage();
    expect(component.currentPage).toBe(1);
  });
});
