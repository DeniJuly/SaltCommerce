import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  Black,
  BorderGrey,
  ContentPadding,
  FiraBold,
  FiraRegular,
  LightBlack,
  LightGrey,
} from '../config/theme';
import {CheckoutAction, CheckoutActionTypes} from '../reducer/checkoutReducer';
import {CheckoutType} from '../types';
import {formatRupiah} from '../utils/formatNumber';
import ButtonQTY from './ButtonQTY';

interface Props {
  title: String;
  price: number;
  id: number;
  qty: number;
  checkoutData: CheckoutType[];
  dispatchCheckout: React.Dispatch<CheckoutAction>;
}
const ProductItem = ({
  id,
  price,
  title,
  qty,
  checkoutData,
  dispatchCheckout,
}: Props) => {
  // Check if the product exists in the checkout reducer
  const productInCart = checkoutData.find(item => item.id === id);

  // Get the quantity from the checkout reducer for the specific product
  const cartQty = productInCart ? productInCart.qty : 0;

  const handleAdd = () =>
    dispatchCheckout({type: CheckoutActionTypes.ADD_PRODUCT, payload: id});
  const handleMin = () =>
    dispatchCheckout({type: CheckoutActionTypes.MIN_PRODUCT, payload: id});
  return (
    <View style={styles.container}>
      <View style={styles.wrapContent}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.price}>{formatRupiah(price)}</Text>
      </View>
      <View style={styles.btnWrap}>
        <ButtonQTY
          disabled={cartQty === 0}
          backgroundColor={Black}
          textBtn="-"
          onPress={handleMin}
        />
        <Text style={styles.qty}>{cartQty}</Text>
        <ButtonQTY
          disabled={cartQty === qty}
          backgroundColor={Black}
          textBtn="+"
          onPress={handleAdd}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ContentPadding,
    marginVertical: 21,
    flexDirection: 'row',
    gap: 10,
  },
  wrapContent: {
    flex: 1,
  },
  title: {
    color: Black,
    fontSize: 16,
    fontFamily: FiraBold,
    marginBottom: 7,
  },
  price: {
    color: LightBlack,
    fontSize: 14,
    fontFamily: FiraBold,
  },
  btnWrap: {
    backgroundColor: LightGrey,
    borderWidth: 1,
    borderColor: BorderGrey,
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    fontSize: 20,
    fontFamily: FiraRegular,
    color: Black,
    width: 80,
    textAlign: 'center',
  },
});

export default ProductItem;
