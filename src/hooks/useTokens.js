
    //сохранение токинов
    export const setToken = (accessToken) => localStorage.setItem("accessToken", accessToken);
    //получение токинов
    export const getToken = () => localStorage.getItem("accessToken");
    //очистка токина
    export const resetToken = () => localStorage.setItem("accessToken", null);

    //сохранение токина
    export const setRefreshToken = (refreshToken) => localStorage.setItem("refreshToken", refreshToken);
    //получение токина
    export const getRefreshToken = () => localStorage.getItem("refreshToken");
    //очистка токина
    export const resetRefreshToken = () => localStorage.setItem("refreshToken", null);