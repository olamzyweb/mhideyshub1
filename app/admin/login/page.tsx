"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    if (res?.ok) {
      router.push("/admin");
      router.refresh();
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
        <Button className="mt-6 w-full" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}
