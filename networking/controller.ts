import { DummyClient, ProductionClient } from "./index";
import { CartsType, RecipesType } from "./types";


const getRecipes = async (): Promise<RecipesType> => {
    const req = await DummyClient.get("recipes");
    const data = await req.data;
    return data

}

const getTodos = async () => {
    const req = await ProductionClient.get("todos");
    const data = await req.data;
    return data
}

export type addCartType = {
    userId: number, products: [{ id: number, quantity: number }]
}

const addCart = async (data: addCartType) => {
    const req = await DummyClient.post("carts/add", data);
    const resp = await req.data;
    return resp;
}

const getCart = async (userId: number):Promise<CartsType> => {
    const req = await DummyClient.get("carts/user/1");
    const resp = await req.data;
    return resp;
}

export { getRecipes, getTodos, addCart, getCart }