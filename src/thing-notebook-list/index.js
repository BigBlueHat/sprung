var Fetchable = require('../fetchable');

module.exports = Fetchable.extend({
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
});
