module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function() {
    return {
      "name": "",
      "text": "",
      "image": "",
      "tags": [],
      "public": false,
      "complete": false,
      "liked": false,
      "type": "Note",
    }
  },
  methods: {
    output: function() {
      return this.$data;
    }
  }
};
