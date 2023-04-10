import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { Store } from '@ngrx/store';
import { State, getCurrentProduct, getError, getProducts, getShowProductCode } from '../state/product.reducer';
import * as ProductAction from '../state/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  // sub: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    //TODO Unsubscribe
    this.selectedProduct$ = this.store.select(getCurrentProduct)
    this.errorMessage$ = this.store.select(getError);
    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductAction.loadProducts());
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductAction.toggleProductCode());
    // this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    this.store.dispatch(ProductAction.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductAction.setCurrentProduct({currentProductId: product.id}));
  }

}
