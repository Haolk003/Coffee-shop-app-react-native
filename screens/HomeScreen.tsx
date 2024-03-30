import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ToastAndroid,
  Alert,
  Platform,
} from "react-native";
import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import Icon from "react-native-vector-icons/AntDesign";
import CoffeeCard from "../components/CoffeeCard";

const getCategoriesFromData = (data: any) => {
  let temp = {} as any;

  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;

    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == "All") {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name === category);
    return coffeelist;
  }
};
const HomeScreen = ({ navigation }: any) => {
  const listRef = useRef<FlatList<any>>();
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeansList);
  const addToCart = useStore((state: any) => state.addToCart);
  const [categories, setCategories] = useState<string[]>(
    getCategoriesFromData(CoffeeList)
  );
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );

  const tabBarHeight = useBottomTabBarHeight();

  const resetSearchCoffee = () => {
    setSearchText("");
    listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...CoffeeList]);
  };

  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
    if (value !== "") {
      listRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        ),
      ]);
    }
  };

  const addToCartHandler = (data: any) => {
    addToCart({
      ...data,
      prices: [{ ...data.price, quantity: 1 }],
    });
    Platform.OS === "ios"
      ? Alert.alert("Added to Cart")
      : ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
  };
  return (
    <View style={styles.homeContainer}>
      <ScrollView>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <HeaderBar title="Home" />
        <Text style={styles.titleHeading}>Find the best coffee for you</Text>
        <View style={styles.searchHomeScreen}>
          <Icon name="search1" color={COLORS.primaryLightGreyHex} size={18} />

          <TextInput
            placeholder="Find Your Coffee"
            style={styles.textInputContainer}
            value={searchText}
            onChangeText={handleChangeSearchText}
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={resetSearchCoffee}>
              <Icon name="close" color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
          )}
        </View>
        {/* Category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          {categories &&
            categories.map((category, index: number) => {
              return (
                <View key={index} style={styles.categoryViewContainer}>
                  <TouchableOpacity
                    style={styles.categoryViewItem}
                    onPress={() => {
                      listRef.current?.scrollToOffset({
                        animated: true,
                        offset: 0,
                      }),
                        setCategoryIndex({
                          index: index,
                          category: categories[index],
                        });
                      setSortedCoffee([
                        ...getCoffeeList(categories[index], CoffeeList),
                      ]);
                    }}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        categoryIndex.index === index
                          ? { color: COLORS.primaryOrangeHex }
                          : null,
                      ]}
                    >
                      {category}
                    </Text>
                    {categoryIndex.index == index && (
                      <View style={styles.activeCategory}></View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
        {/* Coffee Flatlist */}
        <FlatList
          ref={listRef}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyText}>No Coffee Available</Text>
            </View>
          )}
          data={sortedCoffee}
          horizontal
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push("Details", {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }
            >
              <CoffeeCard
                {...item}
                price={item.prices[1]}
                buttonPressHandler={addToCartHandler}
              />
            </TouchableOpacity>
          )}
        />
        <Text style={styles.coffeeBeanTitle}>Coffee Beans</Text>

        {/* Beans Flatlist */}
        <FlatList
          horizontal
          data={BeanList}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.push("Details", {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }
            >
              <CoffeeCard
                {...item}
                price={item.prices[1]}
                buttonPressHandler={addToCartHandler}
              />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.flatlistContainer]}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingBottom: 70,
  },

  titleHeading: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 2,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  searchHomeScreen: {
    alignItems: "center",
    flexDirection: "row",
    rowGap: 5,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: 10,
    height: SPACING.space_20 * 2,
    margin: SPACING.space_20,
    gap: 7,
    paddingHorizontal: 7,
  },
  searchInput: {
    backgroundColor: "transparent",
    flex: 1,
    color: COLORS.primaryLightGreyHex,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryViewItem: {
    alignItems: "center",
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryGreyHex,
    marginBottom: 2,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatlistContainer: {
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  coffeeBeanTitle: {
    fontSize: FONTSIZE.size_20,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  emptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: SPACING.space_36 * 3.6,
  },
  emptyText: {
    color: COLORS.primaryLightGreyHex,
    fontSize: 25,
  },
});
