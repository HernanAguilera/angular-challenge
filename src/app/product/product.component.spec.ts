import { TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductComponent } from './product.component';
import { Product } from '../services/product.service';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ProductComponent>>;
  const productData: Product = {
    id: 1,
    title: 'Producto de Prueba',
    price: 100,
    description: 'Descripción de prueba',
    category: 'Categoría de prueba',
    image: 'https://via.placeholder.com/150',
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: productData },
      ],
    }).compileComponents();
  });

  it('debería crearse correctamente', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería mostrar correctamente el título del producto', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain(productData.title);
  });

  it('debería mostrar correctamente la imagen del producto', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain(productData.image);
    expect(imgElement.alt).toBe(productData.title);
  });

  it('debería mostrar correctamente el precio formateado', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const priceElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(priceElement.textContent).toContain('Precio:');
  });

  it('debería mostrar correctamente la descripción del producto', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const descriptionElement = fixture.debugElement.queryAll(By.css('p'))[1]
      .nativeElement;
    expect(descriptionElement.textContent).toContain(productData.description);
  });

  it('debería mostrar correctamente la categoría del producto', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const categoryElement = fixture.debugElement.queryAll(By.css('p'))[2]
      .nativeElement;
    expect(categoryElement.textContent).toContain(productData.category);
  });

  it('debería cerrar el diálogo al hacer clic en el botón "Cerrar"', () => {
    const fixture = TestBed.createComponent(ProductComponent);
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    buttonElement.click();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
