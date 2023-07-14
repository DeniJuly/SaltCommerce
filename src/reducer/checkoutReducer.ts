import {CheckoutType} from '../types';

// Define the checkout state interface
interface CheckoutState {
  products: CheckoutType[];
}

// Define initial state
export const initialState: CheckoutState = {
  products: [],
};

// Define action types
export enum CheckoutActionTypes {
  ADD_PRODUCT = 'ADD_PRODUCT',
  MIN_PRODUCT = 'MIN_PRODUCT',
  RESET_PRODUCT = 'RESET_PRODUCT',
}

// Define action interfaces
interface AddCheckoutAction {
  type: CheckoutActionTypes.ADD_PRODUCT;
  payload: number;
}
interface MinCheckoutAction {
  type: CheckoutActionTypes.MIN_PRODUCT;
  payload: number;
}
interface ResetCheckoutAction {
  type: CheckoutActionTypes.RESET_PRODUCT;
}

export type CheckoutAction =
  | AddCheckoutAction
  | MinCheckoutAction
  | ResetCheckoutAction;

const checkoutReducer = (
  state: CheckoutState = initialState,
  action: CheckoutAction,
): CheckoutState => {
  let allData = state?.products;
  let check =
    action.type === CheckoutActionTypes.RESET_PRODUCT
      ? -1
      : state?.products?.findIndex(item => item.id === action?.payload);
  switch (action.type) {
    case CheckoutActionTypes.ADD_PRODUCT:
      if (check === -1) {
        allData.push({
          id: action?.payload,
          qty: 1,
        });
      } else {
        allData[check].qty += 1;
      }
      return {
        ...state,
        products: allData,
      };
    case CheckoutActionTypes.MIN_PRODUCT:
      if (check === -1) {
        allData.push({
          id: action?.payload,
          qty: 1,
        });
      } else {
        allData[check].qty -= 1;
      }
      return {
        ...state,
        products: allData,
      };
    case CheckoutActionTypes.RESET_PRODUCT:
      return {
        products: [],
      };
    default:
      return state;
  }
};

export default checkoutReducer;
