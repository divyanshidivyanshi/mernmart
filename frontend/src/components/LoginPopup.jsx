const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // CLEAN FIX: Use relative paths so Axios maps them to your App.jsx global production baseURL
      const endpoint =
        currentState === "Sign Up"
          ? "/api/auth/register"
          : "/api/auth/login";

      const payload =
        currentState === "Sign Up"
          ? { name, email, password }
          : { email, password };

      // Fires cleanly to your live Vercel backend address now
      const { data } = await axios.post(endpoint, payload);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success(
        currentState === "Sign Up"
          ? "Registered Successfully"
          : "Login Successful"
      );

      setShowLogin(false);
      window.location.reload();
    } catch (error) {
      console.error("Popup Error details:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };