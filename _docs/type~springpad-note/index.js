Vue.component('springpad-note-viewer', {
  template: require('./viewer.html')
});

Vue.component('springpad-note-editor', {
  template: require('./editor.html'),
  replace: true,
  data: function() {
    return {
      doc: {
        name: "",
        text: "",
        image: "",
        tags: [],
        "public": false,
        complete: false,
        liked: false
      }
    }
  },
  methods: {
    output: function() {
      this.doc.type = 'Note';
      return this.doc;
    }
  }
});
