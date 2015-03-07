var Vue = require('vue');
var PouchDB = require('pouchdb');

var MakeModal = require('./make-modal');

var db = new PouchDB('http://localhost:5984/sprung/');

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
    }
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
      } else if (editor) {
        data = {
          editor: editor,
          name: '...something...'
        };
      } else {
        data = {
          editor: 'anything-editor',
          name: 'Anything'
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
