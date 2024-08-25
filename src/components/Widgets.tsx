import React, { useState } from "react";
import { Widget as WidgetType } from "src/types/dashboard.t";
import { Card } from "./Card";
import { Dialog } from "./Dialog";
import { WidgetForm } from "./WidgetForm";
import { Widget } from "./Widget";
import { ChartType } from "chart.js";

export const Widgets = ({
  type,
  widgets,
  onAddWidget,
  onUpdateWidget,
  removeWidget,
}: {
  widgets: WidgetType[];
  type: ChartType;
  onAddWidget: (newWidget: WidgetType) => void;
  onUpdateWidget: (updatedWidget: WidgetType) => void;
  removeWidget: (widgetId: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleAddWidget = (widget: WidgetType) => {
    onAddWidget(widget);
    setOpen(false);
  };

  const handleUpdateWidget = (widget: WidgetType) => {
    onUpdateWidget(widget);
  };

  const handleRemoveWidget = (widgetId: string) => {
    removeWidget(widgetId);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "20px",
        width: "100%",
      }}
    >
      {widgets?.map((widget, i) => (
        <Widget
          key={i}
          type={type}
          widget={widget}
          onUpdateWidget={handleUpdateWidget}
          onRemoveWidget={handleRemoveWidget}
        />
      ))}
      <Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <button
              style={{
                padding: "5px 8px",
                backgroundColor: "rgba(128, 128, 128, 0.8)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add Widget
            </button>
          </Dialog.Trigger>
          <Dialog.Content>
            <WidgetForm onSave={handleAddWidget} />
          </Dialog.Content>
        </Dialog>
      </Card>
    </div>
  );
};
