export function getFullDate() {
  const today = new Date();
  const formatted = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted;
}
