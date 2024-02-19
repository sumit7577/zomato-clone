import { UserAction } from "./action";


const initialState = {
    userData: {},
    isLoggedIn: false

}

export const userReducer = (state = initialState, action: { type: UserAction, data: any }) => {
    switch (action.type) {
        case UserAction.LOGIN:
            return { ...state, isLoggedIn: action.data != undefined, userData: action.data }
        case UserAction.LOGOUT:
            return {
                ...state,
                userData: null,
                isLoggedIn: false,
            }
        default: {
            return initialState
        }
    }

}