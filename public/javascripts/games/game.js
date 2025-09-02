window.addEventListener('DOMContentLoaded', () => {
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
                bindTweet();
            }).catch(function(err) {console.log(err)});
        })
    })
}