let iconize = require('../filters/iconize');

module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      current: {
        notebook: {},
        type: false
      },
      types: []
    };
  },
  computed: {
    icon_class: {
      return iconize(this.current.type);
    }
  }
  mounted: function() {
    this.nextTick(() => {
      this.$watch('current.notebook', function() {
        this.fetchData();
      });
    });
  },
  methods: {
    fetchData: function () {
      var self = this;
      var view = '';
      var params = {};
      if (Object.keys(this.current.notebook).length > 0) {
        view = 'by_notebook';
        params = {
          group_level: 2,
          startkey: [this.current.notebook._id],
          endkey: [this.current.notebook._id, {}]
        };
      } else {
        view = 'by_type';
        params = {
          group_level: 1
        };
      }

      self.$db.query('sprung/' + view, params)
        .then(function(resp) {
          self.types = [];
          if (Object.keys(self.current.notebook).length > 0) {
            for (var i = 0; i < resp.rows.length; i++) {
              // if there are 2 keys, we have a type entry
              if (resp.rows[i].key.length === 2) {
                self.types.push({"type": resp.rows[i].key[1],
                  "count": resp.rows[i].value});
              }
            }
          } else {
            for (var i = 0; i < resp.rows.length; i++) {
              self.types.push({"type": resp.rows[i].key[0],
                "count": resp.rows[i].value});
            }
          }
        });
    }
  }
};
