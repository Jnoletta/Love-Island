let profiles = document.querySelectorAll(".profile");

const maxAngle = 42;
const smooth = 0.3;
const threshold = 42
const thresholdMax = 150;

profiles.forEach(setupDragAndDrop);

function setupDragAndDrop(profile) {
    console.log(profile);
    const hammertime = new Hammer(profile);

    hammertime.on("pan", function(e) {
        profile.classList.remove("profile--back");
        let posX = e.deltaX;
        let posY = Math.max(0 ,Math.abs(posX * smooth) -  threshold);
        let angle = Math.min(Math.abs(e.deltaX * smooth / 100), 1)* maxAngle;
        if (e.deltaX <0) {
            angle *= -1
        }

        profile.style.transform = `translateX(${posX}px) translateY(${posY}px) rotate(${angle}deg) `
        profile.classList.remove("profile--matching")
        profile.classList.remove("profile--nexting")
            if (posX > thresholdMax) {
                profile.classList.add("profile--matching");
            } else if (posX < -thresholdMax) {
                profile.classList.add("profile--nexting")
            } 



        if (e.isFinal) {
            profile.style.transform = "";
            if (posX > thresholdMax) {
                profile.classList.add("profile--match");
            } else if (posX < -thresholdMax) {
                profile.classList.add("profile--next")
            } else {
                profile.classList.add("profile--back")
            }
        }
    })
}

// Session storage pour joueur pour enregistrer le score
// Utiliser profile--next / --match afin d'enregistrer les bonnes réponses dans une liste/objet
// Comparer le résultat match/next avec les listes.json. Si match = coupable += 1 sinon 0. 