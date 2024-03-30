import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BORDERRADIUS, SPACING } from "../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome6";

type Props = {
  name: string;
  color: string;
  size: number;
  Bgcolor: string;
};
const BgIcon: React.FC<Props> = ({ Bgcolor, color, name, size }) => {
  return (
    <View style={[styles.iconBg, { backgroundColor: Bgcolor }]}>
      <Icon name={name} color={color} size={size} />
    </View>
  );
};

export default BgIcon;

const styles = StyleSheet.create({
  iconBg: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_10,
    overflow: "hidden",
  },
});
