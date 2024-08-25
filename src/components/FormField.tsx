import React from "react";

interface FormFieldProps {
  keyName: string;
  value: number;
  onKeyChange: (e: React.ChangeEvent<HTMLInputElement>, oldKey: string) => void;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  onRemove: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function FormField({
  keyName,
  value,
  onKeyChange,
  onValueChange,
  onRemove,
  inputRef,
}: FormFieldProps) {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "10px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={keyName}
        onChange={(e) => onKeyChange(e, keyName)}
        ref={inputRef}
        style={{
          flex: 1,
          padding: "8px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(e, keyName)}
        style={{
          flex: 1,
          padding: "8px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="button"
        onClick={onRemove}
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Remove
      </button>
    </div>
  );
}
