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

  any: function() {

    return (window.mobile.android() || window.mobile.blkbry() || window.mobile.ios() || window.mobile.ie());

  },

};

window.paceOptions = {

  ajax: true,
  initialRate: 0,
  startOnPageLoad : false,
  target: '#content-header',
  minTime: 1000,
  ghostTime:500,
  eventLag: true,
  catchupTime: 300,
  elements: {

    selectors: ['.tool']

  }

};