const API_URL = "https://cinema-phovl-api.onrender.com";

/* ===============================
   PRECIOS
================================ */

const precios = {
  ninos: 55,
  adultos: 85,
  estudiantes: 65,
  mayores: 60
};

const datos = JSON.parse(localStorage.getItem("boletos")) || {};

let total =
  (datos.ninos || 0) * precios.ninos +
  (datos.adultos || 0) * precios.adultos +
  (datos.estudiantes || 0) * precios.estudiantes +
  (datos.mayores || 0) * precios.mayores;

document.getElementById("total").textContent = `$${total} MXN`;

/* ===============================
   COMPRA REAL
================================ */

async function realizarCompra() {
  const id_funcion = localStorage.getItem("id_funcion");
  const id_usuario = localStorage.getItem("id_usuario");
  const asientos = JSON.parse(localStorage.getItem("asientosTemporal")) || [];

  if (!id_usuario) {
    alert("Debe iniciar sesión para continuar");
    return;
  }

  if (asientos.length === 0) {
    alert("No hay asientos seleccionados");
    return;
  }

  const res = await fetch(`${API_URL}/api/comprar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_funcion,
      id_asientos: asientos,
      id_usuario
    })
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.error || "Error al procesar la compra");
    return;
  }

  localStorage.removeItem("asientosTemporal");
  localStorage.removeItem("boletos");

  alert("🎉 Compra realizada con éxito");
  window.location.href = "Pagina Principal.html";
}

/* ===============================
   CONFIRMAR PAGO (NO PAYPAL)
================================ */

function confirmarPago() {
  const metodo = document.querySelector('input[name="pago"]:checked');

  if (!metodo) {
    alert("Seleccione un método de pago");
    return;
  }

  if (metodo.value === "Tarjeta") {
    alert("💳 Pago con tarjeta aprobado");
  }

  if (metodo.value === "Efectivo") {
    alert("💵 Pago en efectivo registrado");
  }

  if (metodo.value === "Transferencia") {
    alert("🏦 Transferencia registrada");
  }

  realizarCompra();
}

/* ===============================
   CANCELAR
================================ */

function cancelarCompra() {
  alert("❌ La compra ha sido cancelada.");
  localStorage.removeItem("asientosTemporal");
  window.location.href = "Pagina Principal.html";
}

/* ===============================
   PAYPAL
================================ */

paypal.Buttons({
  style: {
    shape: "rect",
    color: "gold",
    layout: "vertical",
    label: "paypal"
  },
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2)
        }
      }]
    });
  },
  onApprove: function (data, actions) {
    return actions.order.capture().then(function () {
      alert("✅ Pago realizado con PayPal");
      realizarCompra();
    });
  }
}).render("#paypal-button-container");
