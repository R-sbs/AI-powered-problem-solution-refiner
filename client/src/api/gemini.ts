import { API } from "./apiConfig";

export const improveText = async (
  text: string,
  type: "problem" | "solution",
  perspective: string
): Promise<string> => {
  try {
    const res = await API.post(`/refine`, {
      text,
      type,
      perspective,
    });
    return res.data.improved;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "API call failed");
  }
};
