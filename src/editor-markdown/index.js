module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function() {
    return {
      name: '',
      content: ''
    }
  },
  methods: {
    output: function() {
      var doc = {
        name: this.name,
        content: this.content,
        type: 'Markdown'
      }
      return doc;
    }
  },
  filters: {
    marked: require('marked')
  }
};
