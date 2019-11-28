//Recuper le Canvas du HTML
var canevas = document.getElementById('canvas');

var ctx = canevas.getContext('2d');

var personnages = [];

var switchOk = false;

personnages.push(new Personnage("telechargement.png", basepos.x, basepos.y, DIRECTION.BAS));

// fonction pour passé de la page normale a la page jeu et inversement
function switchpage() {
    CurrentPage()
    if (currentPage === document.getElementById("page02")) {
        switchOk = false;
    } else {
        switchOk = true;
    }
}

// Defini la page utilisé actuellement
function CurrentPage() {
    if (switchOk) {
        currentPage = document.getElementById("page02");
        otherPage = document.getElementById("page01");
    } else if (!switchOk) {
        currentPage = document.getElementById("page01");
        otherPage = document.getElementById("page02");
    }
}

//fonction d'animations
function animatePage() {
    otherPage.classList.remove("switcherBack");
    otherPage.classList.add("switcher");
    currentPage.classList.add("switcherBack");
    currentPage.classList.remove("switcher");
}

//fonction qui permet de nettoyé le canvas
function clear() {
    ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
};

//fonction qui permet de nettoyé le canvas tout les ticks
function tick() {
    clear();
    for (const perso of personnages) {
        perso.tick();
        perso.dessinerPersonnage(ctx);
    }
};

//fonction qui permet de mettre a jour l'animation du personnage.
function updateCycle() {
    tick();
    requestAnimationFrame(() => {
        updateCycle();
    });
}
updateCycle();

//permet de prendres les inpute clavier et de modifier les valeurs des booleen actions.
document.addEventListener("keydown", (evt) => {
    evt.preventDefault();
    if (evt.key == "ArrowDown") {
        actions.down = true;
    } else if (evt.key == "ArrowUp") {
        actions.up = true;
    } else if (evt.key == "ArrowLeft") {
        actions.left = true;
    } else if (evt.key == "ArrowRight") {
        actions.right = true;
    } else if (evt.key == "Control") {
        actions.shoot = true;
        deplacementOk = false;
    } else if (evt.key == "Shift") {
        actions.sprint = true; 
    }
});

document.addEventListener("keyup", (evt) => {
    if (evt.key == "ArrowDown") {
        actions.down = false;
        actionSum = actionSum - actionValue.down;
    } else if (evt.key == "ArrowUp") {
        actions.up = false;
        actionSum = actionSum - actionValue.up;
    } else if (evt.key == "ArrowLeft") {
        actions.left = false;
        actionSum = actionSum - actionValue.left;
    } else if (evt.key == "ArrowRight") {
        actions.right = false;
        actionSum = actionSum - actionValue.right;
    } else if (evt.key == "Control") {
        actions.shoot = false;
        deplacementOk = true;
    } else if (evt.key == "Shift") {
        actions.sprint = false;
    }
});

//Permet de reinitialisé la taille de canvas apres un resize
window.addEventListener('resize', () => {
    canvasSize.x = document.body.scrollHeight;
    canvasSize.y = document.body.scrollWidth;
    clear();
})