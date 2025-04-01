import router from "@/router";
import type { User, LoginData, RegistrationForm } from "@/types/Auth";
import api from "@/utils/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const authStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoggedIn = ref<boolean>(false);
  const register = async (payload: RegistrationForm) => {
    try {
      await api.get("/sanctum/csrf-cookie", {
        baseURL: "http://localhost:8000",
      });
      const response = await api.post("/register", payload);

      router.push("/dashboard");
      console.log(response.data);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (authData: LoginData) => {
    try {
      await api.get("/sanctum/csrf-cookie", {
        baseURL: "http://localhost:8000",
      });
      const { data } = await api.post("/login", authData);
      user.value = data;
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };
  const logout = async () => {
    try {
      await api.post("/logout");
      user.value = null;
      isLoggedIn.value = false;
      router.push("/");
    } catch (error) {}
  };
  const getUser = async () => {
    try {
      const { data } = await api.get("/user");
      console.log(data);
      user.value = data;
      isLoggedIn.value = true;
    } catch (error) {
      isLoggedIn.value = false;

      console.log(error);
    }
  };

  return {
    user,
    isLoggedIn,
    register,
    handleLogin,
    getUser,
    logout,
  };
});
