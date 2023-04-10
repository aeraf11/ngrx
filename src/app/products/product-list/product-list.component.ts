import { Component, OnInit, OnDestroy } from '@angular/core';

// import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { ProductState, State, getCurrentProduct, getShowProductCode } from '../state/product.reducer';
import * as ProductAction from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  // sub: Subscription;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    //TODO Unsubscribe
    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

  //TODO unsubscribe:
  this.store.select(getShowProductCode).subscribe( 
      showProductCode => this.displayCode = showProductCode
    )
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductAction.toggleProductCode());
    // this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    this.store.dispatch(ProductAction.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductAction.setCurrentProduct({product}));
  }

}
