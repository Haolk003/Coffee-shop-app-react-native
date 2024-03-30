import { ImageProps, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from "../theme/theme";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  id: string;
  imagelink_portrait: ImageProps;
  name: string;
  special_ingredient: string;
  type: string;
  ingredients: string;
  average_rating: number;
  ratings_count: number;
  roasted: string;
  description: string;
  favourite: boolean;
  ToggleFavouriteItem: () => void;
};
const FavoriteItemCard: React.FC<Props> = ({
  ToggleFavouriteItem,
  average_rating,
  description,
  favourite,
  id,
  imagelink_portrait,
  ingredients,
  name,
  ratings_count,
  roasted,
  special_ingredient,
  type,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundInfo
        enableBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favourite={favourite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        toggleFavorite={ToggleFavouriteItem}
        backHandler={() => {}}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.containerGradient}
      >
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText} numberOfLines={3}>
          {description}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default FavoriteItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
    width: "100%",
  },
  containerGradient: {
    gap: 10,
    padding: 20,
  },
  descriptionTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
});
