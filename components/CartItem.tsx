import {
  ImageProps,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";

type Props = {
  id: string;
  name: string;
  roasted: string;
  imagelink_square: ImageProps;
  index: number;
  special_ingredient: string;
  average_rating: number;
  prices: { price: number; size: string; quantity: number }[];
  incrementCartItemQuantityHandler: (id: string, size: string) => void;
  decrementCartItemQuantityHandler: (id: string, size: string) => void;
};
const CartItem: React.FC<Props> = ({
  average_rating,
  decrementCartItemQuantityHandler,
  id,
  imagelink_square,
  incrementCartItemQuantityHandler,
  index,
  name,
  prices,
  roasted,
  special_ingredient,
}) => {
  return (
    <View>
      {prices.length > 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.gradientContainer}
        >
          <View style={styles.headerCartTitle}>
            <Image source={imagelink_square} style={styles.imageContainer} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{special_ingredient}</Text>
              {roasted && (
                <View style={styles.roatedContainer}>
                  <Text
                    style={{
                      color: COLORS.primaryLightGreyHex,
                      fontSize: FONTSIZE.size_14,
                    }}
                  >
                    {roasted}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.priceContainer}>
            {prices.map((price, index) => (
              <View key={price.size} style={styles.priceItemContainer}>
                <View style={styles.priceSizeContainer}>
                  <Text style={styles.sizeText}>{price.size}</Text>
                </View>
                <Text style={styles.price}>
                  <Text
                    style={{
                      color: COLORS.primaryOrangeHex,
                      fontWeight: "500",
                    }}
                  >
                    $
                  </Text>{" "}
                  {price.price}
                </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() =>
                      decrementCartItemQuantityHandler(id, price.size)
                    }
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.quantityValueConatiner}>
                    <Text style={styles.quanlittyValueText}>
                      {price.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() =>
                      incrementCartItemQuantityHandler(id, price.size)
                    }
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.gradientContainer}
        >
          <View style={styles.headerCartTitle}>
            <Image source={imagelink_square} style={styles.imageContainer} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{special_ingredient}</Text>
              <View key={prices[0].size} style={styles.priceItemContainer}>
                <View style={styles.priceSizeContainer}>
                  <Text style={styles.sizeText}>{prices[0].size}</Text>
                </View>
                <Text style={styles.price}>
                  <Text
                    style={{
                      color: COLORS.primaryOrangeHex,
                      fontWeight: "500",
                    }}
                  >
                    $
                  </Text>{" "}
                  {prices[0].price}
                </Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    decrementCartItemQuantityHandler(id, prices[0].size)
                  }
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityValueConatiner}>
                  <Text style={styles.quanlittyValueText}>
                    {prices[0].quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    incrementCartItemQuantityHandler(id, prices[0].size)
                  }
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  headerCartTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  listItemContainer: {
    gap: 20,
    paddingHorizontal: SPACING.space_20,
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  roatedContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    gap: 10,
  },
  title: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
  },
  priceContainer: {
    gap: 10,
    marginTop: 10,
  },
  priceItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  priceSizeContainer: {
    borderRadius: 10,
    backgroundColor: COLORS.primaryBlackRGBA,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
  },
  price: {
    color: COLORS.primaryWhiteHex,
    fontSize: 22,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 10,

    marginHorizontal: 10,
    width: 40,
    alignItems: "center",
    height: 40,
    justifyContent: "center",
  },
  quantityButtonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
  },
  removeButton: {
    backgroundColor: COLORS.primaryRedHex,
    borderRadius: 10,
    padding: 5,
  },
  removeButtonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
  },
  quantityValueConatiner: {
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.primaryBlackHex,
  },
  quanlittyValueText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
  },
});
