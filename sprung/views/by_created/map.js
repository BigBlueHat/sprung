function(doc) {
  var moment = require('views/lib/moment');
  if ('created' in doc) {
    emit(moment(doc.created).toArray(), 1);
  }
}