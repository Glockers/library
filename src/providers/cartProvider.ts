import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { useGetCartQuery, useGetMeQuery } from "../api/queries";
import {
  ICartResults,
  useCartMutation,
} from "../api/mutations/useCartMutation";
import { useAuthContext } from "./authProvider";

export type ICartContextResults = ReturnType<typeof useCartContext>;

interface ICartState {
  cartItems: Array<ICartResults>;
  isLoading: boolean;
}

const useCart = () => {
  const { isAuthorized, isLoading: isAuthLoading } = useAuthContext();
  const [state, setState] = useState<ICartState>({
    cartItems: [],
    isLoading: false,
  });
  const { data: cart, isLoading: isCartLoading } = useGetCartQuery({
    enabled: isAuthorized,
  });
  const { isLoading, add, remove } = useCartMutation();

  const resetCart = () => setState((prev) => ({ ...prev, cartItems: [] }));

  const addItem = (bookId: string) => {
    if (isAuthorized) {
      return add(
        { bookId },
        {
          onSuccess(data) {
            setState((prev) => ({
              ...prev,
              cartItems: [...prev.cartItems, { id: data.id, bookId }],
            }));
          },
        }
      );
    }
    setState((prev) => ({
      ...prev,
      cartItems: [...prev.cartItems, { id: bookId, bookId }],
    }));
  };

  const removeItem = (bookId: string) => {
    if (isAuthorized) {
      return remove(
        { bookId },
        {
          onSuccess(data) {
            setState((prev) => ({
              ...prev,
              cartItems: [...prev.cartItems].filter(
                (el) => el.bookId !== bookId
              ),
            }));
          },
        }
      );
    }
    setState((prev) => ({
      ...prev,
      cartItems: [...prev.cartItems].filter((el) => el.bookId !== bookId),
    }));
  };

  const hasInCart = (bookId: string) =>
    !!state.cartItems.find((el) => el.bookId === bookId);

  useEffect(() => {
    const items = localStorage.getItem("cart");
    if (items && items.length) {
      setState((prev) => ({
        ...prev,
        cartItems: [...prev.cartItems, ...JSON.parse(items).items].filter(
          (item, pos, arr) => {
            return arr.findIndex((el) => el.bookId === item.bookId) === pos;
          }
        ),
      }));
    }
  }, []);

  useEffect(() => {
    if (state.cartItems.length) {
      localStorage.setItem("cart", JSON.stringify({ items: state.cartItems }));
    } else {
      localStorage.removeItem("cart");
    }
  }, [state]);

  useEffect(() => {
    if (cart?.items) {
      setState((prev) => ({
        ...prev,
        cartItems: [...prev.cartItems, ...cart.items].filter(
          (item, pos, arr) => {
            return arr.findIndex((el) => el.bookId === item.bookId) === pos;
          }
        ),
      }));
    }
  }, [cart]);

  return {
    ...state,
    isLoading: state.isLoading || isLoading || isAuthLoading || isCartLoading,
    hasInCart,
    addItem,
    removeItem,
    resetCart,
  };
};

const CartContext = createContainer(useCart);

const useCartContext = CartContext.useContainer;
const CartContextProvider = CartContext.Provider;

export { useCartContext, CartContextProvider };
