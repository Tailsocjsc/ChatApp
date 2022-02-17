/* eslint-disable prettier/prettier */
import { Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function isLandscape() {
  return WIDTH > HEIGHT;
}

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 768, 1024 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const wp = (dimension) => {
  if (isLandscape()) {
    return dimension > WIDTH
      ? wp2dp((HEIGHT / dimension) * 100 + '%')
      : wp2dp((dimension / HEIGHT) * 100 + '%');
  } else {
    return dimension > WIDTH
      ? wp2dp((WIDTH / dimension) * 100 + '%')
      : wp2dp((dimension / WIDTH) * 100 + '%');
  }
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 768, 1024 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const hp = (dimension) => {
  if (isLandscape()) {
    return hp2dp((dimension / WIDTH) * 100 + '%');
  } else {
    return hp2dp((dimension / HEIGHT) * 100 + '%');
  }
};
