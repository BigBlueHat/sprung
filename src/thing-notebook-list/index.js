module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      apiUrl: '_view/notebooks?reduce=false&include_docs=true',
      items: []
    };
  },
  methods: {
    isActive: function(id) {
      if (Object.keys(this.$root.current).length > 0) {
        return this.$root.current.notebook._id === id;
      } else {
        return false;
      }
    },
    fetchData: function () {
      if (!this.apiUrl) return false;
      var xhr = new XMLHttpRequest(),
          self = this;
      xhr.open('GET', self.apiUrl);
      xhr.onload = function () {
        // TODO: be less rash...
        self.items = JSON.parse(xhr.responseText).rows;
      };
      xhr.send();
    },
    setCurrent: function(notebook) {
      this.$root.current.notebook = notebook;
    },
    unsetCurrent: function() {
      this.$root.current.notebook = {};
    }
  },
  created: function() {
    this.fetchData();
  }
}
