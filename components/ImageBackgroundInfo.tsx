import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ImageProps,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
import Icon from "react-native-vector-icons/MaterialIcons";

import { BlurView } from "expo-blur";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import GradientBGIcon from "./GradientBGIcon";
import FontAwesome from "react-native-vector-icons/FontAwesome";
type Props = {
  id: string;
  enableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: number;
  roasted: string;
  backHandler: () => void;
  toggleFavorite: () => void;
};
const ImageBackgroundInfo: React.FC<Props> = ({
  average_rating,
  backHandler,
  enableBackHandler,
  favourite,
  id,
  imagelink_portrait,
  ingredients,
  name,
  ratings_count,
  roasted,
  special_ingredient,
  toggleFavorite,
  type,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ImageBackgroundImage}
      >
        {enableBackHandler ? (
          <View style={styles.imageHeaderBarContainerWithBack}>
            <TouchableOpacity onPress={backHandler}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite}>
              <GradientBGIcon
                name={favourite ? "heart" : "hearto"}
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageHeaderBarContainerWithoutBack}>
            <GradientBGIcon
              name={favourite ? "heart" : "hearto"}
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </View>
        )}

        <BlurView intensity={10} style={styles.blurStyle}>
          <View style={styles.coffeeDetailLeft}>
            <View>
              <Text style={styles.coffeeNameStyle}>{name}</Text>
              <Text style={styles.coffeeSpecialIngredientStyle}>
                {special_ingredient}
              </Text>
            </View>
            <View style={styles.coffeeRatingStyle}>
              <Icon name="star" color={COLORS.primaryOrangeHex} size={25} />
              <Text style={{ color: COLORS.primaryWhiteHex, fontSize: 20 }}>
                {average_rating}{" "}
                <Text
                  style={{
                    fontSize: FONTSIZE.size_16,
                    color: COLORS.primaryLightGreyHex,
                  }}
                >
                  ({ratings_count})
                </Text>
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.coffeeDetailsRightIconContainer}>
              {type === "Coffee" ? (
                <View style={styles.coffeeDetailsRightIconBg}>
                  <Icon
                    name="coffee"
                    color={COLORS.primaryOrangeHex}
                    size={20}
                  />
                  <Text
                    style={{
                      color: COLORS.primaryLightGreyHex,
                      fontSize: FONTSIZE.size_10,
                    }}
                  >
                    Coffee
                  </Text>
                </View>
              ) : (
                <View style={styles.coffeeDetailsRightIconBg}>
                  <FontAwesome5
                    name="seedling"
                    color={COLORS.primaryOrangeHex}
                    size={20}
                  />
                  <Text
                    style={{
                      color: COLORS.primaryLightGreyHex,
                      fontSize: FONTSIZE.size_10,
                    }}
                  >
                    Bean
                  </Text>
                </View>
              )}
              <View style={styles.coffeeDetailsRightIconBg}>
                <FontAwesome
                  name="leaf"
                  size={18}
                  color={COLORS.primaryOrangeHex}
                />
                <Text
                  style={{
                    color: COLORS.primaryLightGreyHex,
                    fontSize: FONTSIZE.size_12,
                  }}
                >
                  {ingredients}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.primaryBlackHex,
                width: "100%",
                borderRadius: 10,
                height: 40,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.primaryLightGreyHex,
                  fontSize: FONTSIZE.size_12,
                }}
              >
                {roasted}
              </Text>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  ImageBackgroundImage: {
    width: "100%",
    height: "auto",
    resizeMode: "cover",
    position: "relative",
    alignItems: "center",
    aspectRatio: 20 / 25,
  },
  imageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  imageHeaderBarContainerWithoutBack: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  blurStyle: {
    backgroundColor: COLORS.secondaryBlackRGBA,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    padding: 20,
    height: 200,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coffeeDetailLeft: {
    gap: 20,
  },
  coffeeNameStyle: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    fontWeight: "500",
  },
  coffeeSpecialIngredientStyle: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryLightGreyHex,
  },
  coffeeRatingStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  coffeeDetailsRight: {
    gap: 10,
  },
  coffeeDetailsRightIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  coffeeDetailsRightIconBg: {
    backgroundColor: COLORS.primaryBlackHex,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
