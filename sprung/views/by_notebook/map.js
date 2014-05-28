function(doc) {
  if ('notebooks' in doc) {
    for(var i = 0; i < doc.notebooks.length; i++) {
      // emit the notebook for ?include_docs=true
      emit(doc.notebooks[i], {_id: doc.notebooks[i]});
      // emit the item
      emit(doc.notebooks[i], 1);
    }
  }
}