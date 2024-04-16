import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpErrorService } from '../utilites/http-error.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _baseUrl = 'https://fakestoreapi.com'

  constructor(private http:HttpClient, private errorService: HttpErrorService) { }
  
  // rxjs -- behavior subject 
  // private selectedProductIdSubject = new BehaviorSubject<number | undefined>(undefined);
  // private selectedProductIdAction$ = this.selectedProductIdSubject.asObservable();

  selectedProductId = signal<number | undefined>(undefined);


    // Find the product in the existing array of products
  product = computed(() => {
      // Dependent signals
      const p = this.products();
      console.log('p', p);
      const id = this.selectedProductId();
      console.log('id', id);
      if (p && id) {
        console.log('p.find(product => product.id === id)', p.find(product => product.id === id));
        return p.find(product => product.id === id);
      }
      return undefined;
    })


  // rxjs 
  private productsResult$ = this.http.get<Product[]>(`${this._baseUrl}/products`)
    .pipe(
      map(p => ({ data: p } as Result<Product[]>)),
      catchError(err => of({
        data: [],
        error: this.errorService.formatError(err)
      } as Result<Product[]>)));

  public getProducts() : Observable<Result<Product[]>> {
    return this.productsResult$;
  }

  private productsResultSignal = toSignal(this.productsResult$, { initialValue: ({ data: [] } as Result<Product[]>)});

  products = computed(() => this.productsResultSignal().data);
  productsError = computed(() => this.productsResultSignal().error);
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export interface Rating {
  rate: number
  count: number
}


export interface Result<T> {
  data: T | undefined;
  error?: string;
}