import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTSIZE } from "../theme/theme";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
type Props = {
  name: string;
  icon: any;
  isIcon: boolean;
  paymentMethod: string;
};
const PaymentMethod: React.FC<Props> = ({
  icon,
  isIcon,
  name,
  paymentMethod,
}) => {
  return (
    <View
      style={[
        styles.paymentCardContainer,
        {
          borderColor:
            name === paymentMethod
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}
    >
      {isIcon ? (
        <LinearGradient
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.walletRow}>
            <FontAwesome5
              name="wallet"
              size={24}
              color={COLORS.primaryWhiteHex}
            />
            <Text style={styles.paymentCardText}>Wallet</Text>
          </View>
          <Text
            style={{
              color: COLORS.primaryLightGreyHex,
              fontSize: FONTSIZE.size_16,
            }}
          >
            $ 100.50
          </Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        >
          <View style={styles.linearGradientContainer}>
            <View style={styles.walletRow}>
              <Image source={icon} style={styles.methodImage} />
              <Text style={styles.paymentCardText}>{name}</Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  paymentCardContainer: {
    borderRadius: 20,
    backgroundColor: COLORS.primaryGreyHex,
    borderWidth: 3,
    overflow: "hidden",
  },
  linearGradientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  walletRow: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  paymentCardText: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_16,
    fontWeight: "500",
  },
  methodImage: {
    width: 30,
    height: 30,
    objectFit: "cover",
  },
});
