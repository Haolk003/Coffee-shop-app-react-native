import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SPACING } from "../theme/theme";

const ProfilePic = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/app_images/avatar.png")}
        style={styles.image}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  container: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: SPACING.space_36,
    height: SPACING.space_36,
  },
});
