var PouchDB = require('pouchdb');

// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db = new PouchDB(location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/');

module.exports = {
  template: require('./template.html'),
  computed: {
    viewer: function() {
      // TODO: uses a global var >_<
      if (undefined == this.type) {
        return false;
      }
      if (undefined != this.$root.types[this.type]
          && undefined != this.$root.types[this.type]['viewer']) {
        return this.$root.types[this.type]['viewer'];
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
      // TODO: this all needs more thought...
      this.$root.ui.thingModalIsOpen = false;
    },
    edit: function() {
      // TODO: ...this is terrible...
      this.$root.ui.thingModalIsOpen = false;
      this.$root.makeModal.doc = this.$root.thingModal.doc;
      this.$root.openMakeModal(this.$data.type);
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
          self.destroy();
        }
      });
    }
  }
};
