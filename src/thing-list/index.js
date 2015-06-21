var Draggabilly = require('draggabilly');

module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      notebook: false,
      type: false,
      items: {
        rows: []
      }
    };
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
    this.fetchData();
  },
  watch: {
    notebook: 'fetchData',
    type: 'fetchData'
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
      if (undefined == ev.targetVM) {
        // then, we assume (rashly...) that ev == is the vm
        this.$root.viewDoc(ev.doc);
      } else {
        this.$root.viewDoc(ev.targetVM.doc);
      }
    }
  },
  events: {
    thingMade: function(id) {
      this.fetchData();
    }
  },
  directives: {
    draggable: {
      bind: function() {
        var self = this;
        if (self.vm.notebook !== false) {
          var draggie = new Draggabilly(self.el);
          draggie.on('staticClick',
            function(ev, pointer) {
              self.vm.modalMe(self.vm);
            });
        } else {
          self.el.addEventListener('click', function() {
            self.vm.modalMe(self.vm);
          });
        }
      }
    }
  }
};
