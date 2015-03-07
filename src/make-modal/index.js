var Vue = require('vue');

module.exports = Vue.extend({
  data: function() {
    return {
      name: '',
      editor: '',
      schema_url: ''
    };
  },
  components: {
    // TODO: make these dynamic...somehow
    'json': require('../types/json').editor,
    'markdown': require('../types/markdown').editor,
    'vue-schema': require('../vue-schema'),
    'springpad-note': require('../types/springpad-note').editor,
    'springpad-video': require('../types/springpad-video').editor
  },
  template: require('./template.html'),
  methods: {
    destroy: function() {
      this.$destroy(true);
    },
    save: function() {
      var self = this;
      // get doc from editor
      var doc = this.$.editor.output();
      // save doc
      this._db.post(doc, function(err, resp) {
        if (err) {
          // TODO: maybe tell somebody...
          console.log('error: ', err);
        } else {
          // TODO: trigger content reload, etc.
          self.$destroy(true);
        }
      });
    }
  }
});
