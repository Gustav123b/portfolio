const hoverElements = document.querySelectorAll(".hover-area");
const premoveCard = document.querySelector(".project-premove")

// 3D card animation
const offsetTop = premoveCard.offsetTop
const THRESHOLD = 15;

hoverElements.forEach(hover => {
    const parent = hover.parentElement

    parent.addEventListener("mousemove", e => {
        handleHover(e, parent)
    });
    parent.addEventListener("mouseout", e => {
        resetStyles(e, parent)
    });
})

function handleHover(event, element) {
    const { clientX, clientY, currentTarget } = event;
    let { clientWidth, clientHeight, offsetLeft } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    let rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    let rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    rotateX *= 0.3;
    rotateY *= 0.3;

    if (rotateX < -2.5) rotateX = -2.5
    else if (rotateX > 2.5) rotateX = 2.5

    element.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
}

function resetStyles(event, element) {
    element.style.transform = `perspective(${event.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}


/* === Custom cursor === */

const cursor = document.querySelector(".cursor")
let child = cursor.getElementsByTagName("div")[0];
let cursorStyle = getComputedStyle(cursor)
let cursorSize = cursorStyle.width
cursorSize = cursorSize.replace("px", "")

document.addEventListener("mousemove", e => {
    cursor.setAttribute("style", `top: ${e.pageY - scrollY}px; left: ${e.pageX}px`)
})


// Cursor pointer
const cursorHoverElements = document.querySelectorAll(".cursor-hover")

cursorHoverElements.forEach(hoverElement => {
    hoverElement.addEventListener("mouseover", e => {
        if (child.classList.contains("cursor-pointer")) return false

        child.classList.toggle("cursor-default")
        child.classList.toggle("cursor-pointer")
    })

    hoverElement.addEventListener("mouseout", e => {
        if (isDescendant(hoverElement, e.relatedTarget)) return false

        child.classList.toggle("cursor-default")
        child.classList.toggle("cursor-pointer")
    })
})

// Cursor link

const cursorHoverLinkElements = document.querySelectorAll(".cursor-hover-link")

cursorHoverLinkElements.forEach(hoverElement => {
    let child = cursor.getElementsByTagName("div")[0];

    hoverElement.addEventListener("mouseover", e => {
        child.classList.toggle("cursor-link")
    })

    hoverElement.addEventListener("mouseout", e => {
        if (isDescendant(hoverElement, e.relatedTarget)) return false

        child.classList.toggle("cursor-link")
    })
})

// Cursor click

document.addEventListener("click", () => {
    child.classList.add("cursor-click")

    setTimeout(() => {
        child.classList.remove("cursor-click")
    }, 400);
})


function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function rectangleCollision(r1, r2) {
    return (
        r1.x + r1.width >= r2.x &&
        r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height
    )
}


// Button animation on card
const btnProject = document.querySelectorAll(".btn-project")

btnProject.forEach(btn => {
    let rect = btn.getBoundingClientRect()
    let element = { x: btn.offsetLeft, y: btn.offsetTop, width: rect.width, height: rect.height }

    btn.addEventListener("mouseover", e => {
        if (btn.classList.contains("btn-border"))
            btn.classList.add("btn-filled-hover")

        else if (btn.classList.contains("btn-filled"))
            btn.classList.add("btn-filled-hover-2")

    })

    btn.addEventListener("mouseout", e => {
        if (e.offsetY <= 0 || e.offsetY >= element.height - 3 || e.offsetX <= 0 || e.offsetX >= element.width - 3) {
            if (btn.classList.contains("btn-border"))
                btn.classList.remove("btn-filled-hover")

            else if (btn.classList.contains("btn-filled"))
                btn.classList.remove("btn-filled-hover-2")
        }
    })
})


// Scroll

function scrollToClass(e) {
    let element = document.querySelector(`.${e}`)
    window.scroll({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}


// Navbar

const navMenuBtn = document.querySelector(".menu-btn")
const navMenu = document.querySelector(".menu-open")

navMenuBtn.addEventListener("click", e => {
    console.log("asd")
    navMenu.classList.toggle("none")
})


/* === Fade in animation ===  */

const fadeInElements = document.querySelectorAll('[data-fade-dir]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        let e = entry.target
        let fadeDirection = capitalizeFirstLetter(e.dataset.fadeDir);
        let fadeDuration = (e.dataset.fadeDur == undefined) ? 0.5 : e.dataset.fadeDur;
        let fadeDelay = (e.dataset.fadeDelay == undefined) ? 0 : e.dataset.fadeDelay;

        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeIn${fadeDirection}Animation ${fadeDuration}s ease-out forwards ${fadeDelay}s`
            observer.unobserve(entry.target)
        }
    })
},
    {
        threshold: 0.4,
    }
)

fadeInElements.forEach(element => {
    observer.observe(element)
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
