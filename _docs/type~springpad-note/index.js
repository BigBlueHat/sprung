Vue.component('springpad-note-viewer', {
  template: require('./viewer.html')
});

Vue.component('springpad-note-editor', {
  template: require('./editor.html'),
  replace: true,
  data: function() {
    return {
      "name": "",
      "text": "",
      "image": "",
      "tags": [],
      "public": false,
      "complete": false,
      "liked": false,
      "type": "Note",
    }
  },
  methods: {
    output: function() {
      return this.$data;
    }
  }
});
