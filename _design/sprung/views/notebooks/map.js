function(doc) {
  if ('type' in doc && doc.type == 'Notebook') {
    emit(doc.name, 1);
  }
}
