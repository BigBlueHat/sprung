var PouchDB = require('pouchdb');

// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db = new PouchDB(location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/');

module.exports = {
  data: function() {
    return {
      active: false,
      doc: ''
    }
  },
  replace: true,
  template: require('./template.html'),
  computed: {
    viewer: function() {
      // TODO: uses a global var >_<
      if (undefined == this.doc && undefined == this.doc.type) {
        return false;
      }
      if (undefined != this.$root.types[this.doc.type]
          && undefined != this.$root.types[this.doc.type]['viewer']) {
        return this.$root.types[this.doc.type]['viewer'];
      } else if (this.$options.components[this.doc.type.toLowerCase()]) {
        return this.doc.type.toLowerCase();
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
    edit: function() {
      this.$root.editDoc(this.doc);
      this.$destroy(true);
    },
    remove: function() {
      var self = this;
      db.remove(self.doc._id, self.doc._rev, function(err, resp) {
        if (err) {
          console.log('error: ', err);
        } else {
          // TODO: use a $dipatch to trigger DOM removal instead
          var el = document.querySelector('[data-thing-id="' + self.doc._id + '"]');
          el.__vue__.$destroy(true);
          self.destroy();
        }
      });
    }
  }
};
