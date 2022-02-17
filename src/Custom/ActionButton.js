import { FAB, Portal, Provider } from 'react-native-paper';
import * as React from 'react';
// import { colors, screenHeight } from '../../../res/style/theme';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { getStatusBarHeight } from '../../../res/function/StatusBarHeight';
import { Image, Platform, TouchableOpacity } from 'react-native';
import Images from '../Image/Index';

const AcitonButton = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <TouchableOpacity
      onPress={() => {
        props.OnLogin();
        props.OnRegister();
      }}
      style={{
        borderRadius: 999,
        height: 50,
        width: 50,
        backgroundColor: '#5DB1E7',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        marginBottom: Platform.OS === 'ios' ? 110 : null,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image source={Images.ic_next} style={{ height: 20, width: 20 }} />
    </TouchableOpacity>
  );
};
export default AcitonButton;
AcitonButton.defaultProps = {
  OnLogin: () => {},
  OnRegister: () => {},
  //   onPressIncome: () => {},
};
