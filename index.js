
const boxes = document.querySelector('.container')

function createBoxes() {
    for(let i = 1;i < 10;i++) {
        let box = document.createElement('div')
        box.setAttribute('data-attribute',`${i}`)
        if(i < 3) {
            box.classList.add('cornerBorder')
        }
        else if (i === 3 || i === 6) {
            box.classList.add('bottomBorder')
        }
        else if (i < 6) {
            box.classList.add('cornerBorder')
        }else if (i < 9) {
            box.classList.add('borderRight')
        }
        boxes.appendChild(box)
    }
}


createBoxes()

// for(let i = 1;i < 10;i++) {
//     console.log(i)
//     let box = document.createElement('div')
//     if(i % 3 === 0 && i !== 9) {
//         box.style.borderBottom = '1px solid black'
//     }else if(i > 6 && i !== 9) {
//         box.style.borderRight = '1px solid black'
//     }else {
//         box.classList.add('blackBorder')
//     }
// }