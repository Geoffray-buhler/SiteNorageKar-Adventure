

// On créé un custom Element pour notre navbar, basé sur bootstrap

// class GbNavBar extends HTMLElement {
//     // Lifecycle hook
//     connectedCallback() {
//         this.render();
//     }

//     // Custom rendering function
//     render() {
//         const colorAttr = this.getAttribute("color") || "light";
//         this.innerHTML =
//             `
//                 <nav class="nav flex-column text-center border border-light fixed rounded-right bg-primary">
//                     <img class="img-nav " src="./img/Avec_Effet.png">
//                     <div class="border-top m-3"></div>
//                     <a class="nav-link" href="#"><button class="btn btn-secondary shadow">Accueil</button></a>
//                     <a class="nav-link" href="#"><button class="btn btn-secondary shadow">Petits projets Stream</button></a>
//                     <a class="nav-link" href="#"><button class="btn btn-secondary shadow">Norage-Kart Adventure</button></a>
//                     <a class="nav-link mb-3" href="#"><button class="btn btn-secondary shadow">Contact</button></a>
//                     <p>Copyright 2019-2022</p>
//                 </nav>
//         `;
//     }
// }

// customElements.define('gb-navbar', GbNavBar);

// definition des bouleens pour les direction de deplacement du personnage

var actions = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "shoot_down": false,
    "shoot_up": false,
    "shoot_right": false,
    "shoot_left": false
};

// valeur des direction pour la table des sprite personnages

var DIRECTION = {
    "HAUT": 8,
    "GAUCHE": 9,
    "BAS": 10,
    "DROITE": 11
}

var ACTIONSPLAY = {
    "SHOOT_HAUT": 1,
    "SHOOT_GAUCHE": 2,
    "SHOOT_BAS": 3,
    "SHOOT_DROITE": 4,
}

// creation du personnage

function Personnage(pictureFileName, x, y, direction) {
    this.x = x; // (en cases)
    this.y = y; // (en cases)
    this.direction = direction;

    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.referenceDuPerso = this;
    this.lol = 0;
    this.image.onload = function () {
        if (!this.complete)
            throw "Erreur de chargement du sprite nommé \"" + url + "\".";

        // Taille du personnage
        this.referenceDuPerso.largeur = this.width / 13;
        this.referenceDuPerso.hauteur = this.height / 21;
    }
        // lien sur l'image
        this.image.src = ASSETS_PATH + pictureFileName;

        // configuration des deplacement du personnage

    this.keyFrame = 0;
    this.framesPerKeyFrame = 7;
    this.animatedFrames = 0;
    this.movementSpeed = 0.05;
}

Personnage.prototype.dessinerPersonnage = function (context) {
    context.drawImage(
        this.image,
        this.lol, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
        this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
        (this.x * 64) - (this.largeur / 2) + 32, (this.y * 64) - this.hauteur + 12, // Point de destination (dépend de la taille du personnage)
        this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
    );
}
    // fonction pour lancer des action tout les ticks 60 ticks par seconde
Personnage.prototype.tick = function () {
    this.deplacement();
    this.updateMovementAnimation();
}
    // systeme de deplacement du personnage en fonction des inputes
Personnage.prototype.deplacement = function () {
    if (actions.down) {
        this.y = this.y + this.movementSpeed;
        this.direction = DIRECTION.BAS;
    } else if (actions.up) {
        this.y = this.y - this.movementSpeed;
        this.direction = DIRECTION.HAUT;
    } else if (actions.right) {
        this.x = this.x + this.movementSpeed;
        this.direction = DIRECTION.DROITE;
    } else if (actions.left) {
        this.x = this.x - this.movementSpeed;
        this.direction = DIRECTION.GAUCHE;
    }else if (actions.shoot) {
        coummeca = this.direction;
    }else if (!this.isMoving()) {
        this.lol = 0;
    }
};

Personnage.prototype.actionsingame = function(){
    if (action.shoot_down){
        this.direction = ACTIONSPLAY.SHOOT_BAS;
    }
}

// fonction qui permet de verifier si le personnage bouge 

Personnage.prototype.isMoving = function(){
    // return !(!actions.left && !actions.up && !actions.right && !actions.down);
    return actions.left || actions.up || actions.right || actions.down || actions.shoot;
}

Personnage.prototype.updateMovementAnimation = function(){
    if(!this.isMoving()) return;

    this.lol = 64 * (this.keyFrame % 9);

    ++this.animatedFrames;
    if(this.animatedFrames == this.framesPerKeyFrame){
        ++this.keyFrame;
        this.animatedFrames = 0;
    }
}

var canvasSize = {
    x: 1920,
    y: 888
}

var canevas = document.getElementById('canvas'); // dans votre HTML, cet élément apparaît comme <canvas id="monCanevas"></canvas>

// {
//     // Récupère et affiche taille du canvas
//     const rect = canevas.getBoundingClientRect();
//     console.log(rect);
// }

var ctx = canevas.getContext('2d');
var personnages = [];

// personnages.push(new Personnage("telechargement.png", 21.5, 0.6, DIRECTION.BAS));
personnages.push(new Personnage("telechargement.png", 14.5, 2.3, DIRECTION.BAS));


function clear() {
    // ctx.fillStyle = "transparent";
    // ctx.fillRect(0, 0, canvasSize.x, canvasSize.y);
    ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
}

function tick() {
    clear();

    for (const perso of personnages) {
        perso.tick();
        perso.dessinerPersonnage(ctx);
    }
}


function updateCycle() {
    tick();

    requestAnimationFrame(() => {
        updateCycle();
    });
}
updateCycle();


document.addEventListener("keydown", (evt) => {
    evt.preventDefault();

    if (evt.key === "ArrowDown") {
        actions.down = true;
    } else if (evt.key === "ArrowUp") {
        actions.up = true;
    } else if (evt.key === "ArrowLeft") {
        actions.left = true;
    } else if (evt.key === "ArrowRight") {
        actions.right = true;
    } else if (evt.key === "s") {
        action.shoot_down = true;
    } else if (evt.key === "q") {
        action.shoot_left = true;
    } else if (evt.key === "d") {
        action.shoot_right = true;
    } else if (evt.key === "z") {
        action.shoot_up = true;
    }
});

document.addEventListener("keyup", (evt) => {
    if (evt.key === "ArrowDown") {
        actions.down = false;
    } else if (evt.key === "ArrowUp") {
        actions.up = false;
    } else if (evt.key === "ArrowLeft") {
        actions.left = false;
    } else if (evt.key === "ArrowRight") {
        actions.right = false;
    }else if (evt.key === "s") {
        action.shoot_down = false;
    }else if (evt.key === "d") {
        action.shoot_right = false;
    }else if (evt.key === "q") {
        action.shoot_left = false;
    }else if (evt.key === "z") {
        action.shoot_up = false;
    }
});