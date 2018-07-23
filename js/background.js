
$(document).ready(function () {

  $('#refresh').change(function () {
    $('#refresh-field').toggle();
  });
    $('#carousel').change(function () {
  $('#carousel-field').toggle();
  });
});

function scroll() {
  // Get variables
  const scrollRate = document.getElementById('speed-field').value;
  const refreshRate = document.getElementById('refresh-field').value;
  const switchRate = document.getElementById('carousel-field').value;

  // Save variables
  chrome.storage.sync.set({
    'scrollRate': scrollRate,
  }, () => {
    console.log(`Scroll rate is set to ${scrollRate}`);
  });

  chrome.storage.sync.set({
    'refreshRate': refreshRate,
  }, () => {
    console.log(`Refresh rate is set to ${refreshRate}`);
  });

  chrome.storage.sync.set({
    'switchRate': switchRate,
  }, () => {
    console.log(`Tab switching rate is set to ${switchRate}`);
  });

  // Reload page after variable changes
  chrome.tabs.executeScript({
    code: 'window.location.reload();',
  });

  // Initiate content script
  chrome.tabs.executeScript({
    code: 'js/simple_autoscroll.js',
  });

  window.close();
}

function stop() {
  // "Clear" variables
  chrome.storage.sync.set({
    'scrollRate': 0,
  }, () => {
    console.log('Scroll rate is set to 0');
  });

  chrome.storage.sync.set({
    'refreshRate': 0,
  }, () => {
    console.log('Refresh rate is set to  0');
  });

  chrome.storage.sync.set({
    'switchRate': 0,
  }, () => {
    console.log(`Tab switching rate is set to 0`);
  });

  // Reload page after variable changes
  chrome.tabs.executeScript({
    code: 'window.location.reload();',
  });

  // Initiate content script
  chrome.tabs.executeScript({
    code: 'js/simple_autoscroll.js',
  });

  window.close();
}

document.getElementById('start-button').addEventListener('click', scroll);

document.getElementById('stop-button').addEventListener('click', stop);
