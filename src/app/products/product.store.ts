import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { Product, ProductService } from "./product.service";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, distinct, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";


type ProductState = {
    products: Product[];
    isLoading: boolean;
    query: string
}

const initialProductState: ProductState = {
    products: [],
    isLoading: false,
    query: ''
};

export const ProductStore = signalStore(
    {providedIn: 'root'},
    withState(initialProductState),
    withMethods((store, productService = inject(ProductService)) => ({
        loadProducts: rxMethod<string>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),  
                switchMap((query) => productService.getProducts().pipe(
                    tapResponse({
                        next: (result) => patchState(store, { products: result.data, isLoading: false, query }),
                        error: (error) => patchState(store, { isLoading: false, query }),
                        finalize: () => patchState(store, { isLoading: false, query })
                    })
                ))
            )
        ),
    })),
    withHooks( {
        onInit({ loadProducts, query}) {
            loadProducts(query);
        }
    })
);
