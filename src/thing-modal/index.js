var Vue = require('vue');

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
    }
  },
  components: {
    'type-springpad-note': require('../type-springpad-note')
  }
});
