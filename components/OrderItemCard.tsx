import { StyleSheet, Text, View, Image, ImageProps } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTSIZE } from "../theme/theme";

type Props = {
  type: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: { price: number; quantity: number; size: string }[];
  itemPrice: string;
};
const OrderItemCard: React.FC<Props> = ({
  imagelink_square,
  itemPrice,
  name,
  prices,
  special_ingredient,
  type,
}) => {
  const totalPriceCart = prices.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.orderCardContainer}
    >
      <View style={styles.orderCardHeader}>
        <View style={styles.orderCardHeaderLeft}>
          <Image source={imagelink_square} style={styles.orderCardImage} />
          <View>
            <Text
              style={{
                color: COLORS.primaryLightGreyHex,
                fontSize: FONTSIZE.size_20,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: COLORS.primaryLightGreyHex,
                fontSize: FONTSIZE.size_14,
              }}
            >
              {special_ingredient}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: COLORS.primaryLightGreyHex,
            fontSize: FONTSIZE.size_20,
          }}
        >
          ${" "}
          <Text style={{ color: COLORS.primaryOrangeHex }}>
            {totalPriceCart.toFixed(2)}
          </Text>
        </Text>
      </View>
      <View style={styles.orderCardListContainer}>
        {prices.map((item, index) => (
          <View style={styles.orderCardList}>
            <View style={styles.orderCardHeaderLeft}>
              <View style={styles.orderCardListSize}>
                <View style={styles.orderCardListSizeLeft}>
                  <Text style={{ color: COLORS.primaryWhiteHex }}>
                    {item.size}
                  </Text>
                </View>
                <View style={styles.orderCardListSizeRight}>
                  <Text
                    style={{
                      color: COLORS.primaryWhiteHex,
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    <Text style={{ color: COLORS.primaryOrangeHex }}>$</Text>{" "}
                    {item.price}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                color: COLORS.primaryLightGreyHex,
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              <Text style={{ color: COLORS.primaryOrangeHex }}>× </Text>
              <Text>{item.quantity}</Text>
            </Text>
            <Text
              style={{
                color: COLORS.primaryLightGreyHex,
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              <Text style={{ color: COLORS.primaryOrangeHex }}>$</Text>{" "}
              {item.price}
            </Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  orderCardContainer: {
    borderRadius: 20,
    padding: 15,
  },
  orderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  orderCardHeaderLeft: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  orderCardImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    objectFit: "cover",
  },
  orderCardListContainer: {
    gap: 10,
    marginTop: 20,
  },
  orderCardList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderCardListSize: {
    backgroundColor: COLORS.primaryBlackHex,
    flexDirection: "row",

    borderRadius: 10,
  },
  orderCardListSizeLeft: {
    borderRightWidth: 2,
    borderRightColor: COLORS.primaryGreyHex,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  orderCardListSizeRight: {
    paddingHorizontal: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
