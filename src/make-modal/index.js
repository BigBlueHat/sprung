var Fetchable = require('../fetchable');

module.exports = Fetchable.extend({
  data: {
    schema_name: ''
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
  }
});
