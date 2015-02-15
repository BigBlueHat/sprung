module.exports = {
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
    fetchData: function () {
      if (!this.apiUrl) return false;
      var xhr = new XMLHttpRequest(),
          self = this;
      xhr.open('GET', self.apiUrl);
      xhr.onload = function () {
        self.items = JSON.parse(xhr.responseText);
      };
      xhr.send();
    },
    destroy: function() {
      this.$destroy(true);
    }
  }
}
