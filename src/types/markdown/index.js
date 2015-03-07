var data = function() {
  return {
    name: '',
    content: ''
  }
};

var filters = {
  marked: require('marked')
};

module.exports = {
  viewer: {
    replace: true,
    template: require('./viewer.html'),
    data: data,
    filters: filters
  },
  editor: {
    template: require('./editor.html'),
    replace: true,
    data: data,
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
    filters: filters
  }
};
