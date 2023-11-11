import { ApiUrl } from "@/config/Config";

class Api {
  public url = "";
  public auth = false;
  public type: "from" | "json" = "json";
  public token = "";
  public header: any = {};
  public body: any = {};

  public call = async () => {
    const url = ApiUrl + this.url;
    const headers = {
      ...this.header,
      "Content-Type":
        this.type === "json"
          ? "application/json"
          : "application/x-www-form-urlencoded",
    };

    if (this.auth && this.token) {
      headers["Authorization"] = "Bearer " + this.token;
      headers["Accept"] = "application/json";
    }
    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body:
        this.type === "json"
          ? JSON.stringify(this.body)
          : new URLSearchParams(this.body).toString(),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      return {
        meta: {
          code: 400,
          status: "Bad Request",
          message: "Bad Request",
        },
        data: error,
      };
    }
  };
}

export default Api;
