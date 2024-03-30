import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import BgIcon from "./BgIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.4;

type Props = {
  id: string;
  name: string;
  roasted: string;
  imagelink_square: any;
  index: number;
  special_ingredient: string;
  average_rating: number;
  price: { price: number };
  buttonPressHandler: (data: any) => void;
};
const CoffeeCard: React.FC<Props> = ({
  average_rating,
  buttonPressHandler,
  id,
  imagelink_square,
  index,
  name,
  price,
  roasted,
  special_ingredient,
}) => {
  return (
    <LinearGradient
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardLinearGradientContainer}
    >
      <ImageBackground
        source={imagelink_square}
        style={styles.cardImageBg}
        resizeMode="cover"
      >
        <View style={styles.cardRating}>
          <Icon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_18}
          />
          <Text style={styles.cardText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={[styles.cardText, styles.cardTitle]}>{name}</Text>
      <Text style={[styles.cardText]}>{special_ingredient}</Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.cardText, styles.cardTextPrice]}>
          $ <Text style={{ color: COLORS.primaryWhiteHex }}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() =>
            buttonPressHandler({
              id,
              index,
              price,
              special_ingredient,
              imagelink_square,
              average_rating,
              name,
              roasted,
            })
          }
        >
          <BgIcon
            color={COLORS.primaryWhiteHex}
            name="add"
            Bgcolor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  cardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_15,
  },
  cardRating: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopRightRadius: BORDERRADIUS.radius_15,
    borderBottomLeftRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.primaryBlackRGBA,
  },

  cardImageBg: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: "hidden",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cardText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
  },
  cardTextPrice: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 23,
    color: COLORS.primaryOrangeHex,
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 23,
    marginBottom: 5,
  },
});
