/* eslint-disable no-unused-vars */
import { getProductsreducer } from "./productReducers.js";
import { combineReducers } from "redux"

export const rootReducers = combineReducers
    ({
        getProductsData: getProductsreducer
    })
