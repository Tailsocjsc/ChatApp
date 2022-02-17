/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors';
import {
  fontFamily,
  fontFamilyBold,
  fontFamilySemiBold,
} from '../../utils/theme/font';

export default StyleSheet.create({
  mainView: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 22,
  },
  googleButton: {
    height: 45,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundGradient: 'vertical',
    backgroundGradientTop: '#333333',
    backgroundGradientBottom: '#666666',
    marginTop: 22,
    width: '100%',
    borderRadius: 22,
  },
  googleText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: fontFamily,
  },

  textInput: {
    width: '100%',
    paddingLeft: 12,
  },
  dontAccountView: {
    // padding: 12,
    paddingLeft: 8,
  },
  dontAccountText: {
    color: colors.primary,
    fontFamily: fontFamilySemiBold,
  },
  dontAccountFirst: {
    color: colors.textGrey,
    fontFamily: fontFamily,
  },
  inputMainView: {
    height: 48,
    width: '100%',
    marginTop: 6,
    backgroundColor: colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  iconView: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    tintColor: colors.placeholder,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: fontFamilyBold,
    color: colors.textGrey,
  },
  welcomeDetailText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colors.textGrey,
  },
  inputLable: {
    fontSize: 18,
    color: colors.textGrey,
    fontFamily: fontFamily,
  },
  passwordEye: {
    height: 18,
    width: 18,
    position: 'absolute',
    right: 16,
  },
  eyeIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  linearGradient: {
    height: 46,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
});
