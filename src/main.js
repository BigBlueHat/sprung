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
    openMakeModal: function() {
      // with no thing ID provided, open a blank editing form
      var app = this;
      var modal = new MakeModal({
        data: {
          schema_name: 'springpad-note'
        },
        afterDestroy: function() {
          app.ui.modalIsOpen = false
        }
      });
      app.ui.modalIsOpen = true;
      modal.$appendTo('body');
    }
  },
  components: {
    'import-form': require('./import-form'),
    'thing-list': require('./thing-list'),
    'thing-type-list': require('./thing-type-list'),
    'thing-notebook-list': require('./thing-notebook-list'),
    'vue-schema': require('./vue-schema')
  },
  filters: {
    iconize: require('./filters/iconize')
  }
});
