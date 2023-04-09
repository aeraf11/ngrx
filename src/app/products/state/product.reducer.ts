import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
    {showProductCode: true},
    on(createAction('[Product], Toggle Product'), state => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    })
);