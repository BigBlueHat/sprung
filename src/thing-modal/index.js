var Vue = require('vue');
var PouchDB = require('pouchdb');
var include = require('jsinclude');

var db = new PouchDB('http://localhost:5984/sprung/');

var remote_components = {};
db.query('sprung/type_definitions',
  function(err, resp) {
    resp.rows.forEach(function(row) {
      remote_components[row.key] = row.value;
      include.once('/sprung/' + row.id + '/component.js');
    });
  }
);

module.exports = Vue.extend({
  template: require('./template.html'),
  computed: {
    viewer: function() {
      if (undefined != remote_components[this.type]
          && undefined != remote_components[this.type]['viewer']) {
        return remote_components[this.type]['viewer'];
      } else if (this.type == 'Note') {
        return 'springpad-' + this.type.toLowerCase();
      } else if (this.$options.components[this.type.toLowerCase()]) {
        return this.type.toLowerCase();
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
          // TODO: use a $dipatch to trigger DOM removal instead
          var el = document.querySelector('[data-thing-id="' + self.$data._id + '"]');
          el.__vue__.$destroy(true);
          self.$destroy(true);
        }
      });
    }
  },
  components: {
    'markdown': require('../types/markdown').viewer,
    'springpad-note': require('../types/springpad-note').viewer
  }
});
