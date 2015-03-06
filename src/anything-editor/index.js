module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function() {
    return {
      doc: {}
    }
  },
  methods: {
    output: function() {
      return this.doc;
    }
  }
};
