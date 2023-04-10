import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {

    constructor(private action$: Actions, private productService: ProductService) {}

    loadProducts$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(()=> this.productService.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({products})),
                catchError(error => of(ProductActions.loadProductsFailure({error})))
            ))
        )
    })
}