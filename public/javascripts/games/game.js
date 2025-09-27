window.addEventListener('DOMContentLoaded', () => {

    hideButtons();

    search();

    bindGame();
})

function bindGame() {
    const elements = document.querySelectorAll('.btn-delete');
    const gameContainer = document.querySelector('.affiche-game');
    elements.forEach( e => {
        e.addEventListener('click', ($event) => {
            const gameId = $event.target.getAttribute('gameid');
            console.log(gameId);
            axios.delete('/games/' + gameId).then(function(response) {
                gameContainer.innerHTML = response.data;
                bindGame();
                hideButtons();
            }).catch(function(err) {console.log(err)});
        })
    })
}

function search() {
    let gameList = document.querySelector('.affiche-game');
    console.log(gameList);
    const input = document.querySelector('#search');
    console.log(input);

     if (!input) return; 

    input.addEventListener('input', function($event) {

        let value = $event.target.value;
        
        axios.get('/games/search?str=' + value)
             .then(function(response) {
                console.log(response);
                gameList.innerHTML = response.data;
                bindGame();
                hideButtons();
             }).catch(function(err) {
                console.log(err);
             })
    })
}

function hideButtons() {
    if (!window.isAuthenticated) {
        document.querySelectorAll('.btn-edit, .btn-delete').forEach(btn => btn.style.display = 'none');
    }
}