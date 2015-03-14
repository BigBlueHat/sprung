(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = '<form class="ui horizontal form">\n  <div class="inline field">\n    <label for="url">URL</label>\n    <input v-model="url" type="text">\n    <p class="message"><small>URL of the video</small></p>\n  </div>\n  <div class="ui basic segment">\n    <o-embed v-ref="preview" embed-url="{{url}}"></o-embed>\n  </div>\n</form>\n';
},{}],2:[function(require,module,exports){
var data = function() {
  return {
    "name": "",
    "url": "",
    "description": "",
    "image": "",
    "videos": [],
    "tags": [],
    "public": false,
    "complete": false,
    "liked": false,
    "type": "Video",
  }
};

var components = {
  'o-embed': {
    replace: true,
    template: '<div class="embed">{{{ oembed.html }}}</div>',
    paramAttributes: ['embed-url'],
    data: function() {
      return {
        embedUrl: "",
        oembed: {
          url: "",
          type: "",
          version: "",
          title: "",
          author: "",
          provider_name: "",
          thumbnail_url: "",
          thumbnail_width: 0,
          thumbnail_height: 0,
          html: ""
        }
      };
    },
    watch: {
      embedUrl: function() {
        console.log(this.embedUrl);
        if (!this.embedUrl) return false;
        var self = this;
        var oembed_url = 'http://open.iframe.ly/api/oembed?url='
          + this.embedUrl
          // TODO: make the origin value configurable
          + '&origin=BigBlueHat';
        var xhr = new XMLHttpRequest();

        xhr.open('GET', oembed_url);
        xhr.onload = function () {
          self.oembed = JSON.parse(xhr.responseText);
        };
        xhr.send();
      }
    }
  }
};

Vue.component('springpad-video-viewer', {
  template: require('./viewer.html'),
  data: data,
  components: components
});

Vue.component('springpad-video-editor', {
  template: require('./editor.html'),
  replace: true,
  data: data,
  components: components,
  methods: {
    output: function() {
      var oembed = this.$.preview.oembed;
      this.name = oembed.title;
      this.image = oembed.thumbnail_url;
      this.videos.push(this.url);
      // TODO: store the HTML to avoid hitting the oEmbed API constantly
      return this.$data;
    }
  }
});

},{"./editor.html":1,"./viewer.html":3}],3:[function(require,module,exports){
module.exports = '<div class="ui two column grid">\n  <div class="column">\n    <div class="ui tag labels" v-if="tags">\n      <div class="ui label" v-repeat="tags">{{$value}}</div>\n    </div>\n  </div>\n  <div class="column">\n    <div class="ui mini divided horizontal list">\n      <div class="item"><i v-class="disabled: !liked, red: liked" class="heart icon"></i></div>\n      <div class="item"><i v-class="disabled: !complete, green: complete" class="check circle outline icon"></i></div>\n      <div class="item">Created: {{created}}</div>\n      <div class="item">Modified: {{modified}}</div>\n    </div>\n  </div>\n</div>\n\n<div class="ui basic segment">\n  <o-embed embed-url="{{url}}"></o-embed>\n</div>\n';
},{}]},{},[2])