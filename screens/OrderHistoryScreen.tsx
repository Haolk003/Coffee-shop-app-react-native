import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../store/store";
import EmptyListAnimation from "../components/EmptyListAnimation";
import OrderHistoryCard from "../components/OrderHistoryCard";
import PoppupAnimation from "../components/PoppupAnimation";

const OrderHistoryScreen = ({ navigation }: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabHeight = useBottomTabBarHeight();

  const [showAnimation, setShowAnimation] = React.useState(false);

  const navigationHander = ({
    index,
    id,
    type,
  }: {
    index: number;
    id: number;
    type: string;
  }) => {
    navigation.push("Details", {
      index,
      id,
      type,
    });
  };
  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation && (
        <PoppupAnimation
          style={styles.lottieAnimation}
          source={require("../lottie/download.json")}
        ></PoppupAnimation>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewFlex}
      >
        <View style={[styles.itemContainer, { marginBottom: tabHeight }]}>
          <HeaderBar title="Order History" />
          {OrderHistoryList.length === 0 ? (
            <EmptyListAnimation title="No Order History" />
          ) : (
            <View style={styles.listItemContainer}>
              {OrderHistoryList.map((item: any, index: number) => (
                <OrderHistoryCard
                  {...item}
                  key={index}
                  navigationHandler={navigationHander}
                />
              ))}
            </View>
          )}
          {OrderHistoryList.length > 0 && (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={buttonPressHandler}
            >
              <Text style={styles.buttonText}>Download Receipt</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottieAnimation: {
    height: 250,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollInterView: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_30,
    gap: SPACING.space_30,
  },
  downloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
