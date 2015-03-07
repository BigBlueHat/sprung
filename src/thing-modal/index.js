var Vue = require('vue');
var PouchDB = require('pouchdb');

var db = new PouchDB('http://localhost:5984/sprung/');

module.exports = Vue.extend({
  template: require('./template.html'),
  computed: {
    viewer: function() {
      if (this.type == 'Note') {
        return 'springpad-note';
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
