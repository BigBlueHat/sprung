var default_data = {
  active: false,
  name: 'JSON',
  schema_url: '',
  doc: {},
  notebooks: {}
};

module.exports = {
  data: function() {
    return default_data;
  },
  components: {
    // TODO: make these dynamic...somehow
    'json': require('../json-editor'),
    'vue-schema': require('../vue-schema')
  },
  replace: true,
  template: require('./template.html'),
  computed: {
    name: function() {
      // TODO: make this smarter
      if (this.doc.type) {
        return this.doc.type;
      }
    },
    editor: function() {
      if (this.schema_url) {
        return 'vue-schema';
      } else if (this.doc.type && undefined != this.$root.types[this.doc.type]
          && undefined != this.$root.types[this.doc.type].editor) {
        return this.$root.types[this.doc.type].editor;
      } else {
        return 'json';
      }
    }
  },
  methods: {
    destroy: function() {
      this.$destroy(true);
    },
    save: function() {
      var self = this;
      // get doc from editor
      var doc = this.$.editor.output();
      if (undefined === doc._id) {
        // we have a new doc, so add `created` date
        doc.created = (new Date).toISOString();
      }
      // regardless, add the `modified` date
      doc.modified = (new Date).toISOString();

      // add this doc to the current notebook
      var notebook_id = this.$root.current.notebook._id;
      if (undefined === doc.notebooks) {
        doc.notebooks = [];
      }
      // we're inside a notebook
      if (undefined !== notebook_id
          // and this doc isn't already in that notebook
          && doc.notebooks.indexOf(notebook_id) < 0) {
        doc.notebooks.push(notebook_id);
      }

      // save doc
      self.$db.post(doc, function(err, resp) {
        if (err) {
          // TODO: maybe tell somebody...
          console.log('error: ', err);
        } else {
          // TODO: trigger content reload, etc.
          self.$dispatch('thingMade', doc);
          self.destroy();
        }
      });
    },
    remove: function() {
      var self = this;
      self.$db.remove(self.doc._id, self.doc._rev, function(err, resp) {
        if (err) {
          console.log('error: ', err);
        } else {
          self.$dispatch('thingGone', self.doc);
          // close the modal
          self.destroy();
        }
      });
    }

  }
};
