export const setToken = (res: any) => {
  localStorage.setItem(
    "accessToken",
    res.headers.authorization.split(" ")[1]
  )
};