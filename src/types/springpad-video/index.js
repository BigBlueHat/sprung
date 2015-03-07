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

module.exports = {
  viewer: {
    template: require('./viewer.html'),
    data: data,
    components: components
  },
  editor: {
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
  }
};
