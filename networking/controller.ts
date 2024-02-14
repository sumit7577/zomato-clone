import { DummyClient, ProductionClient } from "./index";
import { RecipesType } from "./types";


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

export { getRecipes, getTodos }