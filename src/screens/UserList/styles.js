/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import colors from '../../utils/theme/colors';
import { fontFamilySemiBold } from '../../utils/theme/font';

export default StyleSheet.create({
  scrollCotainer: {
    flex: 1,
  },
  containtView: {
    flex: 1,
    marginLeft: 18,
    marginRight: 18,
  },
  appHeader: {
    height: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 18,
    backgroundColor: colors.primary,
  },
  backView: {
    padding: 4,
    marginLeft: 12,
  },

  backIcon: {
    height: 18,
    width: 18,
    tintColor: colors.white,
  },
  headingText: {
    fontFamily: fontFamilySemiBold,
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
  },
});
