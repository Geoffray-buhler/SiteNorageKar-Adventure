class Projectiles {
    constructor(pictureFileName, x, y, direction) {
        this.x = x; // (en cases)
        this.y = y; // (en cases)
        this.direction = direction;

        // Chargement de l'image dans l'attribut image
        this.image = new Image();
        this.image.referenceDuPerso = this;
        this.framejump = 0;
        this.image.onload = function () {
            if (!this.complete)
                throw "Erreur de chargement du sprite nomm� \"" + url + "\".";

            // Taille du projectile
            this.referenceDuPerso.width = this.width / 8;
            this.referenceDuPerso.height = this.height / 8;
        }
        // lien sur l'image
        this.image.src = ASSETS_PATH + pictureFileName;

        // Configuration des deplacement du projectile

        this.keyFrame = 0;
        this.framesPerKeyFrame = 7;
        this.animatedFrames = 0;
    }

    dessinerProjectile(context) {
        context.drawImage(
            this.image,
            this.framejump, this.direction * this.height, // Point d'origine du rectangle source � prendre dans notre image
            this.width, this.height, // Taille du rectangle source (c'est la taille du projectile)
            (this.x * zoomRatioproj) - (this.width / 2) + zoomRatioproj / 2, (this.y * zoomRatioproj) - this.height + zoomRatioproj / 4, // Point de destination (d�pend de la taille du projectile)
            this.width, this.height) // Taille du rectangle destination (c'est la taille du projectile)
    }
}