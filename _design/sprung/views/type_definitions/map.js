function(doc) {
  var id = doc._id.split('~');
  var components = {};
  // id contains type; check it
  if (id.length > 1 && id[0] == 'type') {
    // check for and add known component types
    Object.keys(doc).forEach(function(key) {
      // TODO: this may be too generous...and catch unknown mess
      if (key != 'index' && key != 'name' && key != 'couchapp'
          && key[0] != '_') {
        components[key] = id[1] + '-' + key;
      }
    });
    emit(doc.name || id[1], components);
  }
}
