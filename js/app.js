'use strict';

var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

// Item constructor
function Item (name, shown, clicked) {
  this.name = name;
  this.shown = shown;
  this.clicked = clicked;
}

// Generating bus mall items array
function setup () {
  var busMallItems = getItems();
  if(busMallItems == null) {
    busMallItems = [];
    for(var i = 0 ; i < images.length ; i++) {
      busMallItems[i] = new Item(images[i], 0, 0);
    }
    saveItems(busMallItems);
  }
  displayAttempts();
}
setup();

function imageClick(event) {
  var clickedImageName = event.target.getAttribute('id');
  event.preventDefault();

  var displayedItems = getDisplayedItems();
  for(var i = 0; i < displayedItems.length; i++) {
    displayedItems[i].shown++;
    if(displayedItems[i].name == clickedImageName) {
      displayedItems[i].clicked++;
    }
  }
  saveDisplayedItems(displayedItems);

  decrementAttempts();
  if(getAttempts() == 0) {

    var busMallItems = getItems();
    for(i = 0; i < displayedItems.length ; i++) {
      busMallItems.push(displayedItems[i]);
    }
    saveItems(busMallItems);

    removeExistingImages();
    showClickTable();
    showChart();
    deleteAttempts();
    deleteItems();
    deleteDisplayedItems();
  } else {

    showThreeImages();

  }
}

function showThreeImages() {
  var busMallItems = getItems();

  var item1 = pickRandomItem(busMallItems);
  busMallItems.splice(busMallItems.indexOf(item1), 1);
  var item2 = pickRandomItem(busMallItems);
  busMallItems.splice(busMallItems.indexOf(item2), 1);
  var item3 = pickRandomItem(busMallItems);
  busMallItems.splice(busMallItems.indexOf(item3), 1);

  removeExistingImages();

  renderBusMallImages(item1);
  renderBusMallImages(item2);
  renderBusMallImages(item3);

  var displayedItems = getDisplayedItems();
  if(displayedItems == null) {
    displayedItems = [];
  }

  for(var i = 0; i < displayedItems.length ; i++) {
    busMallItems.push(displayedItems[i]);
  }

  displayedItems[0] = item1;
  displayedItems[1] = item2;
  displayedItems[2] = item3;

  saveItems(busMallItems);
  saveDisplayedItems(displayedItems);
}

showThreeImages();

function pickRandomItem (busMallItems) {
  var index = Math.floor(Math.random() * busMallItems.length);
  return busMallItems[index];
}

function removeExistingImages() {
  var busMallImagesParent = document.getElementById('busMallImagesParent');
  busMallImagesParent.innerHTML = '';
}

function renderBusMallImages (item) {
  var busMallImagesParent = document.getElementById('busMallImagesParent');
  var imgSpan = document.createElement('span');
  imgSpan.setAttribute('class', 'prodImage');
  busMallImagesParent.append(imgSpan);

  var img = document.createElement('img');
  img.setAttribute('src', 'images/' + item.name);
  img.setAttribute('id', item.name);
  img.addEventListener('click', imageClick);
  imgSpan.append(img);
}

function showClickTable() {
  var container = document.getElementById('clickData');

  var clickTable = document.createElement('table');
  container.appendChild(clickTable);

  var headerRow = document.createElement('tr');
  clickTable.appendChild(headerRow);

  var th = document.createElement('th');
  headerRow.appendChild(th);
  th.textContent = 'Image';

  th = document.createElement('th');
  headerRow.appendChild(th);
  th.textContent = 'Shown';

  th = document.createElement('th');
  headerRow.appendChild(th);
  th.textContent = 'Clicked';

  th = document.createElement('th');
  headerRow.appendChild(th);
  th.textContent = 'Clicked/Shown %';

  var busMallItems = getItems();
  for(var i = 0; i < busMallItems.length; i++)
  {
    var tableRow = document.createElement('tr');
    clickTable.appendChild(tableRow);

    var td = document.createElement('td');
    tableRow.appendChild(td);
    td.textContent = busMallItems[i].name;

    td = document.createElement('td');
    tableRow.appendChild(td);
    td.textContent = busMallItems[i].shown;

    td = document.createElement('td');
    tableRow.appendChild(td);
    td.textContent = busMallItems[i].clicked;

    td = document.createElement('td');
    tableRow.appendChild(td);
    td.textContent = parseFloat((busMallItems[i].clicked / busMallItems[i].shown) * 100).toFixed(2);
  }
}

function showChart() {
  var labels = [];
  var data = [];
  var busMallItems = getItems();
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
        backgroundColor: 'rgb(222, 222, 144)',
        borderColor: 'rgb(255, 111, 134)',
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

function decrementAttempts() {
  var attempts = getAttempts();
  attempts--;
  updateAttempts(attempts);
  displayAttempts();// To display in HTML
}

function getAttempts () {
  var attempts = localStorage.getItem('attempts');
  if (attempts !== null) {
    attempts = parseInt(attempts);
  } else {
    attempts = 25;
  }

  return attempts;
}

function displayAttempts() {
  document.getElementById('remaining').innerHTML = getAttempts();
}

function updateAttempts(value) {
  value = value.toString();
  localStorage.setItem('attempts', value);
}

function deleteAttempts() {
  localStorage.removeItem('attempts');
}

function saveItems(busMallItems) {
  localStorage.setItem('items', JSON.stringify(busMallItems));
}

function getItems() {
  var items = localStorage.getItem('items');
  if(items === null) {
    return null;
  } else {
    return JSON.parse(items);
  }
}

function deleteItems() {
  localStorage.removeItem('items');
}

function saveDisplayedItems(displayedItems) {
  localStorage.setItem('displayedItems', JSON.stringify(displayedItems));
}

function getDisplayedItems() {
  var items = localStorage.getItem('displayedItems');
  if(items === null) {
    return null;
  } else {
    return JSON.parse(items);
  }
}

function deleteDisplayedItems() {
  localStorage.removeItem('displayedItems');
}
