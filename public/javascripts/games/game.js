window.addEventListener('DOMContentLoaded', () => {

    hideButtons();

    search();

    bindGame();
})

function bindGame() {
    const elements = document.querySelectorAll('.admin-btn-delete');
    const gameContainer = document.querySelector('.games-grid-admin');
    elements.forEach( e => {
        e.addEventListener('click', ($event) => {
            const gameId = $event.target.getAttribute('gameid');
            console.log(gameId);
            axios.delete('/games/' + gameId).then(function(response) {
            // Supprimer l'élément du DOM directement
            const gameCard = $event.target.closest('.admin-game-card');
            gameCard.remove();
        }).catch(function(err) {console.log(err)});
        })
    })
}

function search() {
    let gameList = document.querySelector('.games-grid-admin');
    console.log(gameList);
    const input = document.querySelector('#search');
    console.log(input);

     if (!input) return; 

    input.addEventListener('input', function($event) {
    let value = $event.target.value;
    
    // Si la barre est vide, recharger tous les jeux
    if (value.trim() === '') {
        window.location.reload(); 
    } else {
        axios.get('/games/search?str=' + value)
             .then(function(response) {
                console.log(response);
                gameList.innerHTML = response.data;
                bindGame();
                hideButtons();
             }).catch(function(err) {
                console.log(err);
             })
    }
})
}

function hideButtons() {
    if (!window.isAuthenticated) {
        document.querySelectorAll('.btn-edit, .btn-delete').forEach(btn => btn.style.display = 'none');
    }
}

