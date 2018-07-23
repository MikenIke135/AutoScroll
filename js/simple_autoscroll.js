$(document).ready( function () {

  document.documentElement.scrollTop = 0; // scroll to top to start

  chrome.storage.sync.get(['scrollRate'], function(result) {

    scrollRate = result.scrollRate * 1000;

    if (scrollRate !== 0) {

      scroll(scrollRate)
      setInterval(function () {
        scroll(scrollRate)
      }, scrollRate * 2);
    }
  })

  chrome.storage.sync.get(['refreshRate'], function(result) {

    refreshRate = result.refreshRate * 1000;
    if (refreshRate !== 0) {

      setTimeout(() => {
        window.location.reload();
      }, refreshRate);
    }
  });

  chrome.storage.sync.get(['switchRate'], function(result) {

    chrome.tabs.onActivated.addListener(() => {
      setTimeout(() => {
        
        nextTab();
      }, carouselRate);
      });
  });

  function nextTab() {

    chrome.tabs.query({active: true}, (tabs) => {
      if (tabs.length) {

        var activeTab = tabs[0], tabId = activeTab.id, currentIndex = activeTab.index;
        chrome.tabs.query({currentWindow: true}, (tabs) => {

          var numTabs = tabs.length;
          chrome.tabs.query({index: (currentIndex + 1) % numTabs}, function (tabs) {

            if (tabs.length) {

              var tabToActivate = tabs[0], tabToActivate_Id = tabToActivate.id;
              chrome.tabs.update(tabToActivate_Id, {

                active: true
              });
            }
          });
        });
      }
    });
  }

  function scroll(scrollRate) {
    $('html, body').animate({
      scrollTop: $(document).height() - $(window).height()
    }, scrollRate, function () {
      $(this).animate({
        scrollTop: 0
      }, scrollRate);
    });
  }
});