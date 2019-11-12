// Creation du personnage

const zoomRatio = 64;

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
        this.referenceDuPerso.height = this.height / 20.7; // il y a une erreur dans la table des sprite donc le 20,7 a la place de 21 est pour corriger se probleme
    }
    // lien sur l'image
    this.image.src = ASSETS_PATH + pictureFileName;

    // Configuration des deplacement du personnage

    this.keyFrame = 0;
    this.framesPerKeyFrame = 7;
    this.animatedFrames = 0;
    // this.movementSpeed = 0 + this.x + this.y ;
    // this.movementSpeed = directionSpeed;
}

var herex = this.x;
var herey = this.y;

Personnage.prototype.dessinerPersonnage = function (context) {
    context.drawImage(
        this.image,
        this.framejump, this.direction * this.height, // Point d'origine du rectangle source à prendre dans notre image
        this.width, this.height, // Taille du rectangle source (c'est la taille du personnage)
        (this.x * zoomRatio) - (this.width / 2) + zoomRatio / 2, (this.y * zoomRatio) - this.height + zoomRatio / 4, // Point de destination (dépend de la taille du personnage)
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
    // ctx.strokeText(herex, 110, 50);
    // ctx.strokeText(herey, 110, 75);
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
    this.Sprint();
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
                this.x = canvas.width / zoomRatio + this.x;
            }
            if (this.x > canvas.width / zoomRatio) {
                this.x = 0;
            }
        }

        // this.updateMovementAnimation();
    }
    if (!isNaN(angley)) {
        var rady = angley * Math.PI / 180.0;
        this.y = this.y + this.movementSpeed * Math.sin(rady);

        // Si on sort du cadre, on pop de l'autre coté
        if (this.y < 0) {
            this.y = canvas.height / zoomRatio + this.y;
        }
        if (this.y > canvas.height / zoomRatio) {
            this.y = 0;
        }

        // this.updateMovementAnimation();
    }
    this.updateMovementAnimation();
}

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

    this.framejump = zoomRatio * (this.keyFrame % 9);

    ++this.animatedFrames;
    if (this.animatedFrames == this.framesPerKeyFrame) {
        ++this.keyFrame;
        this.animatedFrames = 0;
    }
};

Personnage.prototype.BlockscreenAndScroll = function () {
    if (fEq(herey * zoomRatio, canvas.height / 2)) {
        drawBubble(ctx, 1800, 450, 220, 60, 10);
        drawText("Gnia", 1800, 485);
        this.updateMovementAnimation();
    }
}

Personnage.prototype.Sprint = function () {
    if (actions.sprint){
        this.movementSpeed = 0.080;
        this.updateMovementAnimation();
    }
    else {
        this.movementSpeed = 0.032;
    }
}

// Answers areFloatsEqual ?
function fEq(float1, float2) {
    //return float1 == float2; // Pb: erreurs d'approximations

    const tolerance = 1; // threshold
    return Math.abs(float1 - float2) < tolerance;
}