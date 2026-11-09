(function () {
  'use strict';
  var iosButton = document.getElementById('tab-ios');
  var androidButton = document.getElementById('tab-android');
  var iosSteps = document.getElementById('steps-ios');
  var androidSteps = document.getElementById('steps-android');

  function showPhone(phone) {
    var ios = phone === 'ios';
    iosSteps.hidden = !ios;
    androidSteps.hidden = ios;
    iosButton.setAttribute('aria-pressed', ios ? 'true' : 'false');
    androidButton.setAttribute('aria-pressed', ios ? 'false' : 'true');
  }

  var ua = navigator.userAgent || '';
  var android = /Android/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  showPhone(android ? 'android' : 'ios');
  if (!android && !ios) document.getElementById('desktopNote').hidden = false;

  iosButton.addEventListener('click', function () { showPhone('ios'); });
  androidButton.addEventListener('click', function () { showPhone('android'); });
}());
