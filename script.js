function toNarrowVariant() {
    document.querySelector('.restricter').style.width = '700px';
    for (let element of document.querySelectorAll('.row>.executor-cell:last-child')) {
        element.style.flex = '0 1 0';
        element.style.overflow = 'hidden';
        element.style.width = '0';
    }
}
function toWideVariant() {
    document.querySelector('.restricter').style.width = '840px';
    for (let element of document.querySelectorAll('.row>.executor-cell:last-child')) {
        element.style.flex = '1 1 0';
        element.style.width = '0';
    }
}