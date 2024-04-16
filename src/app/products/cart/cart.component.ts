import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CartStore]
})
export class CartComponent {
  cartStore = inject(CartStore);
  cartItems = this.cartService.cartItems; 


  constructor(private cartService: CartService) { }
}
