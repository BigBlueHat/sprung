var data = function() {
  return {
    name: '',
    content: ''
  }
};

let marked = required('marked');

let computed = {
  preview() {
    return marked(this.content);
  }
};

module.exports = {
  viewer: {
    replace: true,
    template: require('./viewer.html'),
    data: data,
    computed: computed
  },
  editor: {
    template: require('./editor.html'),
    replace: true,
    data: data,
    computed: computed,
    methods: {
      output: function() {
        var doc = {
          name: this.name,
          content: this.content,
          type: 'Markdown'
        }
        return doc;
      }
    }
  }
};
