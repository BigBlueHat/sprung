module.exports = function (v) {
  var newline = v.indexOf('\n');
  return newline > -1 ? v.slice(0, newline) : v;
};
