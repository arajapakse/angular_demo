import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../product.service';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgForOf, NgIf} from '@angular/common';
import { EMPTY, async, catchError } from 'rxjs';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';
import { RouterModule } from '@angular/router';
import { ProductStore } from '../product.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgForOf, NgFor, NgClass, AsyncPipe, CurrencyPipe, ProductAlertsComponent, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productStore = inject(ProductStore);
  private productService = inject(ProductService);
  
  products2 = this.productStore.products;
  products = this.productService.products
  errorMessage = this.productService.productsError;

  share(product: Product) {
      alert(`The ${product.title} has been shared!`);
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

}