import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import {IcDropdown, IcSort} from '../assets/images/icons';
import {
  Black,
  BorderGrey,
  ContentPadding,
  FiraBold,
  FiraRegular,
  LightGrey,
  White,
} from '../config/theme';

const ItemSelect = ({text, last}: {text: String; last: boolean}) => {
  return (
    <View style={styles.itemSelect}>
      <View style={styles.itemContent}>
        <Text style={styles.textSelect}>{text}</Text>
      </View>
      {!last ? <View style={styles.borderItemSelect} /> : null}
    </View>
  );
};

const Sort = () => {
  const filter = ['Highest Price', 'Lowest Price', 'Name'];
  return (
    <View style={styles.container}>
      <View style={styles.wrapContent}>
        <View style={styles.iconWrap}>
          <Image source={IcSort} style={styles.icon} />
          <Text style={styles.text}>Sort By: </Text>
        </View>
        <SelectDropdown
          data={filter}
          buttonStyle={styles.selectBtn}
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          rowStyle={styles.rowStyle}
          dropdownOverlayColor="transparent"
          defaultButtonText="Default"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderDropdownIcon={() => (
            <Image source={IcDropdown} style={styles.iconDropdown} />
          )}
          renderCustomizedRowChild={(item, index) => (
            <ItemSelect text={item} last={index === filter.length - 1} />
          )}
        />
      </View>
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: ContentPadding,
  },
  wrapContent: {
    paddingBottom: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    height: 1,
    backgroundColor: LightGrey,
    paddingHorizontal: ContentPadding,
  },
  iconWrap: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  icon: {
    width: 12,
    height: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: FiraRegular,
  },
  selectBtn: {
    borderRadius: 8,
    backgroundColor: LightGrey,
    borderWidth: 1,
    borderColor: BorderGrey,
    height: 36,
    width: 160,
  },
  buttonTextStyle: {
    fontSize: 14,
    fontFamily: FiraBold,
    color: Black,
  },
  iconDropdown: {
    width: 18,
    height: 18,
  },
  dropdownStyle: {
    marginTop: 6,
    backgroundColor: White,
    borderRadius: 8,
    shadowColor: '#C0C0C0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemSelect: {
    backgroundColor: White,
    paddingHorizontal: 13,
  },
  itemContent: {
    paddingVertical: 13,
  },
  textSelect: {
    fontSize: 14,
    color: Black,
    fontFamily: FiraRegular,
  },
  rowStyle: {
    borderBottomWidth: 0,
  },
  borderItemSelect: {
    height: 1,
    backgroundColor: BorderGrey,
  },
});
export default Sort;
