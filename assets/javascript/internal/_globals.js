window.mobile = {

  android: function() {

    return navigator.userAgent.match(/Android/i);

  },

  blkbry: function() {

    return navigator.userAgent.match(/BlackBerry/i);

  },

  ios: function() {

    return navigator.userAgent.match(/iPhone|iPad|iPod/i);

  },

  ie: function() {

    return navigator.userAgent.match(/IEMobile/i);

  },

  desktop: function() {

    return $(window).width() < 600 ? true : false;

  },

  any: function() {

    return (window.mobile.android() ||
            window.mobile.blkbry()  ||
            window.mobile.ios()     ||
            window.mobile.ie()      ||
            window.mobile.desktop());

  },

};
