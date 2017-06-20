'use strict';

var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var busMallItems = [];
var busMallImagesParent = document.getElementById('busmallImagesParent');
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

function showItemSet() {
  showCount++;

  var item1 = generateRandomItem();
  var item2 = generateRandomItem();
  var item3 = generateRandomItem();

  renderBusMallImages(item1);
  renderBusMallImages(item2);
  renderBusMallImages(item3);
}

showItemSet();

busmallImagesParent.addEventListener('click', function (event) {
  var picked = event.target.getAttribute('id');

  for(var i = 0; i < busMallItems.length; i++) {
    if(busMallItems[i].name == picked) {
      busMallItems[i].clicked++;
    }
  }
});

function generateRandomItem () {
  var index = Math.floor(Math.random() * busMallItems.length);
  return busMallItems[index].name;
}

function renderBusMallImages (busmallItems) {
  var img = document.createElement('img');
  img.setAttribute('src', 'images/' + busmallItems);
  img.setAttribute('id', busmallItems);
  busMallImagesParent.append(img);
}
