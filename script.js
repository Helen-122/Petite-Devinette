//Génerer un nombre aléatoire
let mysteryNumber = Math.floor(Math.random() * 100) + 1;
console.log("(la soluton est " + mysteryNumber + ")");

//Declarer 3 variables pour stocker les références aux trois paragraphes (messages pour aider l'utilisateur dans son jeu)
let guesses = document.querySelector('.guesses');
let rightOrFalse = document.querySelector('.rightOrFalse');
let hint = document.querySelector('.hint');

//  Déclarer 2 variables pour stocker les ref, une pour l'input de saisi et une pour le bouton submit. 
let guessField = document.getElementById('number');
let buttonSubmit = document.getElementById('buttonSubmit');

// Initialisation d'un compteur pour le nombre de tentatives de l'utilisateur
let i = 0;

// Fonction qui récupère la valeur de l'input et affiche des messages suivant les différents cas de figure
function testing() {
    let inputValue = document.getElementById("number").value;

    document.getElementById("number").value = ' ';
    document.getElementById("number").focus();

    if (isNaN(inputValue) == false && inputValue > 0 && inputValue < 101 && i < 7) {
        i++;
        //condition imbriquée
        if (inputValue < mysteryNumber) {
            rightOrFalse.textContent = "Nope! Essaye encore!";
            rightOrFalse.style.color = "#ff595e";
            rightOrFalse.style.fontSize = "large";
            hint.textContent = 'Indice : Le nombre saisi est trop petit';
        }
        else if (inputValue > mysteryNumber) {
            rightOrFalse.textContent = "Nope! Essaye encore!";
            rightOrFalse.style.color = "#ff595e";
            rightOrFalse.style.fontSize = "large";
            hint.textContent = 'Indice : Le nombre saisi est trop grand';
        }
        else {
            rightOrFalse.textContent = `Bravoooooooo! Tu as trouvé en ${i} coups!`;
            rightOrFalse.style.color = "#0081a7";
            rightOrFalse.style.fontSize = "x-large";
            setGameOver();
        }
    }
    else {
        //condition imbriquée
        if (i > 6) {
            rightOrFalse.textContent = "Oh Nooooooon, tu as perdu! La soluton était " + mysteryNumber + ")";
            rightOrFalse.style.color = "#ff595e";
            rightOrFalse.style.fontSize = "large";
            setGameOver();
        }
        else {
            rightOrFalse.textContent = "Ton nombre doit être entre 1 et 100!";
            rightOrFalse.style.color = "#ff595e";
            rightOrFalse.style.fontSize = "large";
            hint.textContent = ' ';
        }
    }
}

//Appeler la fonction testing grâce à un évènement.
//Cette méthode prend deux arguments: le type d'argument que nous écoutons (dans ce cas 'click') 
//et ensuite le code que nous voulons exécuter quand l'event se produit dans ce cas : testing.

buttonSubmit.addEventListener('click', testing);

//Cette fonction est appelée dans la fonction "testing" en cas de victoire ou de défaite.
// Desactiver les entrée de l'input de proposition et du bouton pour le joueur ne puisse 
//plus soumettre de nombre après la fin du jeu.
//Générer un nouveau boutton pour démarrer une nouvelle partie (avec la méthode createElement)
//Ajouter un évenement 'click' pour stipuler à ce boutton que l'on veut que le jeu soit reset. 
//Methode addEventListener --> au click on appelle la fonction resetGame

function setGameOver() {

    guessField.disabled = true;
    buttonSubmit.disabled = true;
    hint.textContent = ' ';

    let resetField = document.querySelector('.resetField');
    let resetButton = document.createElement('button');
    resetButton.classList.add("Rejouer", "btn", "btn-primary", "text-white", "btn-outline-dark");
    resetButton.textContent = "Rejouer";
    resetField.append(resetButton);

    resetButton.addEventListener('click', resetGame);

}

//Fonction qui nous permettra de commencer une nouvelle partie, sans avoir à reloader la page.
//Effacer toute les données de la partie precedentes(les propositions, les indices) 
//et relancer le random number

function resetGame() {

    i = 0;
    let childrenMamanP = document.querySelector('.mamanP').children;
    for (let i = 0; i < childrenMamanP.length; i++) {
        childrenMamanP[i].textContent = ' ';
    }

    let resetButton = document.querySelector('.Rejouer');
    let resetField = document.querySelector('.resetField');

    resetField.removeChild(resetButton);
    guessField.disabled = false;
    buttonSubmit.disabled = false;
    guessField.value = ' ';
    hint.textContent = ' ';
    guessField.focus();

    mysteryNumber = Math.floor(Math.random() * 100) + 1;
    console.log("(la soluton est " + mysteryNumber + ")");
}

