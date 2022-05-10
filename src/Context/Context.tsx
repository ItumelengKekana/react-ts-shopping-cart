import React from "react";
import { CartItemType, CartContextType } from "../Types";

export const CartContext = React.createContext<CartContextType | null>(null);

type Props = {
	children?: React.ReactNode;
};

const ContextProvider: React.FC<Props> = ({ children }) => {
	const [cartItems, setCartItems] = React.useState([] as CartItemType[]);

	const handleAddToCart = (clickedItem: CartItemType) => {
		setCartItems((prev) => {
			//Has the item already been added to the cart?
			const isItemInCart = prev.find(
				(item) => item.id === clickedItem.id
			);

			if (isItemInCart) {
				return prev.map((item) =>
					item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
			}
			//The first time the item is added (not item in the cart)
			return [...prev, { ...clickedItem, amount: 1 }];
		});
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems((prev) =>
			prev.reduce((acc, item) => {
				if (item.id === id) {
					if (item.amount === 1) return acc;
					return [...acc, { ...item, amount: item.amount - 1 }];
				} else {
					return [...acc, item];
				}
			}, [] as CartItemType[])
		);
	};

	return (
		<CartContext.Provider
			value={{ cartItems, handleAddToCart, handleRemoveFromCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default ContextProvider;
