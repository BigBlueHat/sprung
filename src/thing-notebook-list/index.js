var PouchDB = require('pouchdb');
// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db_url = location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/';
var db = new PouchDB(db_url);

module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      items: []
    };
  },
  events: {
    thingMade: function(doc) {
      if (doc.type === 'Notebook') {
        this.$root.current.notebook = doc;
        this.fetchData();
      }
    },
    thingGone: function(doc) {
      if (doc.type === 'Notebook') {
        // TODO: set back to the default
        // handle the current notebook being deleted
        if (this.$root.current.notebook._id === doc._id) {
          this.$root.current.notebook = {};
        }
        // also remove the deleted notebook from the list of items
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].id === doc._id) {
            this.items.$remove(i);
          }
        }
      }
    }
  },
  methods: {
    isActive: function(id) {
      if (Object.keys(this.$root.current).length > 0) {
        return this.$root.current.notebook._id === id;
      } else {
        return false;
      }
    },
    fetchData: function () {
      var self = this;
      db.query('sprung/notebooks', {reduce: false, include_docs: true})
        .then(function(resp) {
          // TODO: make this binding bi-directional to avoid the silliness
          resp.rows.forEach(function(row) {
            // doing this for "Add to Notebook(s)" menu
            self.$root.notebooks[row.id] = row.key;
          });
          self.items = resp.rows;
        });
    },
    setCurrent: function(notebook) {
      this.$root.current.notebook = notebook;
    },
    unsetCurrent: function() {
      this.$root.current.notebook = {};
    }
  },
  created: function() {
    this.fetchData();
  }
}
