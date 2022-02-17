/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '../../utils/theme/colors';
import { fontFamilyBold, fontFamilySemiBold } from '../../utils/theme/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  imageStyle: {
    width: '80%',
    height: 140,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 28,
    color: colors.primary,
    fontFamily: fontFamilyBold,
    marginTop: 22,
  },
});
