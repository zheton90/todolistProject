import { ChangeEvent, useState } from "react";

type Props = {
  title: string;
  onChange: (title: string) => void;
};

export const EditableSpan = ({ title, onChange }: Props) => {
  const [isEditeMode, setIsEditeMode] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState(title);

  const onEditeMode = () => {
    setIsEditeMode(true);
  };

  const offEditeMode = () => {
    setIsEditeMode(false);
    onChange(inputValue);
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <>
      {isEditeMode ? (
        <input
          value={inputValue}
          onChange={changeTitle}
          autoFocus
          onBlur={offEditeMode}
        />
      ) : (
        <span onDoubleClick={onEditeMode}>{title}</span>
      )}
    </>
  );
};
