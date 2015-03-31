var Vue = require('vue');
var PouchDB = require('pouchdb');

// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db_url = location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/';
var db = new PouchDB(db_url);

var default_data = {
  name: '',
  editor: '',
  schema_url: '',
  doc: {}
};

module.exports = Vue.extend({
  data: function() {
    return default_data;
  },
  components: {
    // TODO: make these dynamic...somehow
    'json': require('../json-editor'),
    'vue-schema': require('../vue-schema')
  },
  template: require('./template.html'),
  methods: {
    destroy: function() {
      // TODO: this all needs more thought...
      this.$root.makeModal = default_data;
      this.$root.ui.makeModalIsOpen = false;
    },
    save: function() {
      var self = this;
      // get doc from editor
      var doc = this.$.editor.output();
      // save doc
      db.post(doc, function(err, resp) {
        if (err) {
          // TODO: maybe tell somebody...
          console.log('error: ', err);
        } else {
          // TODO: trigger content reload, etc.
          self.destroy();
        }
      });
    }
  }
});
