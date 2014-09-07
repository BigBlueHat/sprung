var Vue = require('vue');

module.exports = Vue.extend({
  template: require('./template.html'),
  filters: {
    iconize: require('../filters/iconize')
  }
});
