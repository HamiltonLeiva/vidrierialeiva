import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import SecurityForm from "@/components/admin/SecurityForm";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/login");
  }
  return (
    <main className="bg-leiva-surface min-h-screen py-12">
      <div className="container mx-auto max-w-xl px-4">
        <SecurityForm />
      </div>
    </main>
  );
}
