module.exports = function(v, k) {
  var l = v.toLowerCase();
  // TODO: ugh...this should be pulled out somewher
  var type_to_icon = {
    business: 'building',
    checklist: 'list',
    'event': 'calendar',
    note: 'text file',
    product: 'dollar basic',
    task: 'checkmark sign'
  };
  return type_to_icon[l] || l;
};
