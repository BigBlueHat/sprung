var Vue = require('vue');
var MakeModal = require('./make-modal');

window.Sprung = new Vue({
  el: 'body',
  data: {
    ui: {
      sidebarIsOpen: false,
      modalIsOpen: false
    },
    current: {
      notebook: false,
      type: false
    }
  },
  methods: {
    toggleSidebar: function() {
      this.ui.sidebarIsOpen = !this.ui.sidebarIsOpen;
    },
    importFile: function() {
      document.getElementById('export-file').click()
    },
    openMakeModal: function(schema_name) {
      // with no thing ID provided, open a blank editing form
      var app = this;
      var schema_url = '_rewrite/schemas/' + schema_name;
      var data = {};
      if (schema_name) {
        data = {
          schema_url: schema_url
        };
      } else {
        data = {
          name: 'Anything'
        };
      }
      var modal = new MakeModal({
        data: data,
        destroyed: function() {
          app.ui.modalIsOpen = false
        }
      });
      app.ui.modalIsOpen = true;
      modal.$mount();
      modal.$appendTo('body');
    }
  },
  components: {
    'import-form': require('./import-form'),
    'thing-list': require('./thing-list'),
    'thing-type-list': require('./thing-type-list'),
    'thing-notebook-list': require('./thing-notebook-list')
  },
  filters: {
    iconize: require('./filters/iconize'),
    truncate: require('./filters/truncate')
  }
});
