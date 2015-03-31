var Vue = require('vue');
var PouchDB = require('pouchdb');
var include = require('jsinclude');

Vue.config.debug = true;

// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db_url = location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/';
var db = new PouchDB(db_url);

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
    types: {},
    modal: {
      name: '',
      editor: '',
      schema_url: '',
      doc: {}
    }
  },
  created: function() {
    var self = this;
    db.query('sprung/type_definitions',
      function(err, resp) {
        resp.rows.forEach(function(row) {
          // load type info
          self.types[row.key] = row.value;
          // and it's component JS (editor and/or viewer)
          include.once(db_url + row.id + '/component.js');
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
      var self = this;
      var schema_url = '_rewrite/schemas/' + schema_name;
      if (editor && schema_name) {
        this.modal.editor = 'vue-schema';
        this.modal.schema_url = schema_url;
      } else if (editor
          && undefined != this.types[editor]
          && undefined != this.types[editor]['editor']) {
            // TODO: this is all terribly tangled...untangle it
        this.modal.editor = this.types[editor].editor;
        this.modal.name = editor;
      } else {
        this.modal.editor = 'json';
        this.modal.name = 'JSON';
      }
      this.ui.modalIsOpen = true;
    }
  },
  components: {
    'import-form': require('./import-form'),
    'make-modal': require('./make-modal'),
    'thing-list': require('./thing-list'),
    'thing-type-list': require('./thing-type-list'),
    'thing-notebook-list': require('./thing-notebook-list')
  },
  filters: {
    iconize: require('./filters/iconize'),
    truncate: require('./filters/truncate')
  }
});
