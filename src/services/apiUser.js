export async function registerUser(data) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const user = await res.json();

    if (!res.ok) throw new Error(user.error.message);

    return user;
  } catch (error) {
    return { error: error.message };
  }
}
