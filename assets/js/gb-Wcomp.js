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

// Definition des bouleens pour les direction de deplacement du personnage

var actions = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "shoot": false,
};

// Valeur des direction pour la table des sprite personnages

var DIRECTION = {
    "HAUT": 8,
    "GAUCHE": 9,
    "BAS": 10,
    "DROITE": 11
}

var directionSpeed = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
}

var basepos = {
    x: 14.5,
    y: 2.3
}

var deplacementOk;
deplacementOk = true;

function drawBubble(ctx, x, y, w, h, radius) {
    var r = x + w;
    var b = y + h;
    ctx.beginPath();
    ctx.fillStyle = "#DAA10988";
    ctx.strokeStyle = "#181812";
    ctx.lineWidth = "2";
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + radius / 2, y - 10);
    ctx.lineTo(x + radius * 2, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.stroke();
    ctx.fill();
}

function drawText(textbulle, x, y) {
    ctx.fillStyle = '#46433D';
    ctx.lineWidth = 1;
    ctx.font = '15px arial';
    ctx.fillText(textbulle, x, y);
}
// Creation du personnage

function Personnage(pictureFileName, x, y, direction) {
    this.x = x; // (en cases)
    this.y = y; // (en cases)
    this.direction = direction;

    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.referenceDuPerso = this;
    this.framejump = 0;
    this.image.onload = function () {
        if (!this.complete)
            throw "Erreur de chargement du sprite nommé \"" + url + "\".";

        // Taille du personnage
        this.referenceDuPerso.width = this.width / 13;
        this.referenceDuPerso.height = this.height / 21;
    }
    // lien sur l'image
    this.image.src = ASSETS_PATH + pictureFileName;

    // Configuration des deplacement du personnage

    this.keyFrame = 0;
    this.framesPerKeyFrame = 7;
    this.animatedFrames = 0;
    this.movementSpeed = 0.09;
    // this.movementSpeed = 0 + this.x + this.y ;
    // this.movementSpeed = directionSpeed;
}

Personnage.prototype.dessinerPersonnage = function (context) {
    context.drawImage(
        this.image,
        this.framejump, this.direction * this.height, // Point d'origine du rectangle source à prendre dans notre image
        this.width, this.height, // Taille du rectangle source (c'est la taille du personnage)
        (this.x * 64) - (this.width / 2) + 32, (this.y * 64) - this.height + 12, // Point de destination (dépend de la taille du personnage)
        this.width, this.height) // Taille du rectangle destination (c'est la taille du personnage)

    //   if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
    //     this.vy = -this.vy;
    //   }
    //   if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
    //     this.vx = -this.vx;
    //   }
}

// fonction qui permet de recuperer les coordonées du personnage et de les affiché
Personnage.prototype.localisation = function () {
    var herex = this.x;
    var herey = this.y;
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;
    ctx.font = '20px arial';
    herex = Math.trunc(herex)
    herey = Math.trunc(herey)
    ctx.strokeText(herex, 110, 50);
    ctx.strokeText(herey, 110, 75);
    if (herex === 7 && herey === 6) {
        drawBubble(ctx, 500, 450, 220, 60, 10);
        drawText("Ici les infos pour NorageKart", 505, 485);
        this.direction = DIRECTION.BAS;
    }
    if (herex === 14 && herey === 6) {
        drawBubble(ctx, 950, 450, 220, 60, 10);
        drawText("Ici les infos pour RushMania", 955, 485);
        this.direction = DIRECTION.BAS;
    }
    if (herex === 21 && herey === 6) {
        drawBubble(ctx, 1450, 450, 220, 60, 10);
        drawText("Ici les jeux crée en 2 heures", 1455, 485);
        this.direction = DIRECTION.BAS;
    }
    if (herex === 28 && herey === 6) {
        drawBubble(ctx, 1800, 450, 220, 60, 10);
        drawText("Pas la !!!", 1800, 485);
        this.direction = DIRECTION.BAS;
    }
}

// fonction pour lancer des actions tout les ticks 60 ticks par seconde
Personnage.prototype.tick = function () {
    this.deplacement();
    this.localisation();
    this.actionsInGame();
}
// systeme de deplacement du personnage en fonction des inputes
Personnage.prototype.deplacement = function () {
    if (deplacementOk) {
        var anglex = NaN; // en degrés
        var angley = NaN; // en degrés
        if (actions.down) {
            angley = 90;
            this.direction = DIRECTION.BAS;
        }
        if (actions.up) {
            angley = 270;
            this.direction = DIRECTION.HAUT;
        }
        if (actions.right) {
            anglex = 0;
            this.direction = DIRECTION.DROITE;
        }
        if (actions.left) {
            anglex = 180;
            this.direction = DIRECTION.GAUCHE;
        }
        if (!this.isMoving()) {
            this.framejump = 0;
        }

        if (!isNaN(anglex)) {
            var radx = anglex * Math.PI / 180.0;
            this.x = this.x + this.movementSpeed * Math.cos(radx);

            // Si on sort du cadre, on pop de l'autre coté
            if (this.x < 0) {
                this.x = canvas.width / 64 + this.x;
            }
            if (this.x > canvas.width / 64) {
                this.x = 0;
            }
        }

        this.updateMovementAnimation();
    }
    if (!isNaN(angley)) {
        var rady = angley * Math.PI / 180.0;
        this.y = this.y + this.movementSpeed * Math.sin(rady);

        // Si on sort du cadre, on pop de l'autre coté
        if (this.y < 0) {
            this.y = canvas.height / 64 + this.y;
        }
        if (this.y > canvas.height / 64) {
            this.y = 0;
        }

        this.updateMovementAnimation();
    }
};

Personnage.prototype.actionsInGame = function () {
    if (actions.shoot) {
        let directionAtThisMoments = this.direction;
        this.direction = directionAtThisMoments - 7;
        this.updateMovementAnimation();
    }
};

// fonction qui permet de verifier si le personnage bouge 

Personnage.prototype.isMoving = function () {
    // return !(!actions.left && !actions.up && !actions.right && !actions.down);
    return actions.left || actions.up || actions.right || actions.down || actions.shoot;
};

Personnage.prototype.updateMovementAnimation = function () {
    if (!this.isMoving()) return;

    this.framejump = 64 * (this.keyFrame % 9);

    ++this.animatedFrames;
    if (this.animatedFrames == this.framesPerKeyFrame) {
        ++this.keyFrame;
        this.animatedFrames = 0;
    }
};

var canvasSize = {
    x: document.body.scrollHeight,
    y: document.body.scrollWidth
};
// dans votre HTML, cet élément apparaît comme <canvas id="monCanevas"></canvas>
var canevas = document.getElementById('canvas');

var ctx = canevas.getContext('2d');
var personnages = [];

personnages.push(new Personnage("telechargement.png", basepos.x, basepos.y, DIRECTION.BAS));
// personnages.push(new Personnage("telechargement.png", 1, 1, DIRECTION.BAS));


function clear() {
    ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
};

function tick() {
    clear();

    for (const perso of personnages) {
        perso.tick();
        perso.dessinerPersonnage(ctx);
    }
};


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
    } else if (evt.key === "Control") {
        actions.shoot = true;
        deplacementOk = false;
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
    } else if (evt.key === "Control") {
        actions.shoot = false;
        deplacementOk = true;
    }
});