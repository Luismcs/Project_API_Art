function init(){

    let url = new URL(window.location.href);
    // Verifica se o parâmetro 'id' está presente na URL e se é um número válido
    let artworkId = url.searchParams.get('id');
    if (!artworkId || isNaN(artworkId)) {
        console.error('ID inválido na URL');
        return;
    }
    // Converte o ID para um número
    artworkId = parseInt(artworkId);

    let artId= artworkId;


        console.log(artworkId);

    // Chama a função show com o ID
    show(artworkId).then((value)=> {   //está no crud.js (é .then porque é uma promise)

        console.log(value);

        let artworkName = document.getElementById('artworkName');
        let artistName = document.getElementById('artistName');
        let artworkType = document.getElementById('artworkType');
        let artistDate = document.getElementById('artistDate');

        artworkName.value = value.data.title;
        artistName.value = value.data.artist_title;
        artworkType.value = value.data.artwork_type_title;
        artistDate.value = value.data.date_display;

        getArtworkImage(artId).then(value => {

            let image_Id = value.data.image_id;

            getArtworkImageUrl(image_Id).then(value => {

                let artworkImage = document.getElementById('artworkImage');

                artworkImage.src=value.url;

            });

        });

    });

}

init();