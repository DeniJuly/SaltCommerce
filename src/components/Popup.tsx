import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

import {Black, FiraRegular, FiraSemiBold} from '../config/theme';
import {CheckoutType, ProductType} from '../types';
import {formatRupiah} from '../utils/formatNumber';
import Button from './Button';

interface Props {
  show: boolean;
  checkoutData: CheckoutType[];
  productData: ProductType[];
  handleHide: () => void;
}
const Popup = ({show, checkoutData, productData, handleHide}: Props) => {
  const getProductPriceById = (productId: number): number => {
    const product = productData.find(item => item.id === productId);
    return product ? product.price : 0;
  };

  const total = checkoutData.reduce((sum, item) => {
    const itemPrice = item.qty * getProductPriceById(item.id);
    return sum + itemPrice;
  }, 0);
  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.text}>
            You have successfully purchase {checkoutData.length} products with
            total of {formatRupiah(total)}. Click close to buy another modems
          </Text>
          <Button
            backgroundColor={Black}
            onPress={handleHide}
            textBtn="Close"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(58,65,68,0.5)',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: FiraSemiBold,
    color: Black,
    marginBottom: 14,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: FiraRegular,
    color: Black,
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default Popup;
