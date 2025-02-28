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

numImages = {
    "booktank": 6,
    "minigrad": 4,
    "minirt": 2,
    "mips": 1,
    "hlsyn": 3,
    "cmm": 2,
    "aza": 6,
    "optizona": 3,
}

imageIndices = {}

for (let key in numImages) {
    imageIndices[key] = 1
    $(`${key}-picture`).src = `images/${key}/${imageIndices[key]}.png`
}

function switchImage(project, right) {
    if (right) {
        imageIndices[project]++
    } else {
        imageIndices[project]--
    }
    if (imageIndices[project] > numImages[project]) {
        imageIndices[project] = 1
    } else if (imageIndices[project] < 1) {
        imageIndices[project] = numImages[project]
    }
    $(`${project}-picture`).src = `images/${project}/${imageIndices[project]}.png`
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
