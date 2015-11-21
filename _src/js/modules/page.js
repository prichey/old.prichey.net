var waitFor = require('waitFor');
require('../lib/jquery.throttle-debounce');

waitFor('body', function() {
    var $header = $('header.main-header'),
        $footer = $('footer.main-footer'),
        $main = $('main.root');

    function adjustMainPadding() {
        $main.css('padding-top', $header.outerHeight(true) + 20);
        $main.css('padding-bottom', $footer.outerHeight(true) + 20);
    }

    adjustMainPadding();
    $(window).resize($.throttle(100, adjustMainPadding));
});