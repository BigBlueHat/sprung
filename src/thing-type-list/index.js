module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      notebook: false,
      types: []
    };
  },
  computed: {
    apiUrl: function() {
      if (this.notebook) {
        return '_view/by_notebook?group_level=2&startkey=["' + this.notebook
          + '"]&endkey=["' + this.notebook + '", {}]';
      } else {
        return '_view/by_type?group_level=1';
      }
    }
  },
  created: function() {
    this.fetchData();
  },
  watch: {
    notebook: 'fetchData'
  },
  methods: {
    fetchData: function () {
      if (!this.apiUrl) return false;
      var xhr = new XMLHttpRequest(),
          self = this;
      xhr.open('GET', self.apiUrl);
      xhr.onload = function () {
        self.items = JSON.parse(xhr.responseText);
        self.types = [];
        if (self.notebook) {
          for (var i = 0; i < self.items.rows.length; i++) {
            // if there are 2 keys, we have a type entry
            if (self.items.rows[i].key.length === 2) {
              self.types.push({"type": self.items.rows[i].key[1],
                "count": self.items.rows[i].value});
            }
          }
        } else {
          for (var i = 0; i < self.items.rows.length; i++) {
            self.types.push({"type": self.items.rows[i].key[0],
              "count": self.items.rows[i].value});
          }
        }
      };
      xhr.send();
    }
  }
};
