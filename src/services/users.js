import config from "../config";
import http from "../utils/https";

export const usersAPI = {
  fetch: async () => {
    try {
      const url = config.endpoints.users;
      const response = await http.get(url);
      return response.data.data;
    } catch (err) {
      return err;
    }
  },
};

