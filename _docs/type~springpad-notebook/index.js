Vue.component('springpad-notebook-editor', {
  replace: true,
  template: require('./editor.html'),
  data: function() {
    return {
      doc: {
        name: ""
      }
    }
  },
  methods: {
    output: function() {
      this.doc.type = 'Notebook';
      return this.doc;
    }
  }

});
