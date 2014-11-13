var Fetchable = require('../fetchable');

module.exports = Fetchable.extend({
  data: function() {
    return {
      schema_name: ''
    };
  },
  computed: {
    apiUrl: function() {
      return '_rewrite/schemas/' + this.schema_name;
    }
  },
  template: require('./template.html'),
  created: function() {
    if (this.schema_name !== '') {
      this.fetchData();
    }
  },
  methods: {
    destroy: function() {
      this.$destroy(true);
    }
  }
});
