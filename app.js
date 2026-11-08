(function () {
  'use strict';

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-day]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));

  function selectDay(day, moveFocus) {
    tabs.forEach(function (tab) {
      var selected = tab.dataset.day === day;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== day;
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      selectDay(tab.dataset.day, false);
      history.replaceState(null, '', '#' + tab.dataset.day);
    });
    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      var step = event.key === 'ArrowRight' ? 1 : -1;
      var next = (index + step + tabs.length) % tabs.length;
      selectDay(tabs[next].dataset.day, true);
    });
  });

  var hashDay = location.hash.replace('#', '');
  if (tabs.some(function (tab) { return tab.dataset.day === hashDay; })) {
    selectDay(hashDay, false);
  } else {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Puerto_Rico',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    var puertoRicoDate = values.year + '-' + values.month + '-' + values.day;
    var liveDay = {
      '2026-12-04': 'friday',
      '2026-12-05': 'saturday',
      '2026-12-06': 'sunday'
    }[puertoRicoDate];
    selectDay(liveDay || 'saturday', false);
  }

  var countdown = document.getElementById('countdown');
  if (countdown) {
    var start = new Date('2026-12-04T18:00:00-04:00');
    var end = new Date('2026-12-07T00:00:00-04:00');
    var now = new Date();
    if (now < start) {
      var days = Math.max(1, Math.ceil((start - now) / 86400000));
      countdown.textContent = days + (days === 1 ? ' day' : ' days') + ' until Puerto Rico';
    } else if (now < end) {
      countdown.textContent = 'The celebration is here · all times Puerto Rico local';
    } else {
      countdown.textContent = 'Thank you for celebrating with us';
    }
  }
})();
