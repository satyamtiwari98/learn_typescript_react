import axios, { Method } from "axios";

const ApiCall = async <T>(
  url: string,
  method: Method = "GET",
  queryParams?: string | Record<string, any>,
  body?: Record<string, any>
): Promise<T> => {
  try {
    const response = await axios.request<T>({
      url,
      method,
      params: queryParams,
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default ApiCall;
