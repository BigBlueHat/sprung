module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      notebook: {},
      type: false,
      items: []
    };
  },
  ready: function() {
    // using $watch (vs. watch object) to avoid acting on the default value
    this.$watch('notebook', function() {
      this.fetchData();
    });
  },
  methods: {
    fetchData: function () {
      var self = this;
      var view = '';
      var params = {};
      // select the proper view & params
      if (Object.keys(this.notebook).length > 0) {
        // all the things from a certain place
        view = 'by_notebook';
        params = {
          reduce: false,
          startkey: [this.notebook._id, 0],
          endkey: [this.notebook._id, {}],
          include_docs: true
        };
      } else {
        // all the things from all the places
        // TODO: paginate this thing
        view = 'by_type';
        params = {
          reduce: false,
          include_docs: true
        };
      }

      self.$db.query('sprung/' + view, params)
        .then(function(resp) {
          self.items = [];
          for (var i = 0; i < resp.rows.length; i++) {
            if (resp.rows[i].type !== 'Notebook') {
              self.items.push(resp.rows[i]);
            }
          }
        });
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
    thingMade: function() {
      this.fetchData();
    },
    thingGone: function(doc) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === doc._id) {
          this.items.$remove(i);
        }
      }
    }
  }
};
