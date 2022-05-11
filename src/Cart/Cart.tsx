import CartItem from "../CartItem/CartItem";

import { Wrapper } from "./Cart.styles";

import { CartItemType } from "../Types";

type Props = {
	cartItems: CartItemType[];
	addToCart: (clickedItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
	//Function to calculate the total price of the cart
	const calculateTotal = (items: CartItemType[]) => {
		return items.reduce(
			(acc: number, item) => acc + item.amount * item.price,
			0
		);
	};

	return (
		//Check to see if there are any items in the cart and the display them
		<Wrapper>
			<h2>Your Shopping Cart:</h2>
			{cartItems.length === 0 ? <p>No items in cart.</p> : null}
			{cartItems.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			))}
			<h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
		</Wrapper>
	);
};

export default Cart;
