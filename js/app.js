'use strict';

var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var busMallItems = [];
var backupItems = [];

// Item constructor
function Item (name, shown, clicked) {
  this.name = name;
  this.shown = shown;
  this.clicked = clicked;
}

// Generating bus mall items array
function setup () {
  for(var i = 0 ; i < images.length ; i++) {
    busMallItems[i] = new Item(images[i], 0, 0);
  }

  updateShowCountElement();
}
setup();

function imageClick(event) {
  var clickedImageName = event.target.getAttribute('id');
  event.preventDefault();

  for(var i = 0; i < backupItems.length; i++) {
    if(backupItems[i].name == clickedImageName) {
      backupItems[i].clicked++;
    }
  }

  decrementShowCount();
  if(getShowCount() == 0) {

    for(i = 0; i < backupItems.length ; i++) {
      busMallItems.push(backupItems[i]);
    }

    showChart();
    deleteShowCount();

  } else {

    showThreeImages();

  }
}

function showThreeImages() {
  var item1 = pickRandomItem();
  busMallItems.splice(busMallItems.indexOf(item1), 1);
  var item2 = pickRandomItem();
  busMallItems.splice(busMallItems.indexOf(item2), 1);
  var item3 = pickRandomItem();
  busMallItems.splice(busMallItems.indexOf(item3), 1);

  removeExistingImages();

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

showThreeImages();

function pickRandomItem () {
  var index = Math.floor(Math.random() * busMallItems.length);
  return busMallItems[index];
}

function removeExistingImages() {
  var busMallImagesParent = document.getElementById('busMallImagesParent');
  busMallImagesParent.innerHTML = '';
}

function renderBusMallImages (item) {
  var busMallImagesParent = document.getElementById('busMallImagesParent');
  var img = document.createElement('img');
  img.setAttribute('src', 'images/' + item.name);
  img.setAttribute('width','30%');
  img.setAttribute('id', item.name);
  img.addEventListener('click', imageClick);
  busMallImagesParent.append(img);

  item.shown++;
}

function showChart() {
  removeExistingImages();
  var labels = [];
  var data = [];
  for(var i = 0; i < busMallItems.length; i++) {
    labels[i] = busMallItems[i].name;
    data[i] = busMallItems[i].clicked;
  }

  var container = document.getElementById('myChart');
  var ctx = container.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: data
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });

  myChart.update();
}

function decrementShowCount() {
  var showCount = getShowCount();
  showCount--;
  createOrUpdateShowElement(showCount);
  updateShowCountElement();
}

function getShowCount () {
  var showCount = localStorage.getItem('showCount');
  if (showCount !== null) {
    showCount = parseInt(showCount);
  } else {
    showCount = 25;
  }

  return showCount;
}

function updateShowCountElement() {
  document.getElementById('remaining').innerHTML = getShowCount();
}

function createOrUpdateShowElement(value) {
  value = value.toString();
  localStorage.setItem('showCount', value);
  var showCount = localStorage.getItem('showCount');
  return showCount;
}

function deleteShowCount() {
  localStorage.removeItem('showCount');
}
