var data = function() {
  return {
    doc: {
      "type": "Photo",
      "name": "",
      "url": "",
      "description": "",
      "image": "",
      "tags": [],
      "public": false,
      "complete": false,
      "liked": false,
      "rating": 0.0
    }
  }
};

Vue.component('springpad-photo-viewer', {
  template: require('./viewer.html'),
  data: data
});

Vue.component('springpad-photo-editor', {
  template: require('./editor.html'),
  replace: true,
  data: data,
  methods: {
    output: function() {
      // TODO: add optional name field for photo
      this.doc.name = this.doc.url;
      this.doc.image = this.doc.url;
      return this.$data.doc;
    }
  }
});
