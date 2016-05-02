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
    $absMain.css('padding-top', $header.outerHeight(true) - 20);
    $absMain.css('padding-bottom', $footer.outerHeight(true) - 20);
  }

  adjustMainPadding();
  adjustAbsPadding();
  $(window).resize($.throttle(100, adjustMainPadding));
});
