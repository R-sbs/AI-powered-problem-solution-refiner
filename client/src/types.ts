import z from "zod";

export interface RefinementState {
  problem: string;
  solution: string;
  perspective: "Investor" | "Market" | "Customer";
  improvedProblem: string;
  improvedSolution: string;
}

export const formSchema = z.object({
  perspective: z.string(),
  problem: z
    .string()
    .min(10, { message: "Problem statement must be at least 10 characters." })
    .max(1000, { message: "Problem statement cannot exceed 1000 characters." }),
  solution: z
    .string()
    .min(10, { message: "Solution statement must be at least 10 characters." })
    .max(1000, {
      message: "Solution statement cannot exceed 1000 characters.",
    }),
});

export type formDataType = z.infer<typeof formSchema>;
