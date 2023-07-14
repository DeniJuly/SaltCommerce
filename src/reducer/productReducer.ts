import {ProductType} from '../types';

// Define the product state interface
interface ProductState {
  products: ProductType[];
  loading: boolean;
  error: boolean;
}

// Define initial state
export const initialState: ProductState = {
  products: [],
  loading: false,
  error: false,
};

// Define action types
export enum ProductActionTypes {
  GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE',
}

// Define action interfaces
interface FetchProductsRequestAction {
  type: ProductActionTypes.GET_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
  type: ProductActionTypes.GET_PRODUCTS_SUCCESS;
  payload: ProductType[];
}

interface FetchProductsFailureAction {
  type: ProductActionTypes.GET_PRODUCTS_FAILURE;
  payload: boolean;
}

// Define the action union type
type ProductAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction;

// Define the reducer function
const productReducer = (
  state: ProductState = initialState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ProductActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case ProductActionTypes.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
