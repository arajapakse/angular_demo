import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { CartItem } from "./CartItem";
import { Product } from "../product.service";
import { STATE_SIGNAL } from "@ngrx/signals/src/state-signal";

export interface CartState {
    items: CartItem[];
}

const initialCartState: CartState = {
    items: [],
};

export const CartStore = signalStore(
    withState(initialCartState),
    withMethods(({ items, ...store }) => ({
        addToCart(product: Product) {
            const index = items().findIndex(item => item.product.id === product.id);    

            if (index === -1) {
                items().push({ product, quantity: 1 });
            } else {
                items().splice(index, 1, { ...items()[index], quantity: items()[index].quantity + 1 });
            }
        },
        cartCount() {
            return items().reduce((accQty, item) => accQty + item.quantity, 0); 
        }
    })
));

