export const logoutUser = () => {
    localStorage.removeItem("user"); // Clear stored user data
    window.location.href = "/login"; // Redirect to login page
  };
  