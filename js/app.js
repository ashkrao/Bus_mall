'use strict';

var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var busMallItems = [];
var backupItems = [];

var showCount = 25;

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

function imageClick(event) {
  var picked = event.target.getAttribute('id');
  event.preventDefault();

  for(var i = 0; i < backupItems.length; i++) {
    if(backupItems[i].name == picked) {
      backupItems[i].clicked++;
      if(showCount == 1)
      {
        event.stopPropagation();
      } else {
        showItemSet();
      }
    }
  }
}

function renderBusMallImages (busMallItem) {
  var busMallImagesParent = document.getElementById('busMallImagesParent');
  var img = document.createElement('img');
  img.setAttribute('src', 'images/' + busMallItem.name);
  img.setAttribute('width','30%');
  img.setAttribute('id', busMallItem.name);
  img.addEventListener('click', imageClick);
  busMallImagesParent.append(img);

  busMallItem.shown++;
}

function pickRandomItem () {
  var index = Math.floor(Math.random() * busMallItems.length);
  return busMallItems[index];
}

function showItemSet() {
  showCount--;
  document.getElementById('remaining').innerHTML = showCount;

  var item1 = pickRandomItem();
  busMallItems.splice(busMallItems.indexOf(item1), 1);
  var item2 = pickRandomItem();
  busMallItems.splice(busMallItems.indexOf(item2), 1);
  var item3 = pickRandomItem();
  busMallItems.splice(busMallItems.indexOf(item3), 1);

  var busMallImagesParent = document.getElementById('busMallImagesParent');
  busMallImagesParent.innerHTML = '';

  renderBusMallImages(item1);
  renderBusMallImages(item2);
  renderBusMallImages(item3);

  for(var i = 0; i < backupItems.length ; i++) {
    busMallItems.push(backupItems[i]);
  }

  backupItems[0] = item1;
  backupItems[1] = item2;
  backupItems[2] = item3;
}

showItemSet();

// function chart () {
//   var canvas = document.getElementById('myChart');
//   var ctx = canvas.getContext('2d');
// }
