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
      sidebarIsOpen: false
    },
    current: {
      notebook: false,
      type: false,
      doc: {}
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
    editDoc: function(doc, schema_name) {
      var modal = this.$addChild(require('./make-modal'));
      if (schema_name) {
        modal.$set('schema_url', '_rewrite/schemas/' + schema_name);
      } else {
        modal.$set('schema_url', '');
      }
      modal.$set('doc', doc);
      modal.$set('active', true);
      modal.$mount();
      modal.$appendTo(this.$el);
    },
    viewDoc: function(doc) {
      var modal = this.$addChild(require('./thing-modal'));
      modal.$data = {
        active: true,
        doc: doc
      };
      modal.$mount();
      modal.$appendTo(this.$el);
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
