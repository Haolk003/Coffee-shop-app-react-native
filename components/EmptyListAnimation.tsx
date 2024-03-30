import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS } from "../theme/theme";

type Props = {
  title: string;
};
const EmptyListAnimation: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.emptyCartContainer}>
      <LottieView
        style={styles.lottieStyle}
        source={require("../lottie/coffecup.json")}
        autoPlay
        loop
      />
      <Text style={styles.emptyCartText}>{title}</Text>
    </View>
  );
};

export default EmptyListAnimation;

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primaryLightGreyHex,
  },
  lottieStyle: {
    height: 300,
    width: 300,
  },
});
