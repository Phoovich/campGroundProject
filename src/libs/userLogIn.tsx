export default async function userLogIn(
  userEmail: string,
  userPassword: string,
) {
  const response = await fetch(
    `https://swp-2-backend.vercel.app/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    },
  );
  console.log(response.status);
  if (!response.ok) {
    throw new Error("Failed to fetch campgrounds");
  }
  return await response.json();
}

