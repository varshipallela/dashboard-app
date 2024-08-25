export function Card({
  children,
  title,
  subTitle,
  isGraph,
  onClick,
}: {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  isGraph?: boolean;
  onClick?: () => void;
}) {
  function renderChildren() {
    if (!isGraph) return children;
    return (
      <>
        <h4>{title}</h4>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {children}
        </div>
      </>
    );
  }
  return (
    <div
      className="chart-container"
      style={{
        height: "350px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {renderChildren()}
    </div>
  );
}
