export type CartItemType = {
	id: number;
	category: string;
	description: string;
	price: number;
	title: string;
	amount: number;
	image: string;
};

//Type definition for the context
export type CartContextType = {
	cartItems: CartItemType[];
	handleAddToCart: (clickedItem: CartItemType) => void;
	handleRemoveFromCart: (id: number) => void;
};
