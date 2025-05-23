import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | ThreadZone",
  description: "Log in to your ThreadZone account",
};

export default function LoginPage() {
  return <div className="container-custom max-w-md py-12">{<LoginForm />}</div>;
}
