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
      notebook: false,
      types: []
    };
  },
  computed: {
    apiUrl: function() {
      if (this.notebook) {
        return '_view/by_notebook?group_level=2&startkey=["' + this.notebook
          + '"]&endkey=["' + this.notebook + '", {}]';
      } else {
        return '_view/by_type?group_level=1';
      }
    }
  },
  created: function() {
    this.fetchData();
  },
  watch: {
    notebook: 'fetchData'
  },
  methods: {
    fetchData: function () {
      var self = this;
      var view = '';
      var params = {};
      if (this.notebook) {
        view = 'by_notebook';
        params = {
          group_level: 2,
          startkey: [this.notebook],
          endkey: [this.notebook, {}]
        };
      } else {
        view = 'by_type';
        params = {
          group_level: 1
        };
      }

      db.query('sprung/' + view, params)
        .then(function(resp) {
          self.items = resp;
          self.types = [];
          if (self.notebook) {
            for (var i = 0; i < self.items.rows.length; i++) {
              // if there are 2 keys, we have a type entry
              if (self.items.rows[i].key.length === 2) {
                self.types.push({"type": self.items.rows[i].key[1],
                  "count": self.items.rows[i].value});
              }
            }
          } else {
            for (var i = 0; i < self.items.rows.length; i++) {
              self.types.push({"type": self.items.rows[i].key[0],
                "count": self.items.rows[i].value});
            }
          }
        });
    }
  }
};
