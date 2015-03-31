(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = '<form class="ui horizontal form">\n  <div class="inline field">\n    <label for="url">URL</label>\n    <input v-model="doc.url" type="text">\n    <p class="message"><small>URL of the video</small></p>\n  </div>\n  <div class="ui basic segment">\n    <o-embed v-ref="preview" embed-url="{{doc.url}}"></o-embed>\n  </div>\n</form>\n';
},{}],2:[function(require,module,exports){
var data = function() {
  return {
    doc: {
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
      this.doc.name = oembed.title;
      this.doc.image = oembed.thumbnail_url;
      this.doc.videos.push(this.url);
      // TODO: store the HTML to avoid hitting the oEmbed API constantly
      return this.$data.doc;
    }
  }
});

},{"./editor.html":1,"./viewer.html":3}],3:[function(require,module,exports){
module.exports = '<div class="ui two column grid">\n  <div class="column">\n    <div class="ui tag labels" v-if="tags">\n      <div class="ui label" v-repeat="tags">{{$value}}</div>\n    </div>\n  </div>\n  <div class="column">\n    <div class="ui mini divided horizontal list">\n      <div class="item"><i v-class="disabled: !liked, red: liked" class="heart icon"></i></div>\n      <div class="item"><i v-class="disabled: !complete, green: complete" class="check circle outline icon"></i></div>\n      <div class="item">Created: {{created}}</div>\n      <div class="item">Modified: {{modified}}</div>\n    </div>\n  </div>\n</div>\n\n<div class="ui basic segment">\n  <o-embed embed-url="{{url}}"></o-embed>\n</div>\n';
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcQmVuamFtaW5cXEFwcERhdGFcXFJvYW1pbmdcXG5wbVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJjOi9Vc2Vycy9CZW5qYW1pbi9Eb2N1bWVudHMvR2l0SHViL3NwcnVuZy9fZG9jcy90eXBlfnNwcmluZ3BhZC12aWRlby9lZGl0b3IuaHRtbCIsImM6L1VzZXJzL0JlbmphbWluL0RvY3VtZW50cy9HaXRIdWIvc3BydW5nL19kb2NzL3R5cGV+c3ByaW5ncGFkLXZpZGVvL2luZGV4LmpzIiwiYzovVXNlcnMvQmVuamFtaW4vRG9jdW1lbnRzL0dpdEh1Yi9zcHJ1bmcvX2RvY3MvdHlwZX5zcHJpbmdwYWQtdmlkZW8vdmlld2VyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9ICc8Zm9ybSBjbGFzcz1cInVpIGhvcml6b250YWwgZm9ybVwiPlxcbiAgPGRpdiBjbGFzcz1cImlubGluZSBmaWVsZFwiPlxcbiAgICA8bGFiZWwgZm9yPVwidXJsXCI+VVJMPC9sYWJlbD5cXG4gICAgPGlucHV0IHYtbW9kZWw9XCJkb2MudXJsXCIgdHlwZT1cInRleHRcIj5cXG4gICAgPHAgY2xhc3M9XCJtZXNzYWdlXCI+PHNtYWxsPlVSTCBvZiB0aGUgdmlkZW88L3NtYWxsPjwvcD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cInVpIGJhc2ljIHNlZ21lbnRcIj5cXG4gICAgPG8tZW1iZWQgdi1yZWY9XCJwcmV2aWV3XCIgZW1iZWQtdXJsPVwie3tkb2MudXJsfX1cIj48L28tZW1iZWQ+XFxuICA8L2Rpdj5cXG48L2Zvcm0+XFxuJzsiLCJ2YXIgZGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBkb2M6IHtcclxuICAgICAgXCJuYW1lXCI6IFwiXCIsXHJcbiAgICAgIFwidXJsXCI6IFwiXCIsXHJcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJcIixcclxuICAgICAgXCJpbWFnZVwiOiBcIlwiLFxyXG4gICAgICBcInZpZGVvc1wiOiBbXSxcclxuICAgICAgXCJ0YWdzXCI6IFtdLFxyXG4gICAgICBcInB1YmxpY1wiOiBmYWxzZSxcclxuICAgICAgXCJjb21wbGV0ZVwiOiBmYWxzZSxcclxuICAgICAgXCJsaWtlZFwiOiBmYWxzZSxcclxuICAgICAgXCJ0eXBlXCI6IFwiVmlkZW9cIixcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG52YXIgY29tcG9uZW50cyA9IHtcclxuICAnby1lbWJlZCc6IHtcclxuICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJlbWJlZFwiPnt7eyBvZW1iZWQuaHRtbCB9fX08L2Rpdj4nLFxyXG4gICAgcGFyYW1BdHRyaWJ1dGVzOiBbJ2VtYmVkLXVybCddLFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZW1iZWRVcmw6IFwiXCIsXHJcbiAgICAgICAgb2VtYmVkOiB7XHJcbiAgICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgICB0eXBlOiBcIlwiLFxyXG4gICAgICAgICAgdmVyc2lvbjogXCJcIixcclxuICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgYXV0aG9yOiBcIlwiLFxyXG4gICAgICAgICAgcHJvdmlkZXJfbmFtZTogXCJcIixcclxuICAgICAgICAgIHRodW1ibmFpbF91cmw6IFwiXCIsXHJcbiAgICAgICAgICB0aHVtYm5haWxfd2lkdGg6IDAsXHJcbiAgICAgICAgICB0aHVtYm5haWxfaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgaHRtbDogXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICBlbWJlZFVybDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lbWJlZFVybCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVtYmVkVXJsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBvZW1iZWRfdXJsID0gJ2h0dHA6Ly9vcGVuLmlmcmFtZS5seS9hcGkvb2VtYmVkP3VybD0nXHJcbiAgICAgICAgICArIHRoaXMuZW1iZWRVcmxcclxuICAgICAgICAgIC8vIFRPRE86IG1ha2UgdGhlIG9yaWdpbiB2YWx1ZSBjb25maWd1cmFibGVcclxuICAgICAgICAgICsgJyZvcmlnaW49QmlnQmx1ZUhhdCc7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICB4aHIub3BlbignR0VUJywgb2VtYmVkX3VybCk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYub2VtYmVkID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5WdWUuY29tcG9uZW50KCdzcHJpbmdwYWQtdmlkZW8tdmlld2VyJywge1xyXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZpZXdlci5odG1sJyksXHJcbiAgZGF0YTogZGF0YSxcclxuICBjb21wb25lbnRzOiBjb21wb25lbnRzXHJcbn0pO1xyXG5cclxuVnVlLmNvbXBvbmVudCgnc3ByaW5ncGFkLXZpZGVvLWVkaXRvcicsIHtcclxuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9lZGl0b3IuaHRtbCcpLFxyXG4gIHJlcGxhY2U6IHRydWUsXHJcbiAgZGF0YTogZGF0YSxcclxuICBjb21wb25lbnRzOiBjb21wb25lbnRzLFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG91dHB1dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBvZW1iZWQgPSB0aGlzLiQucHJldmlldy5vZW1iZWQ7XHJcbiAgICAgIHRoaXMuZG9jLm5hbWUgPSBvZW1iZWQudGl0bGU7XHJcbiAgICAgIHRoaXMuZG9jLmltYWdlID0gb2VtYmVkLnRodW1ibmFpbF91cmw7XHJcbiAgICAgIHRoaXMuZG9jLnZpZGVvcy5wdXNoKHRoaXMudXJsKTtcclxuICAgICAgLy8gVE9ETzogc3RvcmUgdGhlIEhUTUwgdG8gYXZvaWQgaGl0dGluZyB0aGUgb0VtYmVkIEFQSSBjb25zdGFudGx5XHJcbiAgICAgIHJldHVybiB0aGlzLiRkYXRhLmRvYztcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwidWkgdHdvIGNvbHVtbiBncmlkXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJ1aSB0YWcgbGFiZWxzXCIgdi1pZj1cInRhZ3NcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwidWkgbGFiZWxcIiB2LXJlcGVhdD1cInRhZ3NcIj57eyR2YWx1ZX19PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJ1aSBtaW5pIGRpdmlkZWQgaG9yaXpvbnRhbCBsaXN0XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj48aSB2LWNsYXNzPVwiZGlzYWJsZWQ6ICFsaWtlZCwgcmVkOiBsaWtlZFwiIGNsYXNzPVwiaGVhcnQgaWNvblwiPjwvaT48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiPjxpIHYtY2xhc3M9XCJkaXNhYmxlZDogIWNvbXBsZXRlLCBncmVlbjogY29tcGxldGVcIiBjbGFzcz1cImNoZWNrIGNpcmNsZSBvdXRsaW5lIGljb25cIj48L2k+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj5DcmVhdGVkOiB7e2NyZWF0ZWR9fTwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+TW9kaWZpZWQ6IHt7bW9kaWZpZWR9fTwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJ1aSBiYXNpYyBzZWdtZW50XCI+XFxuICA8by1lbWJlZCBlbWJlZC11cmw9XCJ7e3VybH19XCI+PC9vLWVtYmVkPlxcbjwvZGl2Plxcbic7Il19
