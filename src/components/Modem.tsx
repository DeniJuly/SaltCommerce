import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';

import {CheckoutAction} from '../reducer/checkoutReducer';
import {CheckoutType, ProductType} from '../types';
import EmptyComponent from './EmptyComponent';
import ProductItem from './ProductItem';

interface Props {
  data: ProductType[];
  checkoutData: CheckoutType[];
  dispatchCheckout: React.Dispatch<CheckoutAction>;
  onRefresh: () => void;
  refresh: boolean;
}
const Modem = ({
  data,
  checkoutData,
  dispatchCheckout,
  onRefresh,
  refresh,
}: Props) => {
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
      data={data}
      keyExtractor={item => item.id?.toString()}
      renderItem={({item}) => {
        return (
          <ProductItem
            key={item.id?.toString()}
            id={item.id}
            price={item.price}
            title={item.title}
            qty={item.stock}
            checkoutData={checkoutData}
            dispatchCheckout={dispatchCheckout}
          />
        );
      }}
      style={styles.listWrap}
      ListEmptyComponent={<EmptyComponent />}
    />
  );
};

const styles = StyleSheet.create({
  listWrap: {
    paddingTop: 11,
  },
});
export default Modem;
