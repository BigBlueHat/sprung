module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      results: []
    };
  },
  methods: {
    processImport: function() {
      var export_file = document.getElementById('export-file').files[0];
      var reader = new FileReader();
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('POST', '../../_bulk_docs');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        self.results = JSON.parse(this.responseText);
      }
      reader.onload = function(e) {
        var docs = JSON.parse(e.target.result);
        for (var i = 0; i < docs.length; i++) {
          docs[i]._id = docs[i].uuid;
        }
        xhr.send(JSON.stringify({docs: docs}));
      };
      reader.readAsBinaryString(export_file);
    }
  }
};
