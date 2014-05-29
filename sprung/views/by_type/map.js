function(doc) {
  if ('type' in doc && doc.type != 'Notebook') {
    emit([doc.type, doc.name], 1);
  }
}
