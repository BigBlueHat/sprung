var Vue = require('vue');
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-authentication'));
var include = require('jsinclude');
var key = require('keymaster');

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
    user: {},
    current: {
      notebook: {},
      type: false,
      doc: {}
    },
    types: {}
  },
  computed: {
    loggedIn: function() {
      if (Object.keys(this.user).length > 0
          && undefined !== this.user.name) {
        return true;
      } else {
        return false;
      }
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
    db.getSession(function(err, resp) {
      if (err) {
        // network error
      } else if (!resp.userCtx.name) {
        // nobody's logged in
      } else {
        // resp.userCtx.name is the current user
        self.user = resp.userCtx;
      }
    });
  },
  ready: function() {
    var self = this;

    // listen for document-wide keyboard events
    key('ctrl+shift+l', function() {
      db.getSession(function (err, resp) {
        if (err) {
          // network error
        } else if (!resp.userCtx.name) {
          // reset the user to empty
          // TODO: should trigger UI changes
          self.user = {};
          // open login modal
          var modal = self.$addChild(require('./login-modal'));
          modal.$mount();
          modal.$appendTo(document.body);
        } else{
          // response.userCtx.name is the current user
          self.user = resp.userCtx;

        }
      });
      return false;
    });
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
    },
    logout: function() {
      var self = this;
      // TODO: make this data state driven
      db.logout(function (err, response) {
        if (err) {
          // network error
          console.log('error', err);
        } else {
          // empty user so loggedIn === false
          self.user = {};
        }
      });
    }
  },
  components: {
    'import-form': require('./import-form'),
    'thing-list': require('./thing-list'),
    'thing-type-list': require('./thing-type-list'),
    'thing-notebook-list': require('./thing-notebook-list'),
    'file-picker': require('./file-picker')
  },
  filters: {
    iconize: require('./filters/iconize'),
    truncate: require('./filters/truncate')
  },
  events: {
    thingMade: function(id) {
      // feel a bit silly sending this back down
      // the stack...but not sure how else to do
      // it without "hard" references to components...which is worse...imo
      this.$broadcast('thingMade', id);
    }
  }
});
