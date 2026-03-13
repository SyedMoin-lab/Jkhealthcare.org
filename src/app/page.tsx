export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔧 Under Maintenance</h1>
      <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "400px" }}>
        We're currently working on something awesome. Please check back soon!
      </p>
    </div>
  );
}
