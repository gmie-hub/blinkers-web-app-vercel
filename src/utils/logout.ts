export const logout = () => {
    localStorage.removeItem("blinkers-web&site#");
    window.location.href = "/"
}