let backend = "https://jhihyang.pythonanywhere.com"
let $ = id => document.getElementById(id)
let viewLoader = () => $("loader-overlay").style.display = "flex"
let hideLoader = () => $("loader-overlay").style.display = "none"

let pages = ["home", "projects", "contact"]
let pageViewed = "home"
let switchingPages = false

function switchPage(e) {
    let move = pages.indexOf(e.dataset.page) - pages.indexOf(pageViewed)
    if (move != 0 && !switchingPages) {
        switchingPages = true;
        let start = $(pageViewed)
        let end = $(e.dataset.page)
        if (e.dataset.page == "home" || e.dataset.page == "contact") {
            end.style.display = "flex"
        } else {
            end.style.display = "block"
        }
        if (move > 0) {
            end.style.top = "68px"
            start.style.animation = "leftOut 0.5s forwards"
            end.style.animation = "rightIn 0.5s forwards"
        } else {
            start.style.top = "68px"
            start.style.animation = "rightOut 0.5s forwards"
            end.style.animation = "leftIn 0.5s forwards"
        }
        setTimeout(() => {
            start.style.display = "none"
            end.style.top = "68px"
            pageViewed = e.dataset.page
            switchingPages = false
        }, 500)
    }
}

let numCryptoImages = 2
let numAZAImages = 10
let numBookTankImages = 6
let numMinigradImages = 4
let numControllerImages = 11
let numArmImages = 4
let numKewlAIImages = 3

let cryptoPictureIndex = 1
let azaPictureIndex = 1
let booktankPictureIndex = 1
let minigradPictureIndex = 1
let controllerPictureIndex = 1
let armPictureIndex = 1
let kewlaiPictureIndex = 1

$("crypto-picture").src = "images/crypto/1.png"
$("aza-picture").src = "images/aza/1.png"
$("booktank-picture").src = "images/booktank/1.png"
$("minigrad-picture").src = "images/minigrad/1.png"
$("controller-picture").src = "images/controller/1.png"
$("arm-picture").src = "images/arm/1.png"
$("kewlai-picture").src = "images/kewlai/1.png"

function switchImage(project, right) {
    if (project == "crypto") {
        if (right) {
            cryptoPictureIndex++
        } else {
            cryptoPictureIndex--
        }
        if (cryptoPictureIndex > numCryptoImages) {
            cryptoPictureIndex = 1
        } else if (cryptoPictureIndex < 1) {
            cryptoPictureIndex = numCryptoImages
        }
        $("crypto-picture").src = `images/crypto/${cryptoPictureIndex}.png`
    } else if (project == "aza") {
        if (right) {
            azaPictureIndex++
        } else {
            azaPictureIndex--
        }
        if (azaPictureIndex > numAZAImages) {
            azaPictureIndex = 1
        } else if (azaPictureIndex < 1) {
            azaPictureIndex = numAZAImages
        }
        $("aza-picture").src = `images/aza/${azaPictureIndex}.png`
    } else if (project == "booktank") {
        if (right) {
            booktankPictureIndex++
        } else {
            booktankPictureIndex--
        }
        if (booktankPictureIndex > numBookTankImages) {
            booktankPictureIndex = 1
        } else if (booktankPictureIndex < 1) {
            booktankPictureIndex = numBookTankImages
        }
        $("booktank-picture").src = `images/booktank/${booktankPictureIndex}.png`
    } else if (project == "minigrad") {
        if (right) {
            minigradPictureIndex++
        } else {
            minigradPictureIndex--
        }
        if (minigradPictureIndex > numMinigradImages) {
            minigradPictureIndex = 1
        } else if (minigradPictureIndex < 1) {
            minigradPictureIndex = numMinigradImages
        }
        $("minigrad-picture").src = `images/minigrad/${minigradPictureIndex}.png`
    } else if (project == "controller") {
        if (right) {
            controllerPictureIndex++
        } else {
            controllerPictureIndex--
        }
        if (controllerPictureIndex > numControllerImages) {
            controllerPictureIndex = 1
        } else if (controllerPictureIndex < 1) {
            controllerPictureIndex = numControllerImages
        }
        $("controller-picture").src = `images/controller/${controllerPictureIndex}.png`
    } else if (project == "arm") {
        if (right) {
            armPictureIndex++
        } else {
            armPictureIndex--
        }
        if (armPictureIndex > numArmImages) {
            armPictureIndex = 1
        } else if (armPictureIndex < 1) {
            armPictureIndex = numArmImages
        }
        $("arm-picture").src = `images/arm/${armPictureIndex}.png`
    } else if (project == "kewlai") {
        if (right) {
            kewlaiPictureIndex++
        } else {
            kewlaiPictureIndex--
        }
        if (kewlaiPictureIndex > numKewlAIImages) {
            kewlaiPictureIndex = 1
        } else if (kewlaiPictureIndex < 1) {
            kewlaiPictureIndex = numKewlAIImages
        }
        $("kewlai-picture").src = `images/kewlai/${kewlaiPictureIndex}.png`
    }
}

function post(msg) {
    return fetch(backend, {
        method: "POST",
        body: JSON.stringify(msg)
    }).then(response => response.json())
}

post({
    action: "visit"
}).then(() => {}).catch(() => {})

function submitMessage() {
    viewLoader()
	let msg = {
		action: "submitMessage"
	};
	["name", "email", "message"].forEach(attribute => msg[attribute] = $(`contact-form-${attribute}`).value)
    setTimeout(() => {
        post(msg).then(() => {
            ["name", "email", "message"].forEach(attribute => $(`contact-form-${attribute}`).value = "")
            hideLoader()
        }).catch(() => {
            hideLoader()
        })
    }, 500)
    return false
}

function clickProjects() {
    $("header-nav").childNodes[3].click()
}

if (window.location.href.endsWith("#projects")) {
    clickProjects()
}

