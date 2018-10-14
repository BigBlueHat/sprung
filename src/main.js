var include = require('jsinclude');
var key = require('keymaster');

// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db_url = location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/';

var Vue = require('vue');
Vue.use(require('vue-pouchdb'), {name: db_url});

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
    types: {},
    notebooks: {},
    settings: {}
  },
  computed: {
    loggedIn: function() {
      if (Object.keys(this.user).length > 0
          && undefined !== this.user.name) {
        return true;
      } else {
        return false;
      }
    },
    showSidebar: function() {
      if (this.loggedIn) {
        // always show the sidebar to logged in users
        return true;
      } else {
        if ('show' in this.settings
            && 'sidebar' in this.settings.show) {
          // return the Boolean if it's been set
          return Boolean(this.settings.show.sidebar);
        } else {
          // otherwise, it defaults to true
          return true;
        }
      }
    }
  },
  created: function() {
    var self = this;
    self.$db.query('sprung/type_definitions',
      function(err, resp) {
        resp.rows.forEach(function(row) {
          // load type info
          self.types[row.key] = row.value;
          // and it's component JS (editor and/or viewer)
          include.once(db_url + row.id + '/component.js');
        });
      }
    );
    self.$db.query('sprung/notebooks', {reduce: false})
      .then(function(resp) {
        resp.rows.forEach(function(row) {
          self.notebooks[row.id] = row.key;
        });
      }
    );

    // get the sprung config document
    self.$db.get('sprung')
      .then(function(doc) {
        delete doc._id;
        delete doc._rev;
        // set the sprung doc as the settings object
        self.settings = doc;
        // if there's a default notebook, handle that
        if (Object.keys(doc.defaults).length > 0
            && doc.defaults.notebook) {
          return doc.defaults.notebook;
        } else {
          // mimic the CouchDB response style, but with a custom `reason`
          throw {
            error: true,
            status: 404,
            name: "not_found",
            reason: "No default notebook defined"
          };
        }
      })
      .then(function(notebook_id) {
        return self.$db.get(notebook_id);
      })
      .then(function(notebook) {
        self.current.notebook = notebook;
      }).catch(function(err) {
        if (err.status === 404) {
          // set the default again to trigger thing-list updating
          // TODO: srsly...?! O.o
          self.current.notebook = {};
        }
      });

    self.$db.getSession(function(err, resp) {
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
  mounted: function() {
    var self = this;

    // listen for document-wide keyboard events
    key('ctrl+shift+l', function() {
      self.$db.getSession(function (err, resp) {
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
    editDocById: function(doc_id) {
      var self = this;
      self.$db.get(doc_id)
        .then(function(doc) {
          self.editDoc(doc);
        });
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
      modal.$set('notebooks', this.notebooks);
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
      self.$db.logout(function (err, response) {
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
  directives: {
    draggable: require('./directives/draggable')
  },
  events: {
    thingMade: function(doc) {
      // feel a bit silly sending this back down
      // the stack...but not sure how else to do
      // it without "hard" references to components...which is worse...imo
      // TODO: not sure if sending the doc around is too heavy or not...
      this.$broadcast('thingMade', doc);
    },
    thingGone: function(doc) {
      this.$broadcast('thingGone', doc);
    }
  }
});
