"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignInButton() {
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Sign in error:", error.message);
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
}
