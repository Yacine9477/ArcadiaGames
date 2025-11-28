window.addEventListener('DOMContentLoaded', () => {

    hideButtons();

    search();

    bindGame();
})

function bindGame() {
    const gameContainer = document.querySelector('.games-grid-admin');
    
    // Utiliser la délégation d'événement pour éviter les multiples listeners
    gameContainer.removeEventListener('click', handleDeleteClick);
    gameContainer.addEventListener('click', handleDeleteClick);
}

function handleDeleteClick(event) {
    if (event.target.classList.contains('admin-btn-delete')) {
        event.preventDefault();
        event.stopPropagation();
        
        const gameId = event.target.getAttribute('gameid');
        console.log('Deleting game:', gameId);
        
        axios.delete('/games/' + gameId).then(function(response) {
            // Supprimer l'élément du DOM directement
            const gameCard = event.target.closest('.admin-game-card');
            gameCard.remove();
        }).catch(function(err) {
            console.log('Error deleting game:', err);
        });
    }
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

