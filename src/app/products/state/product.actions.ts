import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode      = createAction('[Product], Toggle Product');
export const setCurrentProduct      = createAction('[Product], Set Current Product', props<{product: Product}>());
export const clearCurrentProduct    = createAction('[Product], Clear Current Product');
export const initCurrentProduct     = createAction('[Product], Init Current Product');
export const loadProducts           = createAction('[Product], Load');
export const loadProductsSuccess    = createAction('[Product], Load Success');
export const loadProductsFailure    = createAction('[Product], Load Failure');