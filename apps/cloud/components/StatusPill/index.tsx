import { Dot, Pill } from "./styles";

export default function StatusPill({
  status,
}: {
  status: "available" | "pending";
}) {
  const label = status === "available" ? "Available Offline" : "Pending Sync";

  return (
    <Pill $status={status}>
      <Dot $status={status} />
      {label}
    </Pill>
  );
}
