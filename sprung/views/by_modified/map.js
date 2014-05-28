function(doc) {
  var moment = require('views/lib/moment');
  if ('modified' in doc) {
    emit(moment(doc.modified).toArray(), 1);
  }
}