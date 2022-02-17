/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors';
import { fontFamily, fontFamilySemiBold } from '../../utils/theme/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

    marginLeft: 18,
    marginRight: 18,
  },
  appHeader: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  backView: {
    padding: 4,
    marginLeft: 12,
  },
  backIcon: {
    height: 28,
    width: 28,
    tintColor: colors.white,
  },
  headingText: {
    fontFamily: fontFamilySemiBold,
    fontSize: 16,
    color: colors.white,
    marginLeft: 18,
  },
  containtView: {},
  inputStyle: {
    marginLeft: 12,
    width: '60%',
  },
  footerView: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.gray,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendView: {
    padding: 4,
  },
  sendText: {
    fontFamily: fontFamilySemiBold,
    fontSize: 16,
    color: colors.primary,
  },
  actionView: {
    position: 'absolute',
    right: 12,
    alignItems: 'center',
  },
  unreadPossition: {
    height: 22,
    width: 22,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  addView: {
    height: 56,
    width: 56,
    borderRadius: 40,
    backgroundColor: colors.primary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 18,
    bottom: 18,
  },
  addIcon: {
    height: 26,
    width: 26,
    tintColor: colors.white,
    resizeMode: 'contain',
  },
  timeText: {
    fontSize: 12,
  },
});
