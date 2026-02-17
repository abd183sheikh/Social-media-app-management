"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Loader2 } from "lucide-react";
import { Input } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    // Demo mode - just redirect to dashboard
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push("/dashboard");
  };

  return (
    <>
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
          <Users className="h-7 w-7 text-white" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Start managing your social media today
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />

          <Input
            label="Email address"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            helperText="Must be at least 6 characters"
          />

          <Input
            label="Confirm password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
}
