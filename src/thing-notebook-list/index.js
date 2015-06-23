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
