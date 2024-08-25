import { Widget as WidgetType } from "src/types/dashboard.t";
import { Dialog } from "./Dialog";
import { useState } from "react";
import { Card } from "./Card";
import { WidgetForm } from "./WidgetForm";
import { Chart } from "./Chart";
import { ChartType } from "chart.js";

export interface WidgetProps {
  widget: WidgetType;
  type: ChartType;
  onUpdateWidget: (widget: WidgetType) => void;
  onRemoveWidget: (widgetId: string) => void;
}
export function Widget({
  type,
  widget,
  onRemoveWidget,
  onUpdateWidget,
}: WidgetProps) {
  const [open, setOpen] = useState(false);

  function handleUpdateWidget(widget: WidgetType) {
    onUpdateWidget(widget);
    setOpen(false);
  }

  function handleRemoveWidget() {
    onRemoveWidget(widget.id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Card title={widget.title} isGraph>
          <Chart widget={widget} type={type} />
        </Card>
      </Dialog.Trigger>
      <Dialog.Content>
        <WidgetForm
          widget={widget}
          onSave={handleUpdateWidget}
          onRemove={handleRemoveWidget}
        />
      </Dialog.Content>
    </Dialog>
  );
}
