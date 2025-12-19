const msgBox = document.getElementById("welcomeBox");

async function handleRegister(e) {
  e.preventDefault();

  msgBox.innerHTML = "⏳ Registrando usuario...";

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    msgBox.innerHTML = "❌ Las contraseñas no coinciden";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msgBox.innerHTML = `❌ ${data.error || "Error al registrar"}`;
      return;
    }

    msgBox.innerHTML = "✅ Registro exitoso 🎉 Redirigiendo...";

    setTimeout(() => {
      window.location.href = "Index.html";
    }, 1500);

  } catch (error) {
    msgBox.innerHTML = "❌ No se pudo conectar con el servidor";
  }
}
