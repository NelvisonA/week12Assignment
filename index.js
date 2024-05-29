//creating variables selecting certain values from elements to the url
const baseUrl = 'http://localhost:3000/MovieList';

let $submitting = $('#btn_submit');
let $cardContainer = $('#card_container');
let $idBtnDel = $('#btn_submit_del');

//makes sure the file is ready
$(document).ready( () => {

    const url = 'http://localhost:3000/MovieList';
  //going through the data in the url and appending a div with a new movie and poster
    $.get(url).then(data => {
        data.map(Movie => {
            json = JSON.stringify(Movie);
            $cardContainer.append(`
            
        <div id="movie_${Movie.id}" data-movie="${ Movie.id }" class="card m-2">
            <h5 class="movie_description">${Movie.name}</h5>
            <img class="card-img-top card-img-bottom" src="${Movie.posterURL}" alt="${Movie.name}">
            <button class="btn btn_del btn-warning button_delete" type="button" title="Delete">id: ${Movie.id}</button>
        </div>
            
            `);
        });
    });

    //delete object from json file with id
    $('#card_container').on('click', '.button_delete', (e) => {
      console.log(e.target);  
      let id = $(e.target).closest('div').data('movie');
      let url = `${ baseUrl }/${ id }`;
      console.log(`Sending DELETE request to ${ url }...`);
      $.ajax({
        url: url,
        method: 'DELETE'
      }).then(res => {

      });
    });

    
    //submitting button that post onto the json file
    $submitting.click( () => {
        let title = $('#user_title').val();
        let posterLink = $('#poster_URL').val();
        let movieId = $('#movie_id').val();

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
              name: title,
              posterURL: posterLink,
              id: movieId
          })
        });
    });

});