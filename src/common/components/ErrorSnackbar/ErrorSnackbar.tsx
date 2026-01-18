import { SyntheticEvent } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectAppError, setAppErrorAC } from "@/app/app-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";

export const ErrorSnackbar = () => {
  // const [open, setOpen] = useState(true);

  const error = useAppSelector(selectAppError);
  const dispatch = useAppDispatch();

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setAppErrorAC({ error: null }));
    // setOpen(false);
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};
