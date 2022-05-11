import React from "react";
import { CartItemType, CartContextType } from "../Types";

export const CartContext = React.createContext<CartContextType | null>(null);

//Types
//This is one way of fixing the error (Property 'children' does not exist on type 'ReactNode’)
type Props = {
	children?: React.ReactNode;
};

const ContextProvider: React.FC<Props> = ({ children }) => {
	const [cartItems, setCartItems] = React.useState([] as CartItemType[]); //Functional component allows us to use this hook

	//function to add items to the cart
	const handleAddToCart = (clickedItem: CartItemType) => {
		setCartItems((prev) => {
			//Checks if item already been added to the cart
			const isItemInCart = prev.find(
				(item) => item.id === clickedItem.id
			);

			//add one to the quantity if the item was found in the cart
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

	//Function to remove items from the cart
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
