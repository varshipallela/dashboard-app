import React, { useState, useRef, useEffect } from "react";
import { Widget as WidgetType } from "src/types/dashboard.t";
import { FormField } from "./FormField";

export interface WidgetFormProps {
  onSave?: (widget: WidgetType) => void;
  onRemove?: () => void;
  widget?: WidgetType;
}

export function WidgetForm({ onSave, widget, onRemove }: WidgetFormProps) {
  const [formData, setFormData] = useState<Partial<WidgetType>>(widget || {});
  const [keysOrder, setKeysOrder] = useState<string[]>(
    Object.keys(widget?.data || {})
  );
  const keyInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setKeysOrder(Object.keys(formData.data || {}));
  }, [formData.data]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    const value = parseFloat(e.target.value);
    setFormData({
      ...formData,
      data: { ...formData.data, [key]: isNaN(value) ? 0 : value },
    });
  }

  function handleKeyChange(
    e: React.ChangeEvent<HTMLInputElement>,
    oldKey: string
  ) {
    const newKey = e.target.value;
    if (newKey && !formData.data?.hasOwnProperty(newKey)) {
      const newFormData = { ...formData };
      if (newFormData.data) {
        newFormData.data[newKey] = newFormData.data[oldKey];
        delete newFormData.data[oldKey];
      }
      const newKeysOrder = keysOrder.map((key) =>
        key === oldKey ? newKey : key
      );
      setKeysOrder(newKeysOrder);
      setFormData(newFormData);
      setTimeout(() => {
        if (keyInputRef.current) {
          keyInputRef.current.focus();
          keyInputRef.current.selectionStart = newKey.length;
        }
      }, 0);
    }
  }

  function handleAddField() {
    const newKey = `key${Object.keys(formData.data || {}).length + 1}`;
    setFormData({
      ...formData,
      data: { ...formData.data, [newKey]: 0 },
    });
    setKeysOrder([...keysOrder, newKey]);
  }

  function handleRemoveField(key: string) {
    const newFormData = { ...formData };
    if (newFormData.data) {
      delete newFormData.data[key];
    }
    setFormData(newFormData);
    setKeysOrder(keysOrder.filter((k) => k !== key));
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, title: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSave) onSave(formData as WidgetType);
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="title"
          style={{
            display: "block",
            marginBottom: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
          required
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      {keysOrder.map((key) => (
        <FormField
          key={key}
          keyName={key}
          value={formData.data![key]}
          onKeyChange={handleKeyChange}
          onValueChange={handleInputChange}
          onRemove={() => handleRemoveField(key)}
          inputRef={keyInputRef}
        />
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        {widget && (
          <button
            type="submit"
            onClick={onRemove}
            style={{
              padding: "10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Delete
          </button>
        )}
        <div style={{ flex: 1 }}></div>
        <button
          type="button"
          onClick={handleAddField}
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Field
        </button>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
}
