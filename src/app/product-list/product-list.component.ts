import {
  Component,
  OnInit,
  // ChangeDetectorRef,
} from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  pageSize = 5;
  currentPage = 0;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.productService
        .getProducts()
        .subscribe((data) => {
          console.log('service has returned data', data);
          this.products = data;
          // this.categories = [''].concat([...new Set(data.map((p) => p.category))]);
          this.categories = [...new Set(data.map((p) => p.category))];

          // this.selectedCategory = this.categories[0];
          console.log({ selectedCategory: this.selectedCategory });

          this.applyFilter();
          // this.cdr.markForCheck();
        })
        .add(() => {
          this.loading = false;
        });
    }, 2000);
  }

  applyFilter(): void {
    this.filteredProducts = this.selectedCategory
      ? this.products.filter((p) => p.category === this.selectedCategory)
      : [...this.products];
  }

  onCategoryChange(): void {
    this.currentPage = 0;
    this.applyFilter();
  }

  openProductDetail(product: Product): void {
    this.dialog.open(ProductComponent, {
      width: '500px',
      data: product,
    });
  }

  get paginatedProducts(): Product[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.filteredProducts.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
