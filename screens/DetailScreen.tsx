import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import { useStore } from "../store/store";
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";

import PaymentFooter from "../components/PaymentFooter";
const DetailScreen = ({ navigation, route }) => {
  const itemOfIndex = useStore((state: any) =>
    route.params.type === "Coffee" ? state.CoffeeList : state.BeansList
  )[route.params.index];

  const addToCart = useStore((state: any) => state.addToCart);
  const addToFavorite = useStore((state: any) => state.addToFavoriteList);
  const deleteFavourite = useStore(
    (state: any) => state.deleteFromFavoriteList
  );
  const [fullDesc, setFullDesc] = React.useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);

  const toggleToFavorites = () => {
    if (!itemOfIndex.favourite) {
      addToFavorite(route.params.type, itemOfIndex.id);
    } else {
      deleteFavourite(route.params.type, itemOfIndex.id);
    }
  };

  const backHandler = () => {
    navigation.pop();
  };

  const addToCartHandler = () => {
    addToCart({
      ...itemOfIndex,
      prices: [{ ...price, quantity: 1 }],
    });
    Platform.OS === "ios"
      ? Alert.alert("Added to Cart")
      : ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar style="auto" backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <ImageBackgroundInfo
          enableBackHandler={true}
          {...itemOfIndex}
          toggleFavorite={toggleToFavorites}
          backHandler={backHandler}
        />
        <View style={styles.descriptionContainer}>
          <Text
            style={{
              color: COLORS.primaryLightGreyHex,
              fontSize: FONTSIZE.size_20,
              marginBottom: SPACING.space_10,
            }}
          >
            Description
          </Text>
          {fullDesc ? (
            <TouchableWithoutFeedback onPress={() => setFullDesc(false)}>
              <Text style={{ color: COLORS.primaryLightGreyHex }}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => setFullDesc(true)}>
              <View>
                <Text
                  style={{
                    color: COLORS.primaryLightGreyHex,
                    fontSize: FONTSIZE.size_16,
                  }}
                >
                  {itemOfIndex.description.slice(0, 150)}{" "}
                  {itemOfIndex.description.length > 150 && (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>
                      ...Read More
                    </Text>
                  )}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <Text
            style={{
              color: COLORS.primaryLightGreyHex,
              fontSize: FONTSIZE.size_20,
              marginTop: SPACING.space_20,
            }}
          >
            Price
          </Text>
          <View style={styles.sizeListContainer}>
            {itemOfIndex &&
              itemOfIndex.prices.map((data: any) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.sizeListItemContainer,
                      price == data
                        ? styles.sizeListItemContainerSelected
                        : null,
                    ]}
                    onPress={() => setPrice(data)}
                  >
                    <Text
                      style={[
                        styles.sizeListItemText,
                        price == data ? styles.sizeListItemTextSelected : null,
                      ]}
                    >
                      {data.size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
        <PaymentFooter
          buttonPressHandler={addToCartHandler}
          buttonText="Add To Cart"
          price={price}
        />
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  footerInfoArea: {
    padding: SPACING.space_20,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: COLORS.primaryBlackHex,
  },
  descpTextContainer: {},
  sizeListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 10,
  },
  sizeListItemContainer: {
    width: "30%",
    height: 35,
    borderRadius: 10,
    backgroundColor: COLORS.primaryGreyHex,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeListItemText: {
    color: COLORS.primaryLightGreyHex,
  },
  sizeListItemTextSelected: {
    color: COLORS.primaryOrangeHex,
  },
  sizeListItemContainerSelected: {
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
  },
});
