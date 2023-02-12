
    //сохранение токинов
    export const setToken = (token) => localStorage.setItem("token", token);
    //получение токинов
    export const getToken = () => localStorage.getItem("token");
    //очистка токина
    export const resetToken = () => localStorage.setItem("token", null);

    //сохранение токина
    export const setRefreshToken = (acessToken) => localStorage.setItem("acessToken", acessToken);
    //получение токина
    export const getRefreshToken = () => localStorage.getItem("acessToken");
    //очистка токина
    export const resetRefreshToken = () => localStorage.setItem("acessToken", null);