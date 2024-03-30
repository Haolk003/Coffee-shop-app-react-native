import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import GradientBGIcon from "../components/GradientBGIcon";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import PaymentMethod from "../components/PaymentMethod";
import PaymentFooter from "../components/PaymentFooter";
import { useStore } from "../store/store";
import PoppupAnimation from "../components/PoppupAnimation";
const PaymentList = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Google Pay",
    icon: require("../assets/app_images/gpay.png"),
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: require("../assets/app_images/applepay.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("../assets/app_images/amazonpay.png"),
    isIcon: false,
  },
];
const PaymentScreen = ({ navigation, route }) => {
  const addTOOrderHistoryListFromCart = useStore(
    (state: any) => state.addTOOrderHistoryListFromCart
  );
  const [paymentMethod, setPaymentMethod] = React.useState("Wallet");
  const [showAnimation, setShowAnimation] = React.useState(false);
  const buttonPressHandler = () => {
    setShowAnimation(true);
    addTOOrderHistoryListFromCart();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate("History");
    }, 2000);
  };
  return (
    <View style={styles.paymentContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation && (
        <PoppupAnimation
          source={require("../lottie/successful.json")}
          style={styles.lottieAnimationContainer}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={[styles.scrollViewInnerView, { marginBottom: 80 }]}>
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: COLORS.primaryWhiteHex,
                fontSize: 22,
                fontWeight: "500",
              }}
            >
              Payment
            </Text>
            <View style={styles.emptyView}></View>
          </View>
          <View style={styles.paymentOptionContainer}>
            <TouchableOpacity onPress={() => setPaymentMethod("Credit")}>
              <View
                style={[
                  styles.creditCardContainer,
                  {
                    borderColor:
                      paymentMethod === "Credit"
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryGreyHex,
                  },
                ]}
              >
                <Text
                  style={{
                    color: COLORS.primaryLightGreyHex,
                    fontSize: 20,
                    marginBottom: 10,
                    fontWeight: "500",
                  }}
                >
                  Credit Card
                </Text>

                <View>
                  <LinearGradient
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.creditCardBgContainer}
                  >
                    <View style={styles.creditCardHeader}>
                      <Image source={require("../assets/Vector.png")} />
                      <Icon
                        name="cc-visa"
                        color={COLORS.primaryWhiteHex}
                        size={30}
                      />
                    </View>
                    <View style={styles.creditCardNumberContainer}>
                      <Text style={styles.crediditCardNumber}>3897</Text>
                      <Text style={styles.crediditCardNumber}>3897</Text>
                      <Text style={styles.crediditCardNumber}>3897</Text>
                      <Text style={styles.crediditCardNumber}>3897</Text>
                    </View>
                    <View style={styles.cardFooterContainer}>
                      <View>
                        <Text style={{ color: COLORS.secondaryLightGreyHex }}>
                          Card Holder Name
                        </Text>
                        <Text
                          style={{
                            color: COLORS.primaryLightGreyHex,
                            fontWeight: "500",
                            fontSize: 22,
                          }}
                        >
                          Robert Evans
                        </Text>
                      </View>
                      <View>
                        <Text style={{ color: COLORS.secondaryLightGreyHex }}>
                          Expiry Date
                        </Text>
                        <Text
                          style={{
                            color: COLORS.primaryLightGreyHex,
                            fontWeight: "500",
                            fontSize: 22,
                          }}
                        >
                          12/25
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </TouchableOpacity>
            {PaymentList.map((item, index) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => setPaymentMethod(item.name)}
              >
                <PaymentMethod
                  icon={item.icon}
                  isIcon={item.isIcon}
                  name={item.name}
                  paymentMethod={paymentMethod}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <PaymentFooter
        buttonPressHandler={() => buttonPressHandler()}
        buttonText={`Pay with ${paymentMethod}`}
        price={{ price: route.params.amount, currency: "$" }}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  paymentContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  paymentHeaderBar: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
  },
  emptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  paymentOptionContainer: {
    padding: 20,
    gap: 10,
  },
  creditCardContainer: {
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.primaryGreyHex,
  },

  creditCardBgContainer: {
    height: 230,
    padding: 10,
    gap: 10,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  creditCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  creditCardNumberContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  crediditCardNumber: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
    letterSpacing: 6,
    fontWeight: "bold",
  },
  cardFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lottieAnimationContainer: {
    flex: 1,
  },
});
