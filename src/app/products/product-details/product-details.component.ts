import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';
import { CartStore } from '../cart/cart.store';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [CartStore]
})
export class ProductDetailsComponent implements OnInit {

  cartStore = inject(CartStore);
  product = this.productService.product();

  constructor(private route: ActivatedRoute, private productService: ProductService) { } 

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

  
    // Find the product that correspond with the id provided in route.
    this.productService.selectedProductId.set(productIdFromRoute);
  }
}
