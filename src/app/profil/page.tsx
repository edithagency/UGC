import { redirect } from "next/navigation";

// Alias vers /compte (même page)
export default function ProfilRedirect() {
  redirect("/compte");
}
