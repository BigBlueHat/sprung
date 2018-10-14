var key = require('keymaster');

module.exports = {
  replace: true,
  template: require('./template.html'),
  data: function() {
    return {
      // TODO: change user to username to avoid confusion with user object
      user: "",
      pass: ""
    };
  },
  created: function() {
    document.body.classList.add('dimmed', 'dimmable', 'scrolling');
  },
  mounted: function() {
    let self = this;
    self.$nextTick(() => {
      key('esc', function() {
        self.destroy();
      });
      self.$el.querySelector('[name=username]').focus();
    });
  },
  methods: {
    login: function() {
      var self = this;
      // do the login
      self.$db.login(self.user, self.pass).then(function(resp) {
        if (!resp.ok) {
          if (resp.name === 'unauthorized') {
            console.log('resp', resp);
            // name or password incorrect
            alert('blast...wrong login');
          } else {
            console.log('resp', resp);
            // cosmic rays, a meteor, etc.
            alert('...something terrible just happened...maybe...');
          }
        } else {
          // logged in
          self.$db.getSession(function (err, resp) {
              if (err) {
                // network error
              } else if (resp.userCtx.name) {
                // response.userCtx.name is the current user
                // TODO: ...ugh...$parent access... :P
                self.$parent.user = resp.userCtx;
                self.destroy();
              }
          });
        }
      });
    },
    destroy: function() {
      // TODO: danger: this could remove a sites version of these :( namespace?
      document.body.classList.remove('dimmed', 'dimmable', 'scrolling');
      this.$destroy(true);
    }
  }
};
