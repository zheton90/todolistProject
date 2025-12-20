import { ChangeEvent, KeyboardEvent, useState } from "react";

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
      <input
        className={error ? "error" : ""}
        value={inputTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={createTaskOnEnterHandler}
      />
      <button onClick={createTaskHandler}>+</button>
      {error && <p className={"errorMessage"}>{error}</p>}
    </div>
  );
};
