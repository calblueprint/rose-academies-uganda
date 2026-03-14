import { loginWithEmailPassword } from "@/actions/login";
import LoginForm from "@/app/(auth)/components/LoginForm";

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    "use server";

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    await loginWithEmailPassword({ email, password });
  }

  return <LoginForm loginAction={loginAction} />;
}
