// On créé un custom Element pour notre navbar, basé sur bootstrap

class GbNavBar extends HTMLElement {
    // Lifecycle hook
    connectedCallback() {
        this.render();
    }

    // Custom rendering function
    render() {
        const colorAttr = this.getAttribute("color") || "light";
        this.innerHTML =
            `
                <nav class="nav flex-column text-center border border-light fixed rounded-right bg-primary">
                    <img class="img-nav " src="./img/Avec_Effet.png">
                    <div class="border-top m-3"></div>
                    <a class="nav-link" href="#"><button class="btn btn-secondary shadow">Accueil</button></a>
                    <a class="nav-link" href="#"><button class="btn btn-secondary shadow">Petits projets Stream</button></a>
                    <a class="nav-link" href="#"><button class="btn btn-secondary shadow">Norage-Kart Adventure</button></a>
                    <a class="nav-link mb-3" href="#"><button class="btn btn-secondary shadow">Contact</button></a>
                    <p>Copyright 2019-2022</p>
                </nav>
        `;
    }
}
customElements.define('gb-navbar', GbNavBar);

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

class GbHead extends HTMLElement {
    // Lifecycle hook
    connectedCallback() {
        this.render();
    }

    // Custom rendering function
    render() {
        this.innerHTML = `<div class="">
            
            </div>`;
    }
}

var actions = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "all": false
};


var DIRECTION = {
    "STOP": 10,
    "HAUT": 8,
    "GAUCHE": 9,
    "BAS": 10,
    "DROITE": 11
}

function Personnage(url, x, y, direction) {
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
    // this.image.src = "./img/perso/313386.png" + url;
    this.image.src = "./img/perso/" + url;
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

Personnage.prototype.tick = function () {
    this.deplacement();
    this.updateMovementAnimation();
}

Personnage.prototype.deplacement = function () {
    if (actions.down) {
        this.y = this.y + 0.2;
        this.direction = DIRECTION.BAS;
    } else if (actions.up) {
        this.y = this.y - 0.2;
        this.direction = DIRECTION.HAUT;
    } else if (actions.right) {
        this.x = this.x + 0.2;
        this.direction = DIRECTION.DROITE;
    } else if (actions.left) {
        this.x = this.x - 0.2;
        this.direction = DIRECTION.GAUCHE;
    }else if (!actions.left & !actions.up & !actions.right & !actions.down) {
        this.lol = 320;
    }
    // if (event.which == 40 || event.keyCode == 40) {
    //     this.y += 0.01;
    //     return false;
    // }
    // return true;

};

Personnage.prototype.updateMovementAnimation = function(){
    if (this.lol == this.lol * 0) {
        this.lol = 64;
    } else if (this.lol == 64) {
        this.lol = 128;
        sleep(110);
    } else if (this.lol == 128) {
        this.lol = 192;
        sleep(110);
    } else if (this.lol == 192) {
        this.lol = 256;
        sleep(110);
    } else if (this.lol == 256) {
        this.lol = 320;
        sleep(110);
    } else if (this.lol == 320) {
        this.lol = 384;
        sleep(110);
    } else if (this.lol == 384) {
        this.lol = 448;
        sleep(110);
    } else if (this.lol == 448) {
        this.lol = 512;
        sleep(110);
    } else if (this.lol == 512) {
        this.lol = 0;
        sleep(110);
    }
}

var canvasSize = {
    x: 1920,
    y: 888
}

var canevas = document.getElementById('canvas'); // dans votre HTML, cet élément apparaît comme <canvas id="monCanevas"></canvas>

{
    // Récupère et affiche taille du canvas
    const rect = canevas.getBoundingClientRect();
    console.log(rect);
}

var ctx = canevas.getContext('2d');
var personnages = [];

personnages.push(new Personnage("téléchargement.png", 15, 6, DIRECTION.BAS));

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
    if (evt.key === "ArrowDown") {
        actions.down = true;
    } else if (evt.key === "ArrowUp") {
        actions.up = true;
    } else if (evt.key === "ArrowLeft") {
        actions.left = true;
    } else if (evt.key === "ArrowRight") {
        actions.right = true;
    } else if (evt.key === "ArrowRight" && evt.key === "ArrowUp") {
        actions.right = true;
    } else if (evt.key === "ArrowRight" && evt.key === "ArrowDown") {
        actions.right = true;
    } else if (evt.key === "ArrowRight" && evt.key === "ArrowUp") {
        actions.right = true;
    } else if (evt.key === "ArrowRight" && evt.key === "ArrowDown") {
        actions.right = true;
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
    }else if (evt.key === "ArrowRight" && evt.key === "ArrowUp") {
        actions.right = false;
    }else if (evt.key === "ArrowRight" && evt.key === "ArrowDown") {
        actions.right = false;
    }else if (evt.key === "ArrowRight" && evt.key === "ArrowUp") {
        actions.right = false;
    }else if (evt.key === "ArrowRight" && evt.key === "ArrowDown") {
        actions.right = false;
    }
});