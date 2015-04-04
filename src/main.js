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
      makeModalIsOpen: false,
      thingModalIsOpen: false
    },
    current: {
      notebook: false,
      type: false,
      doc: {}
    },
    types: {},
    makeModal: {
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
        this.makeModal.editor = 'vue-schema';
        this.makeModal.schema_url = schema_url;
      } else if (editor
          && undefined != this.types[editor]
          && undefined != this.types[editor]['editor']) {
            // TODO: this is all terribly tangled...untangle it
        this.makeModal.editor = this.types[editor].editor;
        this.makeModal.name = editor;
      } else {
        this.makeModal.editor = 'json';
        this.makeModal.name = 'JSON';
      }
      this.ui.makeModalIsOpen = true;
    }
  },
  components: {
    'import-form': require('./import-form'),
    'make-modal': require('./make-modal'),
    'thing-modal': require('./thing-modal'),
    'thing-list': require('./thing-list'),
    'thing-type-list': require('./thing-type-list'),
    'thing-notebook-list': require('./thing-notebook-list')
  },
  filters: {
    iconize: require('./filters/iconize'),
    truncate: require('./filters/truncate')
  }
});
