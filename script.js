// cet objet contient
function Model() {
    model = this

    // toutes les variables ci-dessous sont les éléments HTML que nous voudrons accéder et modifier
    this.sectionsMain = null
    this.sectionsConteneurAvant = null
    this.sectionsConteneurArriere = null

    this.dynamiqueExterieur = null
    this.dynamiqueInterieurs = null

    this.imageExterieur = null
    this.imageInterieur = null

    // cette variable indique l'index de la section active dans la liste des sections
    this.sectionActive = 0
    // cette variable indique si le statut de la section vient de changer; cela permet au view de savoir quand il doit changer l'état des éléments
    this.sectionChangee = false

    // ces variables indiquent si les animations sont activés
    this.dynamiqueActif = false
    this.imageActif = false

    // ces variables indiquent si l'état des animations a changé; cela permet au view de savoir quand il doit changer l'état des éléments
    this.dynamiqueChangee = false
    this.imageChangee = false

    // fonction pour aller obtenir les objets HTML nécessaires
    this.initialize = function() {
        // TODO: utiliser document.getElementByClassName() pour obtenir les éléments
        model.dynamiqueExterieur = document.getElementsByClassName("animation dynamique exterieur")[0]
        model.dynamiqueInterieurs = document.getElementsByClassName("animation dynamique interieur")

        model.imageExterieur = document.getElementsByClassName("animation image conteneur exterieur")[0]
        model.imageInterieur = document.getElementsByClassName("animation image conteneur interieur")[0]
    }

    // fonction pour mettre à jour l'état de toutes les animations
    this.update = function() {
        // TODO: obtenir la position des éléments sur l'écran, et décider de l'état des animations selon leur position relative à la fenêtre. on veut déclancher l'animation quand l'élément dépasse le tiers inférieur de l'écran

        model.dynamiqueActif = model.dynamiqueExterieur.getBoundingClientRect().top < 2 / 3 * window.innerHeight
        model.imageActif = model.imageExterieur.getBoundingClientRect().top < 2 / 3 * window.innerHeight

    }
}

// cet objet contient toutes les méthodes qui définissent le visuel du site
function View() {
    view = this

    // fonction pour tout mettre à jour
    this.update = function(model) {
        // TODO: utiliser model pour vérifier qu'est-ce qu'on doit mettre à jour, puis appeler updateBarre / updateDynamique / updateImage au nécessaire
        // attention! une fois qu'on a mis les choses à jour, il faut le marquer dans le modèle (sectionChangee / dynamiqueChangee / imageChangee reviennent à false)
        view.updateDynamique(model)
        view.updateImage(model)
    }

    // fonction pour mettre à jour le style de la barre lors des animations
    this.updateBarre = function(model) {
        // TODO: appliquer le style approprié sur la barre
    }

    // fonction pour mettre à jour dynamique lors des animations
    this.updateDynamique = function(model) {
        // TODO: appliquer le style approprié sur dynamique
        if (model.dynamiqueActif) {
            for (let i = 0; i < model.dynamiqueInterieurs.length; i++) {
                setTimeout(function() {
                    model.dynamiqueInterieurs[i].classList.add('active')
                }, i * 200)
            }
        } else {
            for (let i = 0; i < model.dynamiqueInterieurs.length; i++) {
                setTimeout(function() {
                    model.dynamiqueInterieurs[i].classList.remove('active')
                }, i * 200)
            }
        }

    }

    // fonction pour mettre à jour l'image lors des animations
    this.updateImage = function(model) {
        // TODO: appliquer le style approprié sur l'image
        if (model.imageActif) {
            model.imageInterieur.classList.add("active")
        } else {
            model.imageInterieur.classList.remove("active")
        }
    }
}

// cet objet lie le model au view et orchertre leurs réactions aux événements
function Controller(model, view) {
    controller = this
    this.model = model
    this.view = view

    // lie les événements aux fonctions du modèle et du view qui provoquent des changements dans la page
    this.initialize = function() {
        // TODO: lier la mise à jour du controller à l'événement document.onscroll
        document.addEventListener("scroll", controller.update)
    }

    // mets à jour toute la page
    this.update = function() {
        // TODO: mettre à jour le modèle
        // TODO: mettre à jour le view
        model.update()
        view.update(model)
    }
}

// on attend que la fenêtre soit prête avant de commencer à initialiser notre code
window.addEventListener("load", function() {
    // on crée notre view et notre modèle et on les initialise
    let view = new View()
    let model = new Model()
    model.initialize()

    // on crée notre controller en le liant au view et au model, puis on l'initialise
    let controller = new Controller(model, view)
    controller.initialize()
})