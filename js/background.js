'use strict';

var refreshId;

function scroll() {

  // Get variables
  var scrollRate = document.getElementById('speed-field').value;
  var refreshRate = document.getElementById('refresh-field').value;

  // Save variables
  chrome.storage.sync.set({
    'scrollRate': scrollRate
  }, function () {
    console.log('Scroll rate is set to ' + scrollRate);
  });

  chrome.storage.sync.set({
    'refreshRate': refreshRate
  }, function () {
    console.log('Refresh rate is set to ' + refreshRate);
  });

  // Reload page after variable changes
  chrome.tabs.executeScript({
    code: 'window.location.reload();'
  });
  
  // Initiate content script
  chrome.tabs.executeScript({
    code: 'js/simple_autoscroll.js'
  });
}

function stop() {

  // "Clear" variables
  chrome.storage.sync.set({
    'scrollRate': 0
  }, () => {
    console.log('Scroll rate is set to ' + 0);
  });

  chrome.storage.sync.set({
    'refreshRate': 0
  }, () => {
    console.log('Refresh rate is set to ' + 0);
  });

  // Reload page after variable changes
  chrome.tabs.executeScript({
    code: 'window.location.reload();'
  });

    // Initiate content script
  chrome.tabs.executeScript({
    code: 'js/simple_autoscroll.js'
  });
}

document.getElementById('start-button').addEventListener('click', scroll);
document.getElementById('stop-button').addEventListener('click', stop);

// JUST DO THIS ME chrome.tabs.update(tabId, {selected: true});