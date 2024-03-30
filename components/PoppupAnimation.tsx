import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ImageProps,
  ViewStyle,
} from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import LottieView from "lottie-react-native";

type Props = {
  style: StyleProp<ViewStyle>;
  source: any;
};
const PoppupAnimation: React.FC<Props> = ({ source, style }) => {
  return (
    <View style={styles.lottieAnimationContainer}>
      <LottieView style={style} source={source} autoPlay loop={false} />
    </View>
  );
};

export default PoppupAnimation;

const styles = StyleSheet.create({
  lottieAnimationContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: "center",
  },
});
