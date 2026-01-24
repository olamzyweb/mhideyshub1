import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  return <AdminLoginForm error={searchParams?.error} />;
}
