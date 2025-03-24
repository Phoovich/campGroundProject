// utils/auth.ts or similar
export async function registerUser(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const response = await fetch("https://swp2backenddinopark.vercel.app/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }
  
    return await response.json(); // maybe returns user or token
  }
  