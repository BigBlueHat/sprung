function(doc) {
  var doc_id = doc._id.split('~');
  if (doc_id[0] === 'type' && doc.schema) {
    emit(doc_id[1], 1);
  }
}
