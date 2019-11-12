// Definition des bouleens pour les direction de deplacement du personnage

const actions = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "shoot": false,
    "sprint": false
};

// Valeur des direction pour la table des sprite personnages

const DIRECTION = {
    "HAUT": 8,
    "GAUCHE": 9,
    "BAS": 10,
    "DROITE": 11
};

const directionSpeed = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
};

const basepos = {
    // x:7,
    // y:6
    x: 14.5,
    y: 2.3
};

var deplacementOk;
deplacementOk = true;