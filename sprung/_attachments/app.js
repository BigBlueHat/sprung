var Fetchable = Vue.extend({
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
    }
  },
  created: function() {
    this.$watch('apiUrl', function() {
      this.fetchData();
    });
  }
});

Vue.component('thing-notebook-list', Fetchable.extend({
  data: {
    apiUrl: '_view/notebooks?reduce=false'
  },
  methods: {
    setCurrent: function(notebook) {
      this.$parent.current.notebook = notebook.id;
      this.$parent.current.notebook_name = notebook.key;
    },
    unsetCurrent: function() {
      this.$parent.current.notebook = false;
      this.$parent.current.notebook_name = false;
    }
  }
}));

Vue.component('thing-type-list', {
  data: {
    notebook: false,
    types: []
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
    this.$watch('notebook', function() {
      this.fetchData();
    });
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
});

Vue.component('thing-list', Fetchable.extend({
  data: {
    notebook: false,
    type: false
  },
  computed: {
    apiUrl: function() {
      if (this.notebook !== false && this.type !== false) {
        // things of a certain kind from a certain place
        return '_view/by_notebook?reduce=false'
          + '&startkey=["' + this.notebook + '", "' + this.type + '"]'
          + '&endkey=["' + this.notebook + '", "' + this.type + '", {}]'
          + '&include_docs=true';
      } else if (this.notebook !== false && this.type === false) {
        // all the things from a certain place
        return '_view/by_notebook?reduce=false'
          + '&startkey=["' + this.notebook + '"]'
          + '&endkey=["' + this.notebook + '", {}]'
          + '&include_docs=true';
      } else if (this.notebook === false && this.type !== false) {
        // all the things of a certain type from all the places
        return '_view/by_type?startkey=["' + this.type + '"]&endkey=["' +
          this.type + '",{}]&reduce=false&include_docs=true';
      } else {
        // all the things from all the places
        // TODO: paginate this thing
        return '_view/by_type?reduce=false&include_docs=true';
      }
    }
  },
  created: function() {
    this.$watch('notebook', function() {
      this.fetchData();
    });
    this.$watch('type', function() {
      this.fetchData();
    });
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
    }
  }
}));

Vue.component('import-form', {
  data: {
    results: []
  },
  methods: {
    processImport: function() {
      var export_file = document.getElementById('export-file').files[0];
      var reader = new FileReader();
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('POST', '../../_bulk_docs');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        self.results = JSON.parse(this.responseText);
      }
      reader.onload = function(e) {
        var docs = JSON.parse(e.target.result);
        for (var i = 0; i < docs.length; i++) {
          docs[i]._id = docs[i].uuid;
        }
        xhr.send(JSON.stringify({docs: docs}));
      };
      reader.readAsBinaryString(export_file);
    }
  }
});

var app = new Vue({
  el: 'body',
  data: {
    ui: {
      sidebarIsOpen: false
    },
    current: {
      notebook: false,
      type: false
    }
  },
  methods: {
    toggleSidebar: function() {
      this.ui.sidebarIsOpen = !this.ui.sidebarIsOpen;
    },
    importFile: function() {
      document.getElementById('export-file').click()
    }
  }
});
