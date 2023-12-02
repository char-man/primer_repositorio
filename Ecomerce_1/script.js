const $logoCount = document.querySelector(".container-icon-logo")
const $contenedormenu = document.querySelector(".container-cart-products")
const $cartInfo = document.querySelector(".card-product")
const $rowProduct = document.querySelector(".row-product") //aki almacenaremos las compras
const $productConten = document.querySelector(".container_items") //contenedor principal de los productos
const $product_count = document.getElementById("contador_productos") //total de productos 
const $product_precio = document.querySelector(".total-pagar") //factura total

//variable de arreglos de productos
let allProducts = []

//ver compra
$logoCount.addEventListener("click", (e) =>{
    $contenedormenu.classList.toggle("hidden-card")
})

$productConten.addEventListener("click", (e) =>{
    // e.target.classList => nos muestra di el objeto que origino el evento tiene una determinada clase
    if(e.target.classList.contains("btn-cart")){
        let product = e.target.parentElement
        //informacion del producto al hacer click
        const infoProduct = {
            cantidad: 1,
            producto: product.querySelector('h2').textContent,
            precio: product.querySelector('p').textContent
        };
        //nos permite verificar si el producto agragado ya existe => va ha validar a true o false
        const existes = allProducts.some(existe => existe.producto === infoProduct.producto)
        // console.log(existes)

        //si el producto exixte solo sumalo
        if(existes){
            const produc2 = allProducts.map(product => {
                if(product.producto === infoProduct.producto){
                    product.cantidad++;
                    return product
                }else{
                    return product
                }
            })
            allProducts = [...produc2]
        }else{
            //re definimos la variable de arriba => Añadimos nuevos contenidos al allproduct sin mutarlo
            allProducts = [...allProducts, infoProduct] 
            // console.log(allProducts) => para ver como funciona el codigo de arriba
        }
        
        showHTML() //tiene que estar dentro del condicional
    }
})

//creamos la funcion para poder borar
$rowProduct.addEventListener('click', (e) =>{
    if(e.target.classList.contains("icon-x")){
         const padre = e.target.parentElement
         const title = padre.querySelector('p').textContent;

        //filtramos de productos al presionar x
        allProducts = allProducts.filter(product => product.producto !== title)
    }
    //reutilizamos la funcion limpiar que tambien reajusta el total de la compra y el contador de productos
    showHTML()
})

//Crear factura (lista de la compra)
const showHTML = () =>{
    //cuando el carrito este vacio
    if(!allProducts.length){
        $contenedormenu.innerHTML = `<p class="cart-empy">No hay compras</p>`
    }
    //limpiar menu de compra al hacer click => hace que las compras no se repitan por cada objeto
    $rowProduct.innerHTML = ''

    let totalPrecio = 0;
    let totalProducts = 0;

    allProducts.forEach(product =>{
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('card-product')

        containerProduct.innerHTML= `
        <div class="info-cart-product">
            <span class="cantidad-producto-carito">${product.cantidad}</span>
            <p class="titulo-producto-carrito">${product.producto}</p>
            <span class="precio-producto-carrito">${product.precio}</span>
         </div> 
         <img src="../recursos/X.png" alt="img2" class="icon-x">
         `;
         $rowProduct.append(containerProduct)

        //Determinamos el precio y la cantodad
         totalPrecio = totalPrecio + parseInt(product.cantidad * product.precio.slice(4))//cantidad por el precio
         totalProducts = totalProducts + product.cantidad
    })
    //precio y contador de productos
    $product_precio.innerHTML = `XAF ${totalPrecio}`
    $product_count.innerHTML = totalProducts
}

