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

const canvasSize = {
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

function scrollok() {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 0) {
        scrollBy(0, -5);
        setTimeout(scrollok, 5);
    }
    return true;
}

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
    } else if (evt.key == "ArrowUp") {
        actions.up = false;
    } else if (evt.key == "ArrowLeft") {
        actions.left = false;
    } else if (evt.key == "ArrowRight") {
        actions.right = false;
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