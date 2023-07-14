import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

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
import {ProductType} from './src/types';

const App = () => {
  const selectRef = useRef<SelectDropdown>(null);
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [checkoutData, dispatchCheckout] = useReducer(
    checkoutReducer,
    checkoutInitialState,
  );
  const [refresh, setRefresh] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);

  const getData = useCallback(() => {
    selectRef.current?.reset();
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
          payload: res?.products,
        });
        setDataProduct(res?.products);
        setRefresh(false);
      })
      .catch(() => {
        dispatch({
          type: ProductActionTypes.GET_PRODUCTS_FAILURE,
          payload: true,
        });
      });
  }, [dispatch]);

  const filterProducts = (filterType: string) => {
    let filteredData = [...state.products]; // Create a copy of the original data

    if (filterType === 'Highest Price') {
      filteredData.sort((a, b) => b.price - a.price); // Sort by highest price
    } else if (filterType === 'Lowest Price') {
      filteredData.sort((a, b) => a.price - b.price); // Sort by lowest price
    } else if (filterType === 'Name') {
      filteredData.sort((a, b) => a.title.localeCompare(b.title)); // Sort by name
    }
    setDataProduct(filteredData); // Update the state with the filtered data
  };

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

  const handleSort = (value: string) => {
    filterProducts(value);
  };

  return (
    <View style={styles.page}>
      <Header product={state.products.length} />
      <View style={styles.content}>
        {state.loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Sort handleSort={handleSort} ref={selectRef} />
            <Modem
              checkoutData={checkoutData.products}
              dispatchCheckout={dispatchCheckout}
              data={dataProduct}
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
