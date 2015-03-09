function(doc) {
  if ('type' in doc && doc.type !== 'Notebook' && doc.type !== 'object') {
    emit([doc.type, doc.name], 1);
  }
}
