import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, SPACING } from "../theme/theme";
import GradientBGIcon from "./GradientBGIcon";
import ProfilePic from "./ProfilePic";

const HeaderBar = ({ title }: { title: string }) => {
  return (
    <View style={styles.headerContainer}>
      <GradientBGIcon
        name="menu-fold"
        size={16}
        color={COLORS.primaryLightGreyHex}
      />
      {title && (
        <Text
          style={{
            color: COLORS.primaryLightGreyHex,
            fontSize: 25,
            fontFamily: FONTFAMILY.poppins_medium,
          }}
        >
          {title}
        </Text>
      )}
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
