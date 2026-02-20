import { signOut } from "@/actions/logout";

export default function LogoutButton() {
  async function logoutAction() {
    "use server";
    await signOut();
  }
  return (
    <form action={logoutAction}>
      <button type="submit">Logout</button>
    </form>
  );
}
