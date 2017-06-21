'use strict';

var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var busMallItems = [];

var showCount = 0;

// Store constructor
function Item (name, shown, clicked) {
  this.name = name;
  this.shown = shown;
  this.clicked = clicked;
}

function setup () {
  for(var i = 0 ; i < images.length ; i++) {
    busMallItems[i] = new Item(images[i], 0, 0);
  }
}

setup();

function renderBusMallImages (busmallItems) {
  var busMallImagesParent = document.getElementById('busMallImagesParent');
  var img = document.createElement('img');
  img.setAttribute('src', 'images/' + busmallItems);
  img.setAttribute('width','30%');
  img.setAttribute('id', busmallItems);
  busMallImagesParent.append(img);
}

function pickRandomItem () {
  var index = Math.floor(Math.random() * busMallItems.length);
  return busMallItems[index].name;
}

function showItemSet() {
  showCount++;

  var item1 = pickRandomItem();
  var item2 = pickRandomItem();
  var item3 = pickRandomItem();

  renderBusMallImages(item1);
  renderBusMallImages(item2);
  renderBusMallImages(item3);
}

showItemSet();

busmallImagesParent.addEventListener('click', function (event) {
  var picked = event.target.getAttribute('id');
  event.preventDefault();

  for(var i = 0; i < busMallItems.length; i++) {
    if(busMallItems[i].name == picked) {
      busMallItems[i].clicked++;
      if(clicked >= 25)
      {even.stopPropagation();}
    }
  }
});

// function chart () {
//   var canvas = document.getElementById('myChart');
//   var ctx = canvas.getContext('2d');
// }
