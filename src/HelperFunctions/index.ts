import { CartItemType } from "../Types";

//Fetching data from fakestoreapi
export const getProducts = async (): Promise<CartItemType[]> => {
	return await (await fetch("https://fakestoreapi.com/products")).json();
};

//Getting the total amount of items in the cart
export const getTotalItems = (items: CartItemType[]) => {
	return items.reduce((acc: number, item) => acc + item.amount, 0);
};
