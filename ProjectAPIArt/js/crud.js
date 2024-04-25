//Este ficheiro vai ter as funções do crud (create,delete). Em Laravel este seria o Controller

// ARTWORKS CRUD
function getData(page,limit) {    //Retorna a lista com todos as artworks
        return fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter os dados da lista de Artworks');
                }
                return response.json();
            });
}

function getArtworks(page) {    //Retorna a lista com todos as artworks
    return fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados da lista de Artworks');
            }
            return response.json();
        });
}

function searchArtwork(search, page) {
    const url = page ? `https://api.artic.edu/api/v1/artworks/search?q=${search}&page=${page}` : `https://api.artic.edu/api/v1/artworks/search?q=${search}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados da procura da Artwork');
            }
            return response.json();
        })
        .then(data => {
            if (page) {
                data.pagination.current_page = page;
            }
            return data;
        });
}

function show(artworkId) {    //Retorna a lista com todos as artworks
    return fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados da Artwork');
            }
            return response.json();
        });
}

function getArtworkImage(artworkId){
    return fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados da Imagem da Artwork');
            }
            return response.json();
        });
}

function getArtworkImageUrl(image_Id){
    return fetch(`https://www.artic.edu/iiif/2/${image_Id}/full/843,/0/default.jpg`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching image');
            }
            return response; // Return the response object directly
        });
}

// CATEGORIES CRUD

function getCategories() {    //Retorna a lista com todos as artworks
    return fetch(`https://api.artic.edu/api/v1/categories`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados da lista de cateogiras');
            }
            return response.json();
        });
}

// PRODUCTS CRUD

function getProducts(page,limit) {    //Retorna a lista com todos as artworks
    return fetch(`https://api.artic.edu/api/v1/products?page=${page}&limit=${limit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados da lista de Products');
            }
            return response.json();
        });
}

function searchProduct(search, page) {
    const url = `https://api.artic.edu/api/v1/products/search?q=${search}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados da procura do Produto');
            }
            return response.json();
        })
        .then(data => {
            if (page) {
                data.pagination.current_page = page;
            }
            return data;
        });
}

function showProduct(productId) {    //Retorna a lista com todos as artworks
    return fetch(`https://api.artic.edu/api/v1/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do Product');
            }
            return response.json();
        });
}