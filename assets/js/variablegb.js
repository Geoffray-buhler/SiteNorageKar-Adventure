// Definition des bouleens pour les direction de deplacement du personnage

const actions = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "shoot": false,
    "sprint": false
};
//valeur de chaque action
var actionSum = 0;

const actionValue = {
    "down": 10,
    "up": 100,
    "left": 1000,
    "right": 10000
};

var actionAngleToValue = {
    10: 90,
    100: 270,
    1000: 180,
    10000: 0
};

// Valeur des direction pour la table des sprite personnage

const DIRECTION = {
    "HAUT": 8,
    "GAUCHE": 9,
    "BAS": 10,
    "DROITE": 11
};

// Valeur de la vitesse de deplacement du personnage

const directionSpeed = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
};

// Position de base du personnage

const basepos = {
    x: 14.5,
    y: 2.3
};

// Taille du canvas

const screenSize = {
    x: window.innerHeight,
    y: window.innerWidth
};

const canvasSize = {
    x: document.body.scrollHeight,
    y: document.body.scrollWidth
};

// Ratio de Zoom du personnage
const zoomRatio = 64;

// Valeur par default de deplacementOk

var deplacementOk = {
    up: true,
    down: true,
    right: true,
    left: true
};
var isCanUse = true;
var isDead = false;
var isOnButton = false;

var life = 100;

var stamina = 100;

var mana = 10;

var canChange = true;

var currentPage = document.getElementById("page01");
var otherPage = document.getElementById("page02");

const superDiv = document.getElementById("super-div");
const gameOver = document.getElementById("game-over");

//progress Bar 

var staminaMinus = 0.02;
var staminaMid = 0.005;
var staminaPlus = 0.01;
var manaPlus = 0.001;

// initialisation des projectiles

const zoomRatioproj = 64;

const DIRECTIONPROJ = {
    "GAUCHE": 1,
    "HAUTGAUCHE": 2,
    "HAUT": 3,
    "HAUTDROITE": 4,
    "DROITE": 5,
    "BASDROITE": 6,
    "BAS": 7,
    "BASGAUCHE": 8
};

const speedproj = 0.5;