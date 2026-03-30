import  type { createContext, useState, useEffect, ReactNode } from "react";

interface Game {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Game {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
}


export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  clearCart: () => {},
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (game: Game) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === game.id);
      if (existing) {
        return prev.map((item) =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...game, quantity: 1 }];
    });
  };


  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };


  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};