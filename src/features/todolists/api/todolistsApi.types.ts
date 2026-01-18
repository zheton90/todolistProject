import { z } from "zod/v4";

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.number(),
});

export type Todolist = z.infer<typeof todolistSchema>;

export type _Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
