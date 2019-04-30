import React from 'react';
import { View, Text, Image } from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image
        style={{ width: 100, height: 100 }}
        source={require('../assets/images/Loading.gif')}
      />
    </View>
  );
};

export default Loading;
