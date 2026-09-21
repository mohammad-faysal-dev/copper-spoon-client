const API_URL = process.env.API_URL;
console.log("API_URL:", API_URL);
export const menuService = {
  getMenus: async function () {
    try {
      const url = new URL(`${API_URL}/meals`);
      const res = await fetch(url.toString());
      console.log("Status:", res.status);
      console.log("Status Text:", res.statusText);
      if (!res.ok) {
        throw new Error("Failed to fetch menus");
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Failed to fetch " } };
    }
  },
};
