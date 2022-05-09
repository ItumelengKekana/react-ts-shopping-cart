import { CartItemType } from "../Types";

export const getProducts = async (): Promise<CartItemType[]> => {
	return await (await fetch("https://fakestoreapi.com/products")).json();
};

export const getTotalItems = (items: CartItemType[]) => {
	return items.reduce((acc: number, item) => acc + item.amount, 0);
};
