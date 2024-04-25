function init(){

    let url = new URL(window.location.href);
    // Verifica se o parâmetro 'id' está presente na URL e se é um número válido
    let productId = url.searchParams.get('id');
    if (!productId || isNaN(productId)) {
        console.error('ID inválido na URL');
        return;
    }
    // Converte o ID para um número
    productId = parseInt(productId);

    // Chama a função show com o ID
    showProduct(productId).then((value)=> {   //está no crud.js (é .then porque é uma promise)

        console.log(value);

        // Product Name
        let productName = document.getElementById('productName');
        productName.value = value.data.title;

        // Product Name
        let productPrice = document.getElementById('productPrice');
        productPrice.value = value.data.max_current_price + "$";

        // Product Description
        let description = document.getElementById('description');
        let productDescriptionString = value.data.description;
        const tempElement = document.createElement('div');
        tempElement.innerHTML = productDescriptionString;
        description.appendChild(tempElement);

        // Product Image
        let artworkImage = document.getElementById('artworkImage');
        artworkImage.src=value.data.image_url;
        artworkImage.alt = "ProductImage"

        let url = value.data.web_url;
        console.log(url);

        // Adiciona um evento de clique ao botão para redirecionar para o URL específico
        document.getElementById("buttonShop").addEventListener("click", function() {
            window.open(url,'_blank');
        });

    });

}

init();