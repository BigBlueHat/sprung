module.exports = function(v, k) {
  if (undefined == v) {
    return v;
  }
  var l = v.toLowerCase();
  // TODO: ugh...this should be pulled out somewher
  var type_to_icon = {
    alarm: 'time',
    album: 'music',
    business: 'building',
    checklist: 'list',
    contact: 'call',
    'event': 'calendar',
    movie: 'video',
    note: 'text file',
    product: 'money',
    recipe: 'browser',
    task: 'checkmark sign',
    'tv show': 'desktop',
    wine: 'cocktail'
  };
  return type_to_icon[l] || l;
};
