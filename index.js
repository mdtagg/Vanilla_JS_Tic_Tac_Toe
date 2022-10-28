

(function createBoxes() {
    const boxes = document.querySelector('.container')
    for(let i = 1;i < 10;i++) {
        let box = document.createElement('div')
        box.setAttribute('data-attribute',`${i}`)
        if(i < 3 || i >= 4 && i < 6) {
            box.classList.add('cornerBorder')
        }
        else if (i === 3 || i === 6) {
            box.classList.add('bottomBorder')
        }
        else if (i < 9) {
            box.classList.add('borderRight')
        }
        boxes.appendChild(box)
    }
})()

