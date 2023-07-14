import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Black, BorderGrey, FiraBold} from '../config/theme';
import {CheckoutAction, CheckoutActionTypes} from '../reducer/checkoutReducer';
import {CheckoutType, ProductType} from '../types';
import {formatRupiah} from '../utils/formatNumber';
import Button from './Button';
import ButtonOutline from './ButtonOutline';

interface Props {
  checkoutData: CheckoutType[];
  productData: ProductType[];
  dispatchCheckout: React.Dispatch<CheckoutAction>;
  handleCheckout: () => void;
}
const Checkout = ({
  checkoutData,
  productData,
  dispatchCheckout,
  handleCheckout,
}: Props) => {
  const getProductPriceById = (productId: number): number => {
    const product = productData.find(item => item.id === productId);
    return product ? product.price : 0;
  };

  const total = checkoutData.reduce((sum, item) => {
    const itemPrice = item.qty * getProductPriceById(item.id);
    return sum + itemPrice;
  }, 0);

  const handleReset = () =>
    dispatchCheckout({type: CheckoutActionTypes.RESET_PRODUCT});
  return (
    <View style={styles.container}>
      <View style={styles.infoWrap}>
        <Text style={styles.textInfo}>Total:</Text>
        <Text style={styles.textInfo}>{formatRupiah(total)}</Text>
      </View>
      <View style={styles.btnWrap}>
        <Button
          disabled={total === 0}
          backgroundColor={Black}
          textBtn="Checkout"
          onPress={handleCheckout}
        />
        {total > 0 ? (
          <ButtonOutline
            disabled={false}
            color={Black}
            textBtn="Reset"
            onPress={handleReset}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderTopColor: BorderGrey,
    borderWidth: 1,
  },
  infoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  textInfo: {
    fontSize: 18,
    fontFamily: FiraBold,
    color: Black,
  },
  btnWrap: {
    gap: 11,
  },
});

export default Checkout;
