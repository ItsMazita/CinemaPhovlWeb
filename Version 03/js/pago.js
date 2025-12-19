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

function cancelarCompra(){
  alert("❌ La compra ha sido cancelada.");
  localStorage.removeItem("asientosTemporal");
  window.location.href = "Pagina Principal.html";
}

function confirmarPago(){
  const metodo = document.querySelector('input[name="pago"]:checked');

  if(!metodo){
    alert("Seleccione un método de pago.");
    return;
  }

  const ocupados = JSON.parse(localStorage.getItem("asientosOcupados")) || [];
  const temporal = JSON.parse(localStorage.getItem("asientosTemporal")) || [];

  localStorage.setItem(
    "asientosOcupados",
    JSON.stringify([...ocupados, ...temporal])
  );

  localStorage.removeItem("asientosTemporal");

  alert("✅ Venta confirmada\nMétodo de pago: " + metodo.value);

  window.location.href = "Pagina Principal.html";
}