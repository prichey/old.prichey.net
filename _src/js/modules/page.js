var waitFor = require('waitFor');
require('../lib/jquery.throttle-debounce');

waitFor('body', function() {
  var $header = $('header.main-header'),
    $footer = $('footer.main-footer'),
    $main = $('main.root'),
    $absMain = $('.abs-height-padded');

  function adjustMainPadding() {
    $main.css('padding-top', $header.outerHeight(true));
    $main.css('padding-bottom', $footer.outerHeight(true));
  }

  function adjustAbsPadding() {
    var topPadding, bottomPadding;

    if ($(window).width() > 768) {
      topPadding = $header.outerHeight(true) - 20;
      bottomPadding = $footer.outerHeight(true) - 20;
    } else {
      topPadding = $header.outerHeight(true);
      bottomPadding = $footer.outerHeight(true);
    }

    $absMain.css('padding-top', topPadding);
    $absMain.css('padding-bottom', bottomPadding);
  }

  function adjustPadding() {
    adjustMainPadding();
    adjustAbsPadding();
  }

  adjustPadding();
  $(window).resize($.throttle(100, adjustPadding));
});
