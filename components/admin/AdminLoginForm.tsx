"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginForm({ error }: { error?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password
      });
      if (res?.ok) {
        router.push("/admin");
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-ink/10 bg-white p-8 shadow-soft">
        <h1 className="font-display text-2xl font-semibold text-ink">Admin login</h1>
        <p className="mt-2 text-sm text-ink/70">Enter your admin credentials.</p>
        {error && <p className="mt-4 text-sm text-rose-500">Invalid email or password.</p>}
        <div className="mt-6 space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <Button className="mt-6 w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  );
}
