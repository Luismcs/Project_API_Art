let page=1;
let limit=12;
let artworkId;
let procura = false;

function init(page,limit){  //Shows the artworks on the page

    getProducts(page,limit).then(value => {

        let products = [];

        products=value.data;


        createProducts(products);

    });

}

init(page,limit);

let searchButton = document.getElementById('searchButton');
let searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', function () {

    procura = true; //variable to know if the user is searching for something
    page = 1; //reset the page to 1

    searchProduct(searchInput.value).then(value => { //search for the artwork
        console.log(value);
    });

});


let advanceButton = document.getElementById('advance');
let returnButton = document.getElementById('return');

// Adiciona um event listener para o botão "advance"
advanceButton.addEventListener('click', function () {

    if(procura == true){ //if the user is searching for something
        page ++;

        searchProduct(searchInput.value,page).then(value => { //search for the artwork

            let products = [];

            products=value.data;


            clearProductList();

            createProducts(products);

        });

        paginationNumbers(page);

    }
    else{ //if the user is not searching for anything
        page++; //Add 1 to the page

        paginationNumbers(page); //update the pagination numbers

        const lista = document.getElementById('filaProducts');

        while (lista.firstChild) { // Clear the list
            lista.removeChild(lista.firstChild);
        }

        init(page, limit);    // Reload the page with the new data
    }

});

// Adiciona um event listener para o botão "advance"
returnButton.addEventListener('click', function () {

    if(page==1){ //if the page is 1, return
        return;
    }

    if(procura == true){ //if the user is searching for something

        page --;

        searchProduct(searchInput.value,page).then(value => { //search for the artwork

            let artworks = [];

            artworks=value.data;

            clearProductList();

            createProducts(artworks);

        });

        paginationNumbers(page); //update the pagination numbers
    }

    else{
        page--; // Incrementa currentPage

        paginationNumbers(page);

        document.getElementById('listaProducts').classList.add('hidden');

        const lista = document.getElementById('filaProducts'); // lista de dados


        while (lista.firstChild) { // Limpa a lista
            lista.removeChild(lista.firstChild);
        }

        init(page, limit);    //volta a carregar a página com os novos dados
    }


});

function paginationNumbers(page){
    let paginationCurrentText = document.getElementById('paginationCurrentText');
    paginationCurrentText.innerHTML = page;

    let paginationReturnText = document.getElementById('paginationReturnText');

    if(page==1){
        paginationReturnText.innerHTML = '-';
    }
    else{
        paginationReturnText.innerHTML = page-1;
    }

    let paginationAdvanceText = document.getElementById('paginationAdvanceText');
    paginationAdvanceText.innerHTML = page+1;
}

function clearProductList() {
    const filaProducts = document.getElementById('filaProducts');

    while (filaProducts.firstChild) {
        filaProducts.removeChild(filaProducts.firstChild);
    }
}

function createProducts(products){

    var loadingMessage = document.getElementById("loadingMessage");

// Verifica se o elemento foi encontrado
    if (loadingMessage) {
        // Remove o elemento do seu pai
        loadingMessage.parentNode.removeChild(loadingMessage);
    }

    products.forEach(element => {

        let filaProducts = document.getElementById('filaProducts');
        productId=element.id;


        let product = document.createElement('div');
        product.classList.add('col-md-2');
        product.classList.add('artwork');
        product.classList.add('card', 'text-bg-dark');


        //Overlay da imagem
        let overlay = document.createElement('div');
        overlay.classList.add('card-img-overlay');


        //Titulo da Artwork
        let title = document.createElement('h1');
        title.classList.add('card-title');
        title.innerHTML = element.title+'<br>';


        //Link Para o show
        let linkElement = document.createElement('a');
        linkElement.classList.add('linkShow');
        linkElement.textContent = "Product Info ";
        linkElement.href = 'productShow.html?id=' + element.id;
        title.appendChild(linkElement);

        overlay.appendChild(title);
        product.appendChild(overlay);

        let productTitle = document.createElement('p');
        productTitle.innerHTML = element.title;

        filaProducts.appendChild(product);

        let productImg = document.createElement('img');

        productImg.src=element.image_url;
        productImg.classList.add('productImg');

        product.appendChild(productImg);

    });
}


