import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useStore } from "../store/store";
import EmptyListAnimation from "../components/EmptyListAnimation";
import FavoriteItemCard from "../components/FavoriteItemCard";

const FavoriesScreen = ({ navigation }: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const favoriesList = useStore((state: any) => state.FavoriesList);
  const toggleToFavorites = () => {
    // if (!itemOfIndex.favourite) {
    //   addToFavorite(route.params.type, itemOfIndex.id);
    // } else {
    //   deleteFavourite(route.params.type, itemOfIndex.id);
    // }
  };
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <HeaderBar title="Favories" />
        <View style={[styles.scrollInterView, { marginBottom: tabBarHeight }]}>
          <View style={styles.listItemContainer}>
            {favoriesList.length === 0 ? (
              <EmptyListAnimation title="No Favourite" />
            ) : (
              <View style={styles.favouriteContainer}>
                {favoriesList.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        navigation.push("Details", {
                          index: item.index,
                          id: item.id,
                          type: item.type,
                        });
                      }}
                    >
                      <FavoriteItemCard
                        {...item}
                        ToggleFavouriteItem={toggleToFavorites}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Text>FavoriesScreen</Text>
    </View>
  );
};

export default FavoriesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollInterView: {
    flex: 1,
    justifyContent: "space-between",
  },
  listItemContainer: {
    flex: 1,
  },
  favouriteContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
  },
});
