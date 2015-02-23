var Vue = require('vue');

// TODO: require VueSchema (can't...it's using pure >_<)
// setup openMakeModal('vue-schema', 'schema-name');
// ... uses VueSchema to create HTML
// ... which it puts in the body of the modal
// ... and MakeModal sets the header
// or openMakeModal('...form?...')
// someother thing generates (or GETs) the HTML form
// ... and gives MakeModal a header
module.exports = Vue.extend({
  data: function() {
    return {
      name: '',
      schema_url: ''
    };
  },
  components: {
    'vue-schema': require('../vue-schema')
  },
  template: require('./template.html'),
  methods: {
    destroy: function() {
      this.$destroy(true);
    }
  }
});
