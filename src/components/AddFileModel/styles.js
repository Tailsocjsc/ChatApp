/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors';
import { fontFamily } from '../../utils/theme/font';

export default StyleSheet.create({
  // ...
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: colors.white,
    // paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemView: {
    alignItems: 'center',
  },
  iconView: {
    height: 24,
    width: 24,
    tintColor: colors.inputGrayO50,
    resizeMode: 'contain',
  },
  textView: {
    fontFamily: fontFamily,
    fontSize: 12,
    color: colors.inputGrayO50,
  },
});
