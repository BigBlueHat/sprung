module.exports = function(v, k) {
  var l = v.toLowerCase();
  // TODO: ugh...this should be pulled out somewher
  var type_to_icon = {
    alarm: 'time',
    album: 'music',
    business: 'building',
    checklist: 'list',
    contact: 'phone sign',
    'event': 'calendar',
    movie: 'video',
    note: 'text file',
    product: 'money',
    recipe: 'browser',
    task: 'checkmark sign',
    'tv show': 'desktop',
    wine: 'glass'
  };
  return type_to_icon[l] || l;
};
