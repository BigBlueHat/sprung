module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      apiUrl: '_view/notebooks?reduce=false&include_docs=true',
      current: {},
      items: []
    };
  },
  computed: {
    isActive: function() {
      return (Object.keys(this.current).length > 0);
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
    setCurrent: function(notebook) {
      this.$parent.current.notebook = notebook;
    },
    unsetCurrent: function() {
      this.$parent.current.notebook = {};
    }
  },
  created: function() {
    this.fetchData();
  }
}
