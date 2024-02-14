import axios, { Axios } from "axios";


const DummyClient = axios.create({
    baseURL:"https://dummyjson.com/"
})

const ProductionClient = axios.create({
    baseURL:"https://google.com/"
})

export {DummyClient,ProductionClient};