import { SxProps } from "@mui/material";

export const conteinerSx: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const getListItemsSx = (isDone: boolean): SxProps => ({
  p: "0",
  justifyContent: "space-between",
  opacity: isDone ? 0.5 : 1,
});
