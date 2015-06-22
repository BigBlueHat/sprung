var Draggabilly = require('draggabilly');

var PouchDB = require('pouchdb');
// TODO: move this to a config lib
var db_name = location.pathname.split('/')[1];
var db_url = location.protocol + '//' + location.hostname
    + (location.port ? ':' + location.port : '') + '/' + db_name + '/';
var db = new PouchDB(db_url);

module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      notebook: {},
      type: false,
      items: {
        rows: []
      }
    };
  },
  computed: {
    apiUrl: function() {
      if (Object.keys(this.notebook).length > 0 && this.type !== false) {
        // things of a certain kind from a certain place
        return '_view/by_notebook?reduce=false'
          + '&startkey=["' + this.notebook._id + '", "' + this.type + '"]'
          + '&endkey=["' + this.notebook._id + '", "' + this.type + '", {}]'
          + '&include_docs=true';
      } else if (Object.keys(this.notebook).length > 0 && this.type === false) {
        // all the things from a certain place
        return '_view/by_notebook?reduce=false'
          + '&startkey=["' + this.notebook._id + '"]'
          + '&endkey=["' + this.notebook._id + '", {}]'
          + '&include_docs=true';
      } else if (Object.keys(this.notebook).length === 0
          && this.type !== false) {
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
        if (Object.keys(self.vm.notebook).length > 0) {
          // make it draggable
          var draggie = new Draggabilly(self.el);
          draggie
            .on('staticClick',
              function(ev) {
                self.vm.modalMe(self.vm);
              })
            .on('dragEnd',
              function(ev) {
                // TODO: save position to notebook
                self.vm.notebook.positions[self.vm.doc._id] = [draggie.position.x + 'px', draggie.position.y + 'px'];
                db.put(self.vm.notebook)
                  .then(function(resp) {
                    // TODO: confirm saving; handle errors
                  });
              });
          // add stored position info to card
          if (self.vm.notebook.positions &&
              self.vm.notebook.positions[self.vm.doc._id]) {
            var left = self.vm.notebook.positions[self.vm.doc._id][0];
            var top = self.vm.notebook.positions[self.vm.doc._id][1];
            self.el.style.left = left;
            self.el.style.top = top;
            self.el.style.position = 'absolute';
          }
        } else {
          self.el.addEventListener('click', function() {
            self.vm.modalMe(self.vm);
          });
        }
      }
    }
  }
};
