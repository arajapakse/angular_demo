import { Component, input, output } from '@angular/core';
import { Product } from '../product.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-alerts',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-alerts.component.html',
  styleUrl: './product-alerts.component.css'
})
export class ProductAlertsComponent {

  // Input Old syntax
  // @Input() product: Product | undefined;
  
  // optional (default value is undefined)
 // product = input<Product>(); // InputSignal<Product|undefined>

  // required - value is assigned by the parent component
  product = input.required<Product>(); // InputSignal<Product>


  // Output Old Syntax 
  // @Output() notify = new EventEmitter();

  notify = output<Product>(); // OutputSignal<Product>

}
