import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING } from "../theme/theme";
import { useStore } from "../store/store";
import HeaderBar from "../components/HeaderBar";
import CartItem from "../components/CartItem";
import PaymentFooter from "../components/PaymentFooter";
import EmptyListAnimation from "../components/EmptyListAnimation";

const CartScreen = ({ navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const cartList = useStore((state: any) => state.CartList);
  const totalPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuanlity = useStore(
    (state: any) => state.incrementCartItemQuanlity
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity
  );
  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuanlity(id, size);
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
  };
  const handlePressHandler = () => {
    navigation.push("Payment", { amount: totalPrice });
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <HeaderBar title="Cart" />
        <View style={[styles.scrollInterView, { marginBottom: tabBarHeight }]}>
          {cartList.length === 0 ? (
            <Text
              style={{
                color: COLORS.primaryWhiteHex,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <EmptyListAnimation title="Cart is Empty" />
            </Text>
          ) : (
            <View style={styles.listItemContainer}>
              {cartList.map((item: any, index: number) => (
                <CartItem
                  {...item}
                  key={item.id}
                  incrementCartItemQuantityHandler={
                    incrementCartItemQuantityHandler
                  }
                  decrementCartItemQuantityHandler={
                    decrementCartItemQuantityHandler
                  }
                />
              ))}
            </View>
          )}
          {cartList.length > 0 && (
            <PaymentFooter
              buttonText="Pay"
              price={{ price: totalPrice.toFixed(2), currency: "$" }}
              buttonPressHandler={handlePressHandler}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  listItemContainer: {
    gap: 20,
    paddingHorizontal: SPACING.space_20,
  },
  scrollInterView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
