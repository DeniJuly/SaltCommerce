import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';

import {Checkout, Header, Loader, Modem, Sort} from './src/components';
import Popup from './src/components/Popup';
import checkoutReducer, {
  CheckoutActionTypes,
  initialState as checkoutInitialState,
} from './src/reducer/checkoutReducer';
import productReducer, {
  initialState,
  ProductActionTypes,
} from './src/reducer/productReducer';

const App = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [checkoutData, dispatchCheckout] = useReducer(
    checkoutReducer,
    checkoutInitialState,
  );
  const [refresh, setRefresh] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const getData = useCallback(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
          payload: res?.products,
        });
        setRefresh(false);
      })
      .catch(() => {
        dispatch({
          type: ProductActionTypes.GET_PRODUCTS_FAILURE,
          payload: true,
        });
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: ProductActionTypes.GET_PRODUCTS_REQUEST});
    getData();
  }, [getData]);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getData();
  }, [getData]);

  const handleCheckout = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
    dispatchCheckout({type: CheckoutActionTypes.RESET_PRODUCT});
  };

  return (
    <View style={styles.page}>
      <Header product={state.products.length} />
      <View style={styles.content}>
        {state.loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Sort />
            <Modem
              checkoutData={checkoutData.products}
              dispatchCheckout={dispatchCheckout}
              data={state}
              onRefresh={onRefresh}
              refresh={refresh}
            />
            <Checkout
              checkoutData={checkoutData.products}
              productData={state.products}
              dispatchCheckout={dispatchCheckout}
              handleCheckout={handleCheckout}
            />
          </Fragment>
        )}
      </View>
      <Popup
        show={showPopup}
        checkoutData={checkoutData.products}
        productData={state.products}
        handleHide={handleHidePopup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listWrap: {
    paddingTop: 11,
  },
});
export default App;
