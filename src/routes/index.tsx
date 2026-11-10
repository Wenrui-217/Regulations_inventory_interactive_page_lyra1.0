import { createFileRoute } from "@tanstack/react-router";
import { RegApp } from "@/components/reg-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <RegApp />;
}
