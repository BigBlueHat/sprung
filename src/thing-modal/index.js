var Vue = require('vue');
var PouchDB = require('pouchdb');

var db = new PouchDB('http://localhost:5984/sprung/');

module.exports = Vue.extend({
  template: require('./template.html'),
  computed: {
    viewer: function() {
      if (this.type == 'Note') {
        return 'type-springpad-note';
      } else {
        return false;
      }
    }
  },
  filters: {
    iconize: require('../filters/iconize')
  },
  methods: {
    destroy: function() {
      this.$destroy(true);
    },
    remove: function() {
      var self = this;
      db.remove(self.$data._id, self.$data._rev, function(err, resp) {
        if (err) {
          console.log('error: ', err);
        } else {
          self.$destroy(true);
        }
      });
    }
  },
  components: {
    'type-springpad-note': require('../type-springpad-note')
  }
});
