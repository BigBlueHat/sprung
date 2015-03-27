var Vue = require('vue');
var PouchDB = require('pouchdb');

// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db = new PouchDB(location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/');

window.Vue = Vue;

module.exports = Vue.extend({
  template: require('./template.html'),
  computed: {
    viewer: function() {
      // TODO: uses a global var >_<
      if (undefined != Sprung.types[this.type]
          && undefined != Sprung.types[this.type]['viewer']) {
        return Sprung.types[this.type]['viewer'];
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
