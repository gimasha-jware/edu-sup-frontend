import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export async function loginWithGoogle() {
  try {
    // 1) Firebase popup
    const result = await signInWithPopup(auth, googleProvider);

    // 2) Get Firebase ID token
    const idToken = await result.user.getIdToken();

    // 3) Send token to backend
    const res = await axios.post("/api/auth/firebase", { idToken });

    // 4) Store your app JWT for future API calls
    localStorage.setItem("token", res.data.access_token);

    // 5) Return safe user info
    return {
      id: res.data.user.id,
      email: res.data.user.email,
      name: res.data.user.first_name
        ? `${res.data.user.first_name} ${res.data.user.last_name || ""}`
        : result.user.displayName || "", // fallback if backend didn’t return
      photo: result.user.photoURL || "",
    };
  } catch (error: any) {
    console.error("Google login failed", error);
    throw new Error("Google Login Failed: " + (error.message || ""));
  }
}
