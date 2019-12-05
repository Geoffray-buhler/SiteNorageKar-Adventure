// Answers areFloatsEqual ?
function fEq(float1, float2) {
    //return float1 == float2; // Pb: erreurs d'approximations

    const tolerance = 1; // threshold
    return Math.abs(float1 - float2) < tolerance;
}

class Personnage {
    // Creation du personnage
    constructor(pictureFileName, x, y, direction) {
        this.x = x; // (en cases)
        this.y = y; // (en cases)

        var herex = this.x;
        var herey = this.y;

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
    }
    // Dessine le personnage sur le canvas
    dessinerPersonnage(context) {
        context.drawImage(
            this.image,
            this.framejump, this.direction * this.height, // Point d'origine du rectangle source à prendre dans notre image
            this.width, this.height, // Taille du rectangle source (c'est la taille du personnage)
            (this.x * zoomRatio) - (this.width / 2) + zoomRatio / 2, (this.y * zoomRatio) - this.height + zoomRatio / 4, // Point de destination (dépend de la taille du personnage)
            this.width, this.height) // Taille du rectangle destination (c'est la taille du personnage)
    }

    // Fonction qui permet de recuperer les coordonées du personnage et de les affiché
    localisation() {
        var herex = this.x;
        var herey = this.y;
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1;
        ctx.font = '20px arial';
        herex = Math.trunc(herex)
        herey = Math.trunc(herey)
        //ctx.strokeText(herex, 110, 50);
        //ctx.strokeText(herey, 110, 75);
        if (herex === 0 && herey === 6 && canChange) {
            switchpage();
            animatePage()
            canChange = false;
        } else if (herex != 0 && herey != 0) {
            canChange = true;
        }
        if (!switchOk) {
            if (!(herex === 7 && herey === 6 || herex === 14 && herey === 6 || herex === 21 && herey === 6 || herex === 28 && herey === 6)) {
                isOnButton = false;
                superDiv.classList.add("d-none");
            }
            if (herex === 7 && herey === 6) {
                isOnButton = true;
                superDiv.classList.remove("d-none");
                this.direction = DIRECTION.BAS;
            }
            if (herex === 14 && herey === 6) {
                isOnButton = true;
                superDiv.classList.remove("d-none");
                this.direction = DIRECTION.BAS;
            }
            if (herex === 21 && herey === 6) {
                isOnButton = true;
                superDiv.classList.remove("d-none");
                this.direction = DIRECTION.BAS;
            }
            if (herex === 28 && herey === 6) {
                isOnButton = true;
                superDiv.classList.remove("d-none");
                this.direction = DIRECTION.BAS;
            }
            superDiv.style.left = `(x+1)px`;
            superDiv.style.top = `(y+1)px`;
        }
    }
    // Fonction pour lancer des actions tout les ticks 60 ticks par seconde
    tick(deltaTime) {
        this.deplacement();
        this.localisation();
        this.Sprint();
        this.actionsInGame();
        this.staminaSystem(deltaTime);
        this.moveLifeBar();
        this.gameOver();
    }
    // Fonction qui permet de deplacer le personnage en avec les touches du clavier.
    deplacement() {
        var actionsSum = 0;
        if (deplacementOk) {
            var anglex = NaN; // en degrés
            var angley = NaN; // en degrés
            if (actions.down) {
                angley = 90;
                this.direction = DIRECTION.BAS;
                actionSum = actionSum + actionValue.down;
            }
            if (actions.up) {
                angley = 270;
                this.direction = DIRECTION.HAUT;
                actionSum = actionSum + actionValue.up;
            }
            if (actions.right) {
                anglex = 0;
                this.direction = DIRECTION.DROITE;
                actionSum = actionSum + actionValue.right;
            }
            if (actions.left) {
                anglex = 180;
                this.direction = DIRECTION.GAUCHE;
                actionSum = actionSum + actionValue.left;
            }
            if (!this.isMoving()) {
                this.framejump = 0;
            }
            // gestion de la diagonal en plus des direction de déplacements
            if (!isNaN(anglex)) {
                var radx = anglex * Math.PI / 180.0;
                this.x = this.x + this.movementSpeed * Math.cos(radx);
                if (switchOk == false) {
                    // Si on sort du cadre, on pop de l'autre coté
                    if (this.x < 0) {
                        this.x = canvas.width / zoomRatio + this.x;
                    }
                    if (this.x > canvas.width / zoomRatio) {
                        this.x = 0;
                    }
                }
            }
            if (!isNaN(angley)) {
                var rady = angley * Math.PI / 180.0;
                this.y = this.y + this.movementSpeed * Math.sin(rady);
                if (switchOk == false) {
                    // Si on sort du cadre, on pop de l'autre coté
                    if (this.y < 0) {
                        this.y = canvas.height / zoomRatio + this.y;
                    }
                    if (this.y > canvas.height / zoomRatio) {
                        this.y = 0;
                    }
                }
            }
        }
        this.updateMovementAnimation();
    }
    // Fonction qui permet de lancer l'animation lors de l'appuis CTRL.
    actionsInGame() {
        if (actions.shoot) {
            if (isCanUse) {
                if (mana >= 0) {
                    mana = mana - 10;
                    isCanUse = false;
                    this.moveManaBar();
                    setTimeout(this.countDown, 1000);
                }
            }
        }
    }
    // Fonction qui permet de verifier si le personnage bouge.
    isMoving() {
        return actions.left || actions.up || actions.right || actions.down;
    }
    // Permet de mettre a jour l'animation du personnage.
    updateMovementAnimation() {
        if (!this.isMoving()) return;

        this.framejump = zoomRatio * (this.keyFrame % 9);

        ++this.animatedFrames;
        if (this.animatedFrames == this.framesPerKeyFrame) {
            ++this.keyFrame;
            this.animatedFrames = 0;
        }
    }
    // Permet de modifier la vitesse de deplacement du personnage en fonction de l'endurance.
    Sprint() {
        if (actions.sprint && stamina >= 0) {
            this.movementSpeed = 0.080;
            this.updateMovementAnimation();
        } else {
            this.movementSpeed = 0.032;
        }
    }
    // Permet de gerer l'endurance du personnage.
    staminaSystem(deltaTime) {
        if (switchOk) {
            if (actions.sprint && this.isMoving()) {
                if (stamina >= 0) {
                    stamina = stamina - deltaTime * staminaMinus;
                }
            } else if (!actions.sprint) {
                if (this.isMoving()) {
                    if (stamina <= 100) {
                        stamina = stamina + deltaTime * staminaMid;
                    }
                } else if (!this.isMoving()) {
                    if (stamina <= 100) {
                        stamina = stamina + deltaTime * staminaPlus;
                    } else if (stamina >= 100 && mana <= 100) {
                        mana = mana + deltaTime * manaPlus;
                    }
                }
            }
            this.moveStaminaBar();
            this.moveManaBar();
        }
    }
    // Permet de metre la taille de les barres du HUD a jours.
    moveStaminaBar() {
        if (switchOk) {
            let barOfStamina = document.getElementById("myStamina");
            let valueOfStamina = document.getElementById("staminaValue");
            valueOfStamina.innerHTML = `${Math.trunc(stamina)}%`;
            barOfStamina.style.width = `${stamina}%`;
        }
    }

    moveLifeBar() {
        if (switchOk) {
            let barOfLife = document.getElementById("myLife");
            let valueOfLife = document.getElementById("lifeValue");
            valueOfLife.innerHTML = `${Math.trunc(life)}%`;
            barOfLife.style.width = `${life}%`;
        }
    }

    moveManaBar() {
        if (switchOk) {
            let barOfMana = document.getElementById("myMana");
            let valueOfMana = document.getElementById("manaValue");
            valueOfMana.innerHTML = `${Math.trunc(mana)}%`;
            barOfMana.style.width = `${mana}%`;
        }
    }
    // Fonction qui permet d'avoir un temp de pause entre deux compétence. 
    countDown() {
        isCanUse = true;
    }
    // Fonction qui affiche un écran de fin de partie a la mort du personnage.
    gameOver() {
        if (life <= 0) {
            dead()
        }
    }
}

class NetPlayer extends Personnage {

    constructor() {
        super();

        this.nickname = "";
    }

    tick(deltaTime) {
        super.tick(deltaTime);
        //smthing else...but i don't know what ^^ !!!
    }

    actionsInGame() {
        super.actionsInGame;
        //Animation Fireball + explose 
    }
}