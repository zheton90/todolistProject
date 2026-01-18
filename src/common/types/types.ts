import { z } from "zod/v4";

export type FieldError = {
  error: string;
  field: string;
};

export type BaseResponse<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
};

export const requestStatusValues = [
  "idle",
  "loading",
  "succeeded",
  "failed",
] as const;
export const requestStatusSchema = z.enum(requestStatusValues);

export type RequestStatus = z.infer<typeof requestStatusSchema>;
