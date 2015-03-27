var Vue = require('vue');
var PouchDB = require('pouchdb');
var include = require('jsinclude');

var MakeModal = require('./make-modal');

var db = new PouchDB('http://localhost:5984/sprung/');

window.Vue = Vue;

Vue.config.debug = true;

window.Sprung = new Vue({
  el: 'body',
  data: {
    ui: {
      sidebarIsOpen: false,
      modalIsOpen: false
    },
    current: {
      notebook: false,
      type: false
    },
    types: {}
  },
  created: function() {
    var self = this;
    db.query('sprung/type_definitions',
      function(err, resp) {
        resp.rows.forEach(function(row) {
          // load type info
          self.types[row.key] = row.value;
          // and it's component JS (editor and/or viewer)
          include.once('/sprung/' + row.id + '/component.js');
        });
      }
    );
  },
  methods: {
    toggleSidebar: function() {
      this.ui.sidebarIsOpen = !this.ui.sidebarIsOpen;
    },
    importFile: function() {
      document.getElementById('export-file').click()
    },
    openMakeModal: function(editor, schema_name) {
      // with no thing ID provided, open a blank editing form
      var app = this;
      var schema_url = '_rewrite/schemas/' + schema_name;
      var data = {};
      if (editor && schema_name) {
        data = {
          editor: 'vue-schema',
          schema_url: schema_url
        };
      } else if (editor
          && undefined != this.types[editor]
          && undefined != this.types[editor]['editor']) {
            // TODO: this is all terribly tangled...untangle it
        data = {
          editor: this.types[editor].editor,
          name: editor
        };
      } else {
        data = {
          editor: 'json',
          name: 'JSON'
        };
      }
      var modal = new MakeModal({
        data: data,
        destroyed: function() {
          app.ui.modalIsOpen = false
        }
      });
      modal._db = db;
      app.ui.modalIsOpen = true;
      modal.$mount();
      modal.$appendTo('body');
    }
  },
  components: {
    'import-form': require('./import-form'),
    'thing-list': require('./thing-list'),
    'thing-type-list': require('./thing-type-list'),
    'thing-notebook-list': require('./thing-notebook-list')
  },
  filters: {
    iconize: require('./filters/iconize'),
    truncate: require('./filters/truncate')
  }
});
