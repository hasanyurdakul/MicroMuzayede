import { signIn } from "next-auth/react";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/session"],
  pages: { signIn: "/api/auth/signin" },
};
