import { useState, useLayoutEffect, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Product, ShippingInfo, User } from "../helpers/types";
import { CheckoutContext } from "../context/CheckoutContext";
import { FieldValues } from "react-hook-form";

export const useAdjustedScreenHeight = () => {
  const [adjustedHeight, setAdjustedHeight] = useState<number>(0);
  const [navHeight, setNavHeight] = useState<number>(0);
  const navbar = document.getElementById("navbar");

  const updateAdjustedHeight = () => {
    setNavHeight(navbar ? navbar.offsetHeight : 0);
  };

  useLayoutEffect(() => {
    updateAdjustedHeight();
    window.addEventListener("resize", updateAdjustedHeight);

    return () => {
      window.removeEventListener("resize", updateAdjustedHeight);
    };
  }, []);

  useLayoutEffect(() => {
    setAdjustedHeight(window.innerHeight - navHeight);
  }, [navHeight]);

  return [adjustedHeight, navHeight];
};

export const useCurrentPage = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useCurrentPage must be used within a AppProvider");
  }

  const { currentPage, setCurrentPage } = context;

  return { currentPage, setCurrentPage };
};

export const useUsers = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useUser must be used within a AppProvider");
  }

  const { users, setUsers, loggedInUser, setLoggedInUser } = context;

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const login = (email: string, password: string) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setLoggedInUser(user);
    }
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return { users, loggedInUser, addUser, login, logout };
};

export const useCart = () => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("useCart must be used within a AppProvider");
  }

  const { cart, setCart } = appContext;

  const addItem = (item: Product) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setQuantity(item.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const setQuantity = (itemId: string, quantity: number) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: quantity } : cartItem
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((cartItem) => cartItem.id !== itemId));
  };

  useEffect(() => {
    cart.map((cartItem) => {
      if (cartItem.quantity === 0) {
        removeFromCart(cartItem.id);
      }
    });

    setTotalQuantity(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cart]);

  return {
    cart,
    addItem,
    setQuantity,
    removeFromCart,
    totalQuantity,
  };
};

export const useCheckout = () => {
  const appContext = useContext(AppContext);
  const checkoutContext = useContext(CheckoutContext);

  if (!appContext && !checkoutContext) {
    throw new Error(
      "useCheckout must be used within a CheckoutProvider and AppProvider"
    );
  }

  const { discount, setDiscount, shipping, setShipping } = checkoutContext;

  const { cart } = appContext;

  const discountCodes = [
    {
      code: "10OFF",
      discount: 10,
    },
    {
      code: "20OFF",
      discount: 20,
    },
  ];

  const applyDiscount = (discountCode: string) => {
    const code = discountCodes.find(
      (discount) => discount.code === discountCode
    );
    if (code) {
      setDiscount(code.discount);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + +item.price.replace(/[$]/g, "") * item.quantity,
    0
  );

  let total = subtotal - discount + shipping;
  if (total < 0) {
    total = 0;
  }
  const totalPrice = total.toFixed(2);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return {
    subtotal,
    shipping,
    discount,
    totalPrice,
    totalQuantity,
    applyDiscount,
  };
};

export const useFormStep = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useFormStep must be used within a AppProvider");
  }

  const { formStep, setFormStep } = context;

  const incrementFormStep = () => setFormStep(formStep + 1);
  const decrementFormStep = () => setFormStep(formStep - 1);

  return { formStep, setFormStep, incrementFormStep, decrementFormStep };
};

export const useShippingForm = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useShippingForm must be used within a AppProvider");
  }

  const { shippingInfo, setShippingInfo } = context;

  const updateShippingInfo = (shippingForm: FieldValues) => {
    const {
      addressTitle,
      address,
      fullName,
      cellPhone,
      city,
      state,
      postalCode,
      country,
      telephone,
      selectedShipping,
    } = shippingForm;
    console.log(shippingForm);
    setShippingInfo({
      addressTitle,
      address,
      fullName,
      cellPhone,
      city,
      state,
      postalCode,
      country,
      telephone,
      selectedShipping,
    });
  };

  return { shippingInfo, updateShippingInfo };
};
