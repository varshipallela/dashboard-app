import React, {
  useState,
  useEffect,
  ReactElement,
  ReactNode,
  CSSProperties,
} from "react";

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
};

type DialogCloseProps = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

type DialogTriggerProps = {
  children: ReactElement;
  onClick?: (e: React.MouseEvent) => void;
};

type DialogContentProps = {
  children: ReactNode;
};

export const Dialog = ({ onOpenChange, children, ...props }: DialogProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!props.open);
  }, [props.open]);

  function handleOpenChange(open: boolean) {
    setOpen(open);
    if (onOpenChange) onOpenChange(open);
  }

  const overlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    opacity: open ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  const contentStyle: CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
    maxWidth: "500px",
    width: "100%",
    transform: open ? "scale(1)" : "scale(0.9)",
    opacity: open ? 1 : 0,
    transition: "opacity 0.3s ease, transform 0.3s ease",
    animation: open ? "fadeInScale 0.3s ease forwards" : "",
  };

  const renderTrigger = (): ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (typeof child.type !== "string" && child.type === Dialog.Trigger) {
          return React.cloneElement(child as ReactElement<any>, {
            onClick: () => handleOpenChange(true),
          });
        }
      }
      return null;
    });
  };

  const renderContent = (): ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (typeof child.type !== "string" && child.type === Dialog.Content) {
          return React.cloneElement(child as ReactElement<any>);
        }
        if (typeof child.type !== "string" && child.type === Dialog.Close) {
          return React.cloneElement(child as ReactElement<any>, {
            onClick: () => handleOpenChange(false),
          });
        }
      }
      return null;
    });
  };

  return (
    <>
      {renderTrigger()}
      {open && (
        <div style={overlayStyle} onClick={() => handleOpenChange(false)}>
          <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

const DialogClose = ({
  children,
  onClick,
}: DialogCloseProps & { style?: CSSProperties }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick(e);
  };

  return React.cloneElement(children as ReactElement<any>, {
    onClick: handleClick,
  });
};

const DialogTrigger = ({
  children,
  onClick,
}: DialogCloseProps & { style?: CSSProperties }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick(e);
  };

  return React.cloneElement(children as ReactElement<any>, {
    onClick: handleClick,
  });
};

const DialogContent = ({ children }: DialogContentProps) => {
  return <>{children}</>;
};

Dialog.Close = DialogClose;
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
