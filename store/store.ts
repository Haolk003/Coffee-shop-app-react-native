import { create } from "zustand";
import { produce } from "immer";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

/**
 * Creates a store with the specified initial state and actions.
 *
 * @param set - A function that allows modifying the store's state.
 * @param get - A function that allows accessing the store's state.
 * @returns An object representing the store with its state and actions.
 */

export const useStore = create(
  (set, get) => ({
    CoffeeList: CoffeeData,
    BeansList: BeansData,
    CartPrice: 0,
    FavoriesList: [],
    CartList: [],
    OrderHistoryList: [],
    addToCart: (cartItem: any) =>
      set(
        produce((state) => {
          const findProduct = state.CartList.find(
            (item: any) => item.id == cartItem.id
          );
          if (findProduct) {
            const findSize = findProduct.prices.find(
              (item: any) => item.size == cartItem.prices[0].size
            );
            if (findSize) {
              findSize.quantity++;
            } else {
              findProduct.prices.push(cartItem.prices[0]);
              findProduct.prices.sort((a: any, b: any) => {
                if (a.size > b.size) {
                  return -1;
                } else if (a.size < b.size) {
                  return 1;
                }
                return 0;
              });
            }
          } else {
            state.CartList.push(cartItem);
          }
          state.CartPrice += Number(cartItem.prices[0].price);
        })
      ),
    addToFavoriteList: (type: string, id: string) =>
      set(
        produce((state) => {
          if (type == "Coffee") {
            const findFavoriteList = state.CoffeeList.find(
              (item: any) => item.id === id
            );
            if (findFavoriteList?.favourite === false) {
              findFavoriteList.favourite = true;
              state.FavoriesList.unshift(findFavoriteList);
            } else {
              findFavoriteList.favourite = false;
            }
          } else if (type === "Bean") {
            const findBeanList = state.BeansList.find(
              (item: any) => item.id == id
            );
            if (!findBeanList?.favourite) {
              findBeanList.favourite = true;
              state.FavoriesList.unshift(findBeanList);
            } else {
              findBeanList.favourite = false;
            }
          }
        })
      ),
    deleteFromFavoriteList: (type: string, id: string) =>
      set(
        produce((state) => {
          if (type === "Coffee") {
            const findCoffeeList = state.CoffeeList.find(
              (item: any) => item.id === id
            );
            if (findCoffeeList) {
              findCoffeeList.favourite = false;
            }
          } else if (type === "Bean") {
            const findBeanList = state.BeansList.find(
              (item: any) => item.id == id
            );
            if (findBeanList) {
              findBeanList.favourite = false;
            }
          }
          state.FavoriesList = state.FavoriesList.filter(
            (item: any) => item.id !== id
          );
        })
      ),
    incrementCartItemQuanlity: (id: string, size: string) =>
      set(
        produce((state) => {
          const findCartList = state.CartList.find(
            (item: any) => item.id === id
          );
          if (findCartList) {
            const findSize = findCartList.prices.find(
              (item: any) => item.size == size
            );
            if (findSize) {
              findSize.quantity++;
            }
          }
        })
      ),
    decrementCartItemQuantity: (id: string, size: string) =>
      set(
        produce((state) => {
          const findCartListIndex = state.CartList.findIndex(
            (item: any) => item.id === id
          );
          if (findCartListIndex !== -1) {
            const findSizeIndex = state.CartList[
              findCartListIndex
            ].prices.findIndex((item: any) => item.size == size);
            if (findSizeIndex !== -1) {
              const findSize =
                state.CartList[findCartListIndex].prices[findSizeIndex];
              if (findSize.quantity > 1) {
                findSize.quantity--;
              } else {
                if (state.CartList[findCartListIndex].prices.length > 1) {
                  state.CartList[findCartListIndex].prices.splice(
                    findSizeIndex,
                    1
                  );
                } else {
                  state.CartList.splice(findCartListIndex, 1);
                }
              }
            }
          }
        })
      ),
    addTOOrderHistoryListFromCart: () =>
      set(
        produce((state) => {
          state.OrderHistoryList.unshift({
            orderDate: new Date(),
            orderList: state.CartList,
            totalPrice: state.CartPrice,
          });
          state.CartList = [];
          state.CartPrice = 0;
        })
      ),
  })
  //     {
  //       name: "coffee-app",
  //       storage: createJSONStorage(() => AsyncStorage),
  //     }
  //   )
);
