'use strict';

var busmallItems = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var busmallImagesParent = document.getElementById('busmallImagesParent');

function setup () {
  var item1 = generateRandomItem();
  var item2 = generateRandomItem();
  var item3 = generateRandomItem();

  renderbusmallImages(item1);
  renderbusmallImages(item2);
  renderbusmallImages(item3);
}

setup();

busmallImagesParent.addEventListener('click', function (event) {
  var picked = event.target.getAttribute('id');
});

function generateRandomItem () {
  var index = Math.floor(Math.random() * busmallItems.length);
  return busmallItems[index];
}

function renderbusmallImages (busmallItems) {
  var img = document.createElement('img');
  img.setAttribute('src', 'images/' + busmallItems);
  img.setAttribute('id', busmallItems);
  busmallImagesParent.append(img);
}
