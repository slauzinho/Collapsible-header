import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { NavigationScreenProp, AnimatedValue } from 'react-navigation';
import { useValues, onScroll } from 'react-native-redash';
import { FunctionComponent } from 'react';

interface Props {
  navigation: NavigationScreenProp<any, { scrollY?: AnimatedValue }>;
}

const AnotherTab: FunctionComponent<Props> = props => {
  const [scrollY] = useValues([0], []);
  const items = new Array(50).fill(1);

  useEffect(() => {
    props.navigation.setParams({ scrollY });
  }, []);

  return (
    <View style={{ padding: 30 }}>
      <Animated.ScrollView
        onScroll={onScroll({ y: scrollY })}
        scrollEventThrottle={1}
      >
        {items.map((_, index) => (
          <View
            key={index}
            style={{
              height: 50,
              backgroundColor: 'green',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{index}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default AnotherTab;
