import React from 'react';
import { View, Dimensions } from 'react-native';
import FirstTab from './FirstTab';
import AnotherTab from './AnotherTab';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Animated, {
  Extrapolate,
  interpolate,
  diffClamp,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  NavigationNavigator,
  AnimatedValue,
  createAppContainer,
} from 'react-navigation';

const TAB_BAR_OFFSET = 100;

const getActiveRouteState = function<S>(route: S & any): S {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index] as S;
  return getActiveRouteState(childActiveRoute);
};

export const getHeightFromAspectRatio = (
  imageWidth: number = 3,
  imageHeight: number = 2
) => {
  const aspectRatio = imageHeight / imageWidth;
  return Dimensions.get('screen').width * aspectRatio;
};

const TopBar = createMaterialTopTabNavigator({
  FirstTab,
  AnotherTab,
});

const MyCustomTopBar: NavigationNavigator<any, any> = props => {
  const activeRoute = getActiveRouteState<{
    params: { scrollY?: AnimatedValue };
    routeName: string;
    key: string;
  }>(props.navigation?.state);

  if (!activeRoute.params?.scrollY) {
    return (
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
        <TopBar navigation={props.navigation} />
      </SafeAreaView>
    );
  }

  const diffY = diffClamp(activeRoute.params.scrollY, 0, TAB_BAR_OFFSET);

  const height = interpolate(diffY, {
    inputRange: [0, TAB_BAR_OFFSET],
    outputRange: [TAB_BAR_OFFSET, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
        <Animated.View
          style={{
            marginTop: -100,
            height,
          }}
        />
        <TopBar navigation={props.navigation} />
      </SafeAreaView>
    </>
  );
};

MyCustomTopBar.router = TopBar.router;

export default createAppContainer(MyCustomTopBar);
