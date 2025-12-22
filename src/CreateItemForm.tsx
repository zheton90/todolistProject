import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type Props = {
  createItem: (title: string) => void;
};

export const CreateItemForm = ({ createItem }: Props) => {
  const [inputTitle, setInputTitle] = useState("");
  const [error, setError] = useState("");

  const createTaskHandler = () => {
    const trimTitle = inputTitle.trim();
    if (trimTitle !== "") {
      createItem(inputTitle);
      setInputTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
    setError("");
  };

  const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTaskHandler();
    }
  };

  return (
    <div className="container">
      <TextField
        label={"Enter a title"}
        size="small"
        variant="outlined"
        color="primary"
        value={inputTitle}
        error={!!error}
        helperText={error}
        onChange={changeTaskTitleHandler}
        onKeyUp={createTaskOnEnterHandler}
      />

      <IconButton onClick={createTaskHandler} color="primary">
        <AddCircleIcon />
      </IconButton>
    </div>
  );
};
