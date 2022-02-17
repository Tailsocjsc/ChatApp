/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors';
import {
  fontFamilyBold,
  fontFamily,
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
    width: '90%',
    alignSelf: 'center',
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
  googleButton: {
    height: 45,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginTop: 22,
    width: '100%',
    borderRadius: 22,
  },
  googleText: {
    color: '#fff',
    fontSize: 18,
  },

  textInput: {
    width: '90%',
    paddingLeft: 8,
  },
  profileImgae: {
    height: 62,
    width: 62,
    backgroundColor: colors.gray,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 18,
  },
  nameRowView: {
    flexDirection: 'row',
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
  inputMainView: {
    height: 48,
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
  dontAccountText: {
    color: colors.primary,
    fontFamily: fontFamilySemiBold,
  },
  dontAccountFirst: {
    color: colors.textGrey,
    fontFamily: fontFamily,
  },
});
