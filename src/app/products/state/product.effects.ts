import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import { ProductApiActions, ProductPageActions } from "./actions";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { concat, of } from "rxjs";

@Injectable()
export class ProductEffects {

    constructor(private action$: Actions, private productService: ProductService) {}

    loadProducts$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(()=> this.productService.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({products})),
                catchError(error => of(ProductApiActions.loadProductsFailure({error})))
            ))
        )
    })
    updateProducts$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ProductPageActions.updateProduct),
            concatMap((action)=> this.productService.updateProduct(action.product).pipe(
                map(product => ProductApiActions.updateProductSuccess({product})),
                catchError(error => of(ProductApiActions.updateProductFailure({error})))
            ))
        )
    })
    createProducts$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ProductPageActions.createProduct),
            concatMap((action)=> this.productService.createProduct(action.product).pipe(
                map(product => ProductApiActions.createProductSuccess({product})),
                catchError(error => of(ProductApiActions.createProductFailure({error})))
            ))
        )
    })
    deleteProducts$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ProductPageActions.deleteProduct),
            concatMap((action)=> this.productService.deleteProduct(action.productId).pipe(
                map(() => ProductApiActions.deleteProductSuccess({productId: action.productId})),
                catchError(error => of(ProductApiActions.deleteProductFailure({error})))
            ))
        )
    })
}