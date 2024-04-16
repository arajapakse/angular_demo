import { Component, Inject, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../products/cart.service';
import { CartStore } from '../products/cart/cart.store';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
  providers: [CartStore]
})
export class TopBarComponent {

  cartCount = this.cartService.cartCount;
  cartStore = inject(CartStore);

  constructor( private cartService: CartService) { }
}
