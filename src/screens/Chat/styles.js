/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors';
import { fontFamily, fontFamilySemiBold } from '../../utils/theme/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  appHeader: {
    height: 68,
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
    height: 22,
    width: 22,
    tintColor: colors.white,
  },
  deleteIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  headingText: {
    fontFamily: fontFamilySemiBold,
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
  },
  containtView: {
    margin: 18,
    marginBottom: 70,
  },
  inputStyle: {
    marginLeft: 12,
    width: '75%',
  },
  footerView: {
    position: 'absolute',
    bottom: 0,
    height: 46,
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'space-between',
    borderColor: colors.textGrey,
    borderWidth: 0.5,
    // width: '100%',
    backgroundColor: colors.white,
    borderRadius: 30,
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
  addView: {
    height: 30,
    width: 30,
    backgroundColor: colors.devider,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  typingView: {
    // height: 40,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fontFamilySemiBold,
    fontSize: 16,
  },
  jobTitleText: {
    fontSize: 14,
    fontFamily: fontFamily,
  },
  sendIcon: {
    height: 28,
    width: 28,
    tintColor: colors.primary,
  },
});
