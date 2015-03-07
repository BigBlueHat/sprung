module.exports = {
  data: function() {
    return {
      id: '',
      schema: {}
    };
  },
  template: require('./template.html'),
  components: {
    'json-schema-property': {
      replace: true,
      template: require('./property-template.html')
    }
  },
  filters: {
    input_type: function(value) {
      var types = {
          string: 'text',
          integer: 'number'
      }
      return types[value];
    }
  },
  watch: {
    id: function() {
      this.fetchSchema();
    }
  },
  methods: {
    fetchSchema: function() {
      if (!this.id) return false;
      var xhr = new XMLHttpRequest(),
          self = this;
      xhr.open('GET', self.id);
      xhr.onload = function () {
        self.schema = JSON.parse(xhr.responseText);
        if (self.schema.title) {
          self.$parent.name = self.schema.title;
          self.schema.title = '';
        } else {
          self.$parent.name = self.id;
        }
      };
      xhr.send();

    },
    output: function() {
      var jsonDOM = this.$el.querySelectorAll('[data-json]');
      var json = {};
      function accumulate(obj, dom) {
        for (var i = 0; i < dom.length; i++) {
          if (dom[i].dataset['json'] == 'kvp') {
            var key = dom[i].querySelector('label').getAttribute('for');
            var value = '';
            if (dom[i].querySelector('input') !== null) {
              obj[key] = dom[i].querySelector('input').value;
            } else {
              obj[key] = dom[i].querySelector('textarea').value;
            }
          } else if (dom[i].dataset['json'] == 'object') {
            var legend = dom[i].querySelector('legend').getAttribute('data-key');
            var sub_dom = dom[i].querySelectorAll('[data-json]');
            obj[legend] = accumulate({}, sub_dom);
            i += sub_dom.length;
          }
        }
        return obj;
      }
      return accumulate(json, jsonDOM);
    }
  }
};
