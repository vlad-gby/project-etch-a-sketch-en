const scratchpad = document.querySelector('.scratchpad');
const contWidth = 800;
const contHeight = 400;

// CREATE A GRID
function createGrid(pxlside){
  if(document.querySelector('.pixel') !== null){
    const divs = document.querySelectorAll('.pixel');
    divs.forEach((e) => {
      e.remove();
    });
  }

  for(let i = 0; i < (contWidth / pxlside) * (contHeight / pxlside); i++){
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    scratchpad.appendChild(pixel);
  }

  let pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.style.width = pxlside + 'px';
    pixel.style.height = pxlside + 'px';
  });
}
createGrid(16);

// CONTROLS
const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
  btn.addEventListener('mouseover', e => {
    btn.style.backgroundColor = 'rgb(48, 119, 10)';
  });
  btn.addEventListener('mouseout', e => {
    btn.style.backgroundColor = 'rgb(39, 98, 7)';
  });
  btn.addEventListener('mousedown', e => {
    btn.style.border = '2px solid rgb(135, 242, 28)';
  });
  btn.addEventListener('mouseup', e => {
    btn.style.border = '2px solid rgb(0,0,0,0)';
    switch(e.target.id){
      case '1':
        createGrid(40);
      break;
      case '2':
        createGrid(36.366);
      break;
      case '3':
        createGrid(16);
      break;
      case '4':
        createGrid(8);
      break;
      case '5':
        createGrid(4);
        {const pixels = document.querySelectorAll('.pixel');
        pixels.forEach((pixel) => {
          pixel.style.border = 'none';
        });}
      break;
      case '6':
        createGrid(2);
        {const pixels = document.querySelectorAll('.pixel');
        pixels.forEach((pixel) => {
          pixel.style.border = 'none';
        });}
      break;
      case 'clear':
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach((pixel) => {
          pixel.style.backgroundColor = 'white';
        });
      break;
    }
  });
});

// PAINT
function paintHandler(){
  if(feature){
    switch (feature){
      case 'opacity':
        changingOpacity(this);
      break;
      case 'color':
        changingColor(this);
      break;
    }
    return;
  }
  this.style.backgroundColor = mainColor;
}


scratchpad.addEventListener('mousedown', e => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', paintHandler);
    pixel.addEventListener('click', paintHandler);

    pixel.addEventListener('mouseup', () => {
      pixels.forEach((pixel) => {
        pixel.removeEventListener('mouseover', paintHandler);
      });
    });
    
  });
});

// ADDITIONAL FEATURES BUTTONS
let feature;
const opacityBtn = document.querySelector('.opacity-btn');
const colorBtn = document.querySelector('.color-btn');
const removeFeatures = document.querySelector('.remove-features');

opacityBtn.addEventListener('mouseup', function(){
  feature = 'opacity';
});
colorBtn.addEventListener('mouseup', function(){
  feature = 'color';
});
removeFeatures.addEventListener('mouseup', function(){
  feature = '';
});

// CHANGE OPACITY FEATURE
function changingOpacity(element){
  const bg = getComputedStyle(element).backgroundColor;
  if(bg == mainColor) return;

  if(bg.at(3) != 'a' && bg != 'rgb(255, 255, 255)') {// IF IT'S SOLID COLOR
    element.style.backgroundColor = mainColor;
    return;
  }

  if(bg == 'rgb(255, 255, 255)'){ // IF THE PIXEL IS WHITE
    let color = mainColor.split('');
    color.splice(3,0,'a');
    color.splice(color.indexOf(')'), 0, ', 0.1');
    color = color.join('');

    element.style.backgroundColor = color;
    return;
  }

  let currOpacity = Number(bg.split(',')[3].replace(')', ''));
  if(currOpacity != 1){// IF IT HAS A SHADE
    const finalOpacity = currOpacity + 0.1;
    let finColor = mainColor.split(',');
    finColor[0] = finColor[0].slice(4,8);
    finColor = finColor.join() + ',';
    finColor = finColor.replace(')', '');
    console.log(finColor);

    element.style.backgroundColor = `rgba(${finColor} ${finalOpacity})`
  }
}

function changingColor(element){
  const bg = getComputedStyle(element).backgroundColor;
  const red = Math.floor(Math.random()*200 + 1) + 50;
  const green = Math.floor(Math.random()*200 + 1) + 50;
  const blue = Math.floor(Math.random()*200 + 1) + 50;
  element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}

// WORKING WITH COLORS
const inputColor = document.querySelector('#add-color');
const pallette = document.querySelector('.pallette');
const colorSubmit = document.querySelector('.submit-clr');
const colorDel = document.querySelector('.delete-clr');
let colors = document.querySelectorAll('.color');
let mainColor = 'rgb(135, 242, 28)';

function makeMainColor(colorBtn){
  if(!colorBtn.classList.contains('color')) return;
  colors.forEach(button => {
    button.children[0].style.display = 'none';
    button.classList.remove('selected');
  });
  mainColor = getComputedStyle(colorBtn).backgroundColor;

  colorBtn.children[0].style.display = 'block';
  colorBtn.classList.add('selected');
}

colors[0].addEventListener('mouseup', e => {
  makeMainColor(e.target);
});

colorSubmit.addEventListener('mouseup', e => {
  newColor = document.querySelector('.color:last-child').cloneNode(true);
  newColor.style.backgroundColor = inputColor.value;
  newColor.addEventListener('mouseup', e => {
    makeMainColor(e.target);
  });
  
  pallette.appendChild(newColor);
  colors = document.querySelectorAll('.color');
  makeMainColor(newColor);
});

colorDel.addEventListener('mouseup', e => {
  if(!colors[1]) return;
  document.querySelector('.selected').remove();
  colors = document.querySelectorAll('.color');
  makeMainColor(colors[0]);
});





