var Vue = require('vue');
var Fetchable = require('../fetchable');

var ThingModal = Vue.extend({
  template: '#thing-modal'
});

module.exports = Fetchable.extend({
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
    },
    modalMe: function(ev) {
      var modal = new ThingModal({
        data: ev.targetVM.doc
      });
      modal.$appendTo('body');
    }
  }
});