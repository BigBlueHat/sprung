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
      self.$db.remove(self.doc._id, self.doc._rev, function(err, resp) {
        if (err) {
          console.log('error: ', err);
        } else {
          self.$dispatch('thingGone', self.doc);
          self.destroy();
        }
      });
    }
  }
};
