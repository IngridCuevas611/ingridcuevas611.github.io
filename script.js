let imgProducto = document.getElementById("imgProducto");
let miniaturas = document.querySelectorAll(".miniaturas img");

function buscar(){
    let input = document.getElementById("searchbox").value.toLowerCase();
    let items = document.querySelectorAll(".item");
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(input)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function filtrarProductos() {
    const input = document.getElementById('searchInput');
    const icono = document.getElementById('icono-lupa');
  
    if(input.value.trim().length > 0){
      icono.style.display = 'none';
    } else {
      icono.style.display = 'inline';
    }
    const filtro = input.value.toLowerCase();
    const lista = document.getElementById("productList");
    const productos = lista.getElementsByTagName("li");

    for (let i = 0; i < productos.length; i++) {
        const texto = productos[i].textContent || productos[i].innerText;
        if (texto.toLowerCase().includes(filtro)) {
            productos[i].style.display = "";
        } else {
            productos[i].style.display = "none";
        }
    }
    const tarjetas = document.querySelectorAll(".productos .col");
    tarjetas.forEach(tarjeta => {
        const texto = tarjeta.innerText.toLowerCase();
        if (texto.includes(filtro)) {
            tarjeta.style.display = "block";
        } else {
            tarjeta.style.display = "none";
        }
    });
}

function setMini(pos){
    if(pos=='0'){
        imgProducto.style.transform = "rotateZ(0deg)";
    }
    if(pos=='1'){
        imgProducto.style.transform = "rotateZ(35deg)";
    }
    if(pos=='2'){
        imgProducto.style.transform = "rotateZ(-55deg) scale(0.75)";
    }

    miniaturas[0].style.backgroundColor = "#fff1d9";
    miniaturas[1].style.backgroundColor = "#fff1d9";
    miniaturas[2].style.backgroundColor = "#fff1d9";
    miniaturas[pos].style.backgroundColor = "#fdc10e";
}

let sizes = document.querySelectorAll(".info-detalle button");

function setSize(pos){
    sizes[0].style.backgroundColor = "#fff1d9";
    sizes[1].style.backgroundColor = "#fff1d9";
    sizes[2].style.backgroundColor = "#fff1d9";
    sizes[pos].style.backgroundColor = "#fdc10e";
}

let menu_responsive_visible = false;
let nav_responsive = document.getElementById("nav-responsive");
let nav = document.getElementById("nav");
let close_responsive = document.getElementById("close-responsive");

nav_responsive.onclick = function(){
    if(menu_responsive_visible == false){
        nav.className = "menu-responsive";
        menu_responsive_visible = true;
    }
}
close_responsive.onclick = function(){
    if(menu_responsive_visible == true){
        nav.className = "";
        menu_responsive_visible = false;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    let botonesMas = document.querySelectorAll(".cantidad button:first-child");
    let botonesMenos = document.querySelectorAll(".cantidad button:last-child");
    let botonesEliminar = document.querySelectorAll(".eliminar i");
    let totalCompra = document.querySelector(".monto");

    function actualizarTotal() {
        let filas = document.querySelectorAll(".productos-carrito .fila:not(:first-child)");
        let total = 0;
        filas.forEach(fila => {
            let cantidad = parseInt(fila.querySelector(".total-cantidad").textContent);
            let precio = parseInt(fila.querySelector(".precio span").textContent.replace(/[^0-9]/g, ""));
            total += cantidad * precio;
        });
        totalCompra.textContent = `$ ${total}`;
    }

    botonesMas.forEach(boton => {
        boton.addEventListener("click", function () {
            let cantidad = this.nextElementSibling;
            cantidad.textContent = parseInt(cantidad.textContent) + 1;
            actualizarTotal();
        });
    });

    botonesMenos.forEach(boton => {
        boton.addEventListener("click", function () {
            let cantidad = this.previousElementSibling;
            let valor = parseInt(cantidad.textContent);
            if (valor > 1) {
                cantidad.textContent = valor - 1;
                actualizarTotal();
            }
        });
    });

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function () {
            this.closest(".fila").remove();
            actualizarTotal();
        });
    });

    document.querySelector(".btn-pagar").addEventListener("click", function () {
        alert("Gracias por tu compra!");
        document.querySelectorAll(".productos-carrito .fila:not(:first-child)").forEach(fila => fila.remove());
        actualizarTotal();
    });
});