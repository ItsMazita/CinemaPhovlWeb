const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
const contenedor = document.getElementById("tickets");

if (!tickets.length) {
  contenedor.innerHTML = "<p>No hay tickets disponibles</p>";
}

tickets.forEach((t, i) => {
  const div = document.createElement("div");
  div.className = "ticket";

  div.innerHTML = `
    <h3>🎟️ Ticket #${i + 1}</h3>
    <div class="info"><strong>Función:</strong> ${t.id_funcion}</div>
    <div class="info"><strong>Asiento:</strong> ${t.id_asiento}</div>
    <div class="qr" id="qr-${i}"></div>
  `;

  contenedor.appendChild(div);

  new QRCode(document.getElementById(`qr-${i}`), {
    text: t.codigo_qr,
    width: 160,
    height: 160
  });
});

function volver() {
  window.location.href = "Pagina Principal.html";
}
