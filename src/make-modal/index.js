var Vue = require('vue');

module.exports = Vue.extend({
  data: function() {
    return {
      name: '',
      schema_name: '',
      schema: {}
    };
  },
  computed: {
    apiUrl: function() {
      return '_rewrite/schemas/' + this.schema_name;
    }
  },
  components: {
    'vue-schema': require('../vue-schema')
  },
  template: require('./template.html'),
  created: function() {
    if (this.schema_name !== '') {
      this.fetchData();
    }
  },
  methods: {
    fetchData: function () {
      if (!this.apiUrl) return false;
      var xhr = new XMLHttpRequest(),
          self = this;
      xhr.open('GET', self.apiUrl);
      xhr.onload = function () {
        self.schema = JSON.parse(xhr.responseText);
        if (self.schema.title) {
          self.name = self.schema.title;
          delete self.schema.title;
        } else {
          self.name = self.schema_name;
        }
      };
      xhr.send();
    },
    destroy: function() {
      this.$destroy(true);
    }
  }
});
