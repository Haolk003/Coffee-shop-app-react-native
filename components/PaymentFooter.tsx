import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";

type PriceProps = {
  price: number;
  currency: string;
};

type PaymentFooterProps = {
  price: PriceProps;
  buttonPressHandler: () => void;
  buttonText: string;
};
const PaymentFooter: React.FC<PaymentFooterProps> = ({
  buttonPressHandler,
  buttonText,
  price,
}) => {
  return (
    <View style={styles.paymentFooterContainer}>
      <View style={styles.paymentFooterPrice}>
        <Text
          style={{
            color: COLORS.secondaryLightGreyHex,
            fontSize: FONTSIZE.size_16,
          }}
        >
          Total Price
        </Text>
        <View style={styles.paymentPriceContainer}>
          <Text
            style={{
              color: COLORS.primaryOrangeHex,
              fontSize: FONTSIZE.size_30,
            }}
          >
            {price.currency}
          </Text>
          <Text
            style={{
              color: COLORS.primaryLightGreyHex,
              fontSize: FONTSIZE.size_28,
              fontWeight: "bold",
            }}
          >
            {price.price}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.paymentButtonBuy}
        onPress={buttonPressHandler}
      >
        <Text
          style={{
            color: COLORS.primaryLightGreyHex,
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  paymentFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_20,
  },
  paymentFooterPrice: {
    gap: 3,
    alignItems: "center",
  },
  paymentButtonBuy: {
    backgroundColor: COLORS.primaryOrangeHex,
    color: COLORS.primaryWhiteHex,
    borderRadius: 20,
    minWidth: 200,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    paddingHorizontal: 10,
  },
  paymentPriceContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
