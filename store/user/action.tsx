export enum UserAction {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    UPDATE = "UPDATE"
}

export const userLogin = (value: any) => {
    return async function (dispatch: (data: { type: UserAction, data: any }) => void) {
        dispatch({ type: UserAction.LOGIN, data: value });
    }
};