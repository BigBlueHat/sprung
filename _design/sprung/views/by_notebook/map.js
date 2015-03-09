function(doc) {
  if ('notebooks' in doc && 'type' in doc && doc.type !== 'Notebook') {
    for(var i = 0; i < doc.notebooks.length; i++) {
      emit([doc.notebooks[i], doc.type, doc._id], 1);
    }
  } else if ('type' in doc && doc.type == 'Notebook') {
    emit([doc._id], 0);
  }
}
