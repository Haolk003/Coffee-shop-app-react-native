import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
import OrderItemCard from "./OrderItemCard";

type Props = {
  navigationHandler: ({
    id,
    type,
    index,
  }: {
    id: string;
    type: string;
    index: string;
  }) => void;
  orderList: any;
  totalPrice: string;
  orderDate: any;
};
function formatDate(date: Date) {
  const day = date.getDate();
  let daySuffix;

  if (day > 3 && day < 21) daySuffix = "th";
  else
    switch (day % 10) {
      case 1:
        daySuffix = "st";
        break;
      case 2:
        daySuffix = "nd";
        break;
      case 3:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
        break;
    }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}${daySuffix} ${monthName} ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}
const OrderHistoryCard: React.FC<Props> = ({
  orderDate,
  orderList,
  totalPrice,
  navigationHandler,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.headerTitle}>Order Date</Text>
          <Text style={styles.headerSubtitle}>{formatDate(orderDate)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headerTitle}>Total Amount</Text>
          <Text style={styles.headerPrice}>
            $ {Number(totalPrice).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {orderList.map((item: any, index: number) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigationHandler({ ...item })}
          >
            <OrderItemCard {...item} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  priceContainer: {
    alignItems: "flex-end",
    gap: 5,
  },
  dateContainer: {
    gap: 5,
  },

  headerPrice: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  listContainer: {
    gap: SPACING.space_10,
  },
});
