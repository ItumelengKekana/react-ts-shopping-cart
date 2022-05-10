import React, { useState } from "react";
import { useQuery } from "react-query";

import { Drawer, LinearProgress, Grid } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
//Styles
import { Wrapper, StyledButton } from "./App.styles";
//Types
import { CartItemType } from "./Types";
import { CartContextType } from "./Types";
//Functions
import { getProducts, getTotalItems } from "./HelperFunctions";
import { CartContext } from "./Context/Context";

const App = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const { data, isLoading, error } = useQuery<CartItemType[]>(
		"products",
		getProducts
	);
	const { cartItems, handleAddToCart, handleRemoveFromCart } =
		React.useContext(CartContext) as CartContextType;

	// console.log(data);

	if (isLoading) return <LinearProgress />;

	if (error) return <div>Something went wrong...</div>;

	return (
		<Wrapper>
			<Drawer
				anchor="right"
				open={cartOpen}
				onClose={() => setCartOpen(false)}
			>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
				/>
			</Drawer>
			<StyledButton onClick={() => setCartOpen(true)}>
				<Badge badgeContent={getTotalItems(cartItems)} color="error">
					<AddShoppingCart />
				</Badge>
			</StyledButton>
			<Grid container spacing={3}>
				{data?.map((item) => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={handleAddToCart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	);
};

export default App;
