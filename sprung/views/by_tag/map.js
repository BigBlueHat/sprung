function(doc) {
  if ('tags' in doc) {
    for(var i = 0; i < doc.tags.length; i++) {
      emit(doc.tags[i], 1);
    }
  }
}