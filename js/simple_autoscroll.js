var refresh;


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

      refresh = setTimeout(() => {
        window.location.reload();
      }, refreshRate);
    }
  });

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