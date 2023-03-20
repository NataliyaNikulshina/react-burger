
    //сохранение токинов
    export const setToken = (accessToken: string | null) => localStorage.setItem("accessToken", accessToken || "");
    //получение токинов
    export const getToken = () => localStorage.getItem("accessToken");
    //очистка токина
    export const resetToken = () => localStorage.setItem("accessToken", "");

    //сохранение токина
    export const setRefreshToken = (refreshToken: string | null) => localStorage.setItem("refreshToken", refreshToken || "");
    //получение токина
    export const getRefreshToken = () => localStorage.getItem("refreshToken");
    //очистка токина
    export const resetRefreshToken = () => localStorage.setItem("refreshToken", "");