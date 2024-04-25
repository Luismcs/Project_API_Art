let page=1;
let limit=12;
let artworkId;
let procura = false;

function init(page,limit){  //Shows the artworks on the page

    getData(page,limit).then(value => {

        let artworks = [];

        artworks=value.data;

        verifiesEmptySearch(artworks);

        //if the artwork vector has less than 12 results, disable the next page buttons
        if(value.data.length <12) {
            let advanceButton = document.getElementById('advance');
            advanceButton.classList.add('disabled');
            let nextPage = document.getElementById('nextPage');
            nextPage.classList.add('disabled');
        }

        createArtworks(artworks);

    });

}

init(page,limit);

let searchButton = document.getElementById('searchButton');
let searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', function () {

    procura = true; //variable to know if the user is searching for something
    page = 1; //reset the page to 1

    searchArtwork(searchInput.value, page).then(value => { //search for the artwork

        clearArtworkList();

        //if the search has less than 10 results, disable the pagination buttons
        if(value.data.length <10) {
            disablePaginationButtons();
        }

        if(value.data.length == 0){
            let filaArtworks = document.getElementById('filaArtworks');
            let noResults = document.createElement('p');
            noResults.innerHTML = "Nothing found. Please try again.";
            filaArtworks.appendChild(noResults);
        }

        console.log(value.data);

        createArtworks(value.data);

        paginationNumbers(value.pagination.current_page);
    });

});


let advanceButton = document.getElementById('advance');
let returnButton = document.getElementById('return');

// Adiciona um event listener para o botão "advance"
advanceButton.addEventListener('click', function () {

    if(procura == true){ //if the user is searching for something
        page ++;

        searchArtwork(searchInput.value,page).then(value => { //search for the artwork

            let artworks = [];

            artworks=value.data;

            verifiesEmptySearch(artworks);

            clearArtworkList();

            createArtworks(artworks);

        });

        paginationNumbers(page);

    }
    else{ //if the user is not searching for anything
        page++; //Add 1 to the page

        paginationNumbers(page); //update the pagination numbers

        const lista = document.getElementById('filaArtworks');

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

        searchArtwork(searchInput.value,page).then(value => { //search for the artwork

            let artworks = [];

            artworks=value.data;

            //if the search has less than 10 results, disable the pagination buttons
            if(value.data.length <10) {
                disablePaginationButtons();
            }

            clearArtworkList();

            createArtworks(artworks);

        });

        paginationNumbers(page); //update the pagination numbers
    }

    else{
        page--; // Incrementa currentPage

        paginationNumbers(page);

        document.getElementById('listaArtworks').classList.add('hidden');

        const lista = document.getElementById('filaArtworks'); // lista de dados


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

function clearArtworkList() {
    const filaArtworks = document.getElementById('filaArtworks');

    while (filaArtworks.firstChild) {
        filaArtworks.removeChild(filaArtworks.firstChild);
    }
}

function createArtworks(artworks){

    var loadingMessage = document.getElementById("loadingMessage");

    // Verifica se o elemento foi encontrado
    if (loadingMessage) {
        // Remove o elemento do seu pai
        loadingMessage.parentNode.removeChild(loadingMessage);
    }

    artworks.forEach(element => {

        let filaArtworks = document.getElementById('filaArtworks');
        artworkId=element.id;


        let artwork = document.createElement('div');
        artwork.classList.add('col-md-2');
        artwork.classList.add('artwork');
        artwork.classList.add('card', 'text-bg-dark');


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
        linkElement.textContent = "Artwork Info ";
        linkElement.href = 'artworkShow.html?id=' + element.id;
        title.appendChild(linkElement);

        overlay.appendChild(title);
        artwork.appendChild(overlay);

        let artworkTitle = document.createElement('p');
        artworkTitle.innerHTML = element.title;

        filaArtworks.appendChild(artwork);

        getArtworkImage(element.id).then(value => {

            let image_Id = value.data.image_id;

            getArtworkImageUrl(image_Id).then(value => {

                let artworkImg = document.createElement('img');

                artworkImg.src=value.url;
                artworkImg.classList.add('artworkImg');

                artwork.appendChild(artworkImg);


            });

        });

    });
}

function disablePaginationButtons(){
    let advanceButton = document.getElementById('advance');
    advanceButton.classList.add('disabled');
    let nextPage = document.getElementById('nextPage');
    nextPage.classList.add('disabled');
    let returnButton = document.getElementById('return');
    returnButton.classList.add('disabled');
    let previousPage = document.getElementById('previousPage');
    previousPage.classList.add('disabled');
}

function verifiesEmptySearch(artworks){
    if(artworks.length == 0){
        let filaArtworks = document.getElementById('filaArtworks');
        let noResults = document.createElement('p');
        noResults.innerHTML = "Nothing found. Please try again.";
        filaArtworks.appendChild(noResults);
    }
}

