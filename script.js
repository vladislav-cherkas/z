function toNarrowVariant() {
    document.querySelector('.restricter').style.width = '700px';
    for (let element of document.querySelectorAll('.row>.executor-cell:last-child')) {
        element.style.flex = '0 1 0';
        element.style.overflow = 'hidden';
        element.style.width = '0';
    }
    for (let element of document.querySelectorAll('.row>.day-cell:last-child')) {
        element.style.flexGrow = '0';
        element.style.overflow = 'hidden';
        element.style.width = '0';
    }
}
function toWideVariant() {
    document.querySelector('.restricter').style.width = '840px';
    for (let element of document.querySelectorAll('.row>.executor-cell:last-child')) {
        element.style.flex = '1 1 0';
    }
    for (let element of document.querySelectorAll('.row>.day-cell:last-child')) {
        element.style.flexGrow = '1';
        element.style.width = 'auto';
    }
}
function pickRandomOption(element) {
    const options = element.options;
    if (options.length > 0) {
        const randomIndex = Math.floor(Math.random() * options.length);
        element.selectedIndex = randomIndex;
    }
}
function pickRandomOptionAll() {
    for (let element of document.querySelectorAll('.executor-cell>select')) {
        pickRandomOption(element);
    }
}
function clearOptionAll() {
    for (let element of document.querySelectorAll('.executor-cell>select')) {
        element.selectedIndex = 0;
    }
}