import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CartComponent } from './products/cart/cart.component';

export const routes: Routes = [
    { path: '',  loadComponent: () => import('./products/product-list/product-list.component').then(c => c.ProductListComponent) },
    { path: 'products/:productId', loadComponent: () => import('./products/product-details/product-details.component').then(c => c.ProductDetailsComponent) },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: ''}
];

