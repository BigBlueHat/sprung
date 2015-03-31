(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = '<form class="ui horizontal form">\n<div class="inline field" data-json="kvp">\n  <label for="name">Name</label>\n  <input v-model="name" type="text">\n  <p class="message"><small>Name or title of the object</small></p>\n</div>\n<div class="inline field" data-json="kvp">\n  <label for="text">Text</label>\n  <textarea v-model="text"></textarea>\n  <p class="message"><small>The contents of the note (may be HTML-formatted)</small></p>\n</div>\n<div class="inline field" data-json="kvp">\n  <label for="tags">Tags</label>\n  <input v-model="tags">\n  <p class="message"><small>List of tags</small></p>\n</div>\n<div class="inline field" data-json="kvp">\n  <label for="rating">Rating</label>\n  <input v-model="rating" type="number" min="0" max="5">\n  <p class="message"><small>Rating of the object (0-5)</small></p>\n</div>\n<div class="inline field" data-json="kvp">\n  <label for="springpad-note-liked">Liked</label>\n  <input id="springpad-note-liked" type="checkbox" v-model="liked">\n  <p class="message"><small>Did the user mark this liked?</small></p>\n</div>\n<div class="inline field" data-json="kvp">\n  <label for="springpad-note-complete">Complete</label>\n  <input id="springpad-note-complete" type="checkbox" v-model="complete">\n  <p class="message"><small>Springpad objects can be marked complete (e.g., is the task done? has the movie been watched?)</small></p>\n</div>\n<div class="inline field" data-json="kvp">\n  <label for="springpad-note-public">Public</label>\n  <input id="springpad-note-public" type="checkbox" v-model="public">\n  <p class="message"><small>Is this public or not?</small></p>\n</div>\n\n</form>\n';
},{}],2:[function(require,module,exports){
Vue.component('springpad-note-viewer', {
  template: require('./viewer.html')
});

Vue.component('springpad-note-editor', {
  template: require('./editor.html'),
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
});

},{"./editor.html":1,"./viewer.html":3}],3:[function(require,module,exports){
module.exports = '<div class="ui two column grid">\n  <div class="column">\n    <div class="ui tag labels" v-if="tags">\n      <div class="ui label" v-repeat="tags">{{$value}}</div>\n    </div>\n  </div>\n  <div class="column">\n    <div class="ui mini divided horizontal list">\n      <div class="item"><i v-class="disabled: !liked, red: liked" class="heart icon"></i></div>\n      <div class="item"><i v-class="disabled: !complete, green: complete" class="check circle outline icon"></i></div>\n      <div class="item">Created: {{created}}</div>\n      <div class="item">Modified: {{modified}}</div>\n    </div>\n  </div>\n</div>\n\n<div class="ui basic segment">{{{text}}}</div>\n';
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIl9kb2NzL3R5cGV+c3ByaW5ncGFkLW5vdGUvZWRpdG9yLmh0bWwiLCJfZG9jcy90eXBlfnNwcmluZ3BhZC1ub3RlL2luZGV4LmpzIiwiX2RvY3MvdHlwZX5zcHJpbmdwYWQtbm90ZS92aWV3ZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gJzxmb3JtIGNsYXNzPVwidWkgaG9yaXpvbnRhbCBmb3JtXCI+XFxuPGRpdiBjbGFzcz1cImlubGluZSBmaWVsZFwiIGRhdGEtanNvbj1cImt2cFwiPlxcbiAgPGxhYmVsIGZvcj1cIm5hbWVcIj5OYW1lPC9sYWJlbD5cXG4gIDxpbnB1dCB2LW1vZGVsPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XFxuICA8cCBjbGFzcz1cIm1lc3NhZ2VcIj48c21hbGw+TmFtZSBvciB0aXRsZSBvZiB0aGUgb2JqZWN0PC9zbWFsbD48L3A+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cImlubGluZSBmaWVsZFwiIGRhdGEtanNvbj1cImt2cFwiPlxcbiAgPGxhYmVsIGZvcj1cInRleHRcIj5UZXh0PC9sYWJlbD5cXG4gIDx0ZXh0YXJlYSB2LW1vZGVsPVwidGV4dFwiPjwvdGV4dGFyZWE+XFxuICA8cCBjbGFzcz1cIm1lc3NhZ2VcIj48c21hbGw+VGhlIGNvbnRlbnRzIG9mIHRoZSBub3RlIChtYXkgYmUgSFRNTC1mb3JtYXR0ZWQpPC9zbWFsbD48L3A+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cImlubGluZSBmaWVsZFwiIGRhdGEtanNvbj1cImt2cFwiPlxcbiAgPGxhYmVsIGZvcj1cInRhZ3NcIj5UYWdzPC9sYWJlbD5cXG4gIDxpbnB1dCB2LW1vZGVsPVwidGFnc1wiPlxcbiAgPHAgY2xhc3M9XCJtZXNzYWdlXCI+PHNtYWxsPkxpc3Qgb2YgdGFnczwvc21hbGw+PC9wPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJpbmxpbmUgZmllbGRcIiBkYXRhLWpzb249XCJrdnBcIj5cXG4gIDxsYWJlbCBmb3I9XCJyYXRpbmdcIj5SYXRpbmc8L2xhYmVsPlxcbiAgPGlucHV0IHYtbW9kZWw9XCJyYXRpbmdcIiB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjVcIj5cXG4gIDxwIGNsYXNzPVwibWVzc2FnZVwiPjxzbWFsbD5SYXRpbmcgb2YgdGhlIG9iamVjdCAoMC01KTwvc21hbGw+PC9wPlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJpbmxpbmUgZmllbGRcIiBkYXRhLWpzb249XCJrdnBcIj5cXG4gIDxsYWJlbCBmb3I9XCJzcHJpbmdwYWQtbm90ZS1saWtlZFwiPkxpa2VkPC9sYWJlbD5cXG4gIDxpbnB1dCBpZD1cInNwcmluZ3BhZC1ub3RlLWxpa2VkXCIgdHlwZT1cImNoZWNrYm94XCIgdi1tb2RlbD1cImxpa2VkXCI+XFxuICA8cCBjbGFzcz1cIm1lc3NhZ2VcIj48c21hbGw+RGlkIHRoZSB1c2VyIG1hcmsgdGhpcyBsaWtlZD88L3NtYWxsPjwvcD5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwiaW5saW5lIGZpZWxkXCIgZGF0YS1qc29uPVwia3ZwXCI+XFxuICA8bGFiZWwgZm9yPVwic3ByaW5ncGFkLW5vdGUtY29tcGxldGVcIj5Db21wbGV0ZTwvbGFiZWw+XFxuICA8aW5wdXQgaWQ9XCJzcHJpbmdwYWQtbm90ZS1jb21wbGV0ZVwiIHR5cGU9XCJjaGVja2JveFwiIHYtbW9kZWw9XCJjb21wbGV0ZVwiPlxcbiAgPHAgY2xhc3M9XCJtZXNzYWdlXCI+PHNtYWxsPlNwcmluZ3BhZCBvYmplY3RzIGNhbiBiZSBtYXJrZWQgY29tcGxldGUgKGUuZy4sIGlzIHRoZSB0YXNrIGRvbmU/IGhhcyB0aGUgbW92aWUgYmVlbiB3YXRjaGVkPyk8L3NtYWxsPjwvcD5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwiaW5saW5lIGZpZWxkXCIgZGF0YS1qc29uPVwia3ZwXCI+XFxuICA8bGFiZWwgZm9yPVwic3ByaW5ncGFkLW5vdGUtcHVibGljXCI+UHVibGljPC9sYWJlbD5cXG4gIDxpbnB1dCBpZD1cInNwcmluZ3BhZC1ub3RlLXB1YmxpY1wiIHR5cGU9XCJjaGVja2JveFwiIHYtbW9kZWw9XCJwdWJsaWNcIj5cXG4gIDxwIGNsYXNzPVwibWVzc2FnZVwiPjxzbWFsbD5JcyB0aGlzIHB1YmxpYyBvciBub3Q/PC9zbWFsbD48L3A+XFxuPC9kaXY+XFxuXFxuPC9mb3JtPlxcbic7IiwiVnVlLmNvbXBvbmVudCgnc3ByaW5ncGFkLW5vdGUtdmlld2VyJywge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92aWV3ZXIuaHRtbCcpXG59KTtcblxuVnVlLmNvbXBvbmVudCgnc3ByaW5ncGFkLW5vdGUtZWRpdG9yJywge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9lZGl0b3IuaHRtbCcpLFxuICByZXBsYWNlOiB0cnVlLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICBcInRleHRcIjogXCJcIixcbiAgICAgIFwiaW1hZ2VcIjogXCJcIixcbiAgICAgIFwidGFnc1wiOiBbXSxcbiAgICAgIFwicHVibGljXCI6IGZhbHNlLFxuICAgICAgXCJjb21wbGV0ZVwiOiBmYWxzZSxcbiAgICAgIFwibGlrZWRcIjogZmFsc2UsXG4gICAgICBcInR5cGVcIjogXCJOb3RlXCIsXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb3V0cHV0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLiRkYXRhO1xuICAgIH1cbiAgfVxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwidWkgdHdvIGNvbHVtbiBncmlkXCI+XFxuICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJ1aSB0YWcgbGFiZWxzXCIgdi1pZj1cInRhZ3NcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwidWkgbGFiZWxcIiB2LXJlcGVhdD1cInRhZ3NcIj57eyR2YWx1ZX19PC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJ1aSBtaW5pIGRpdmlkZWQgaG9yaXpvbnRhbCBsaXN0XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj48aSB2LWNsYXNzPVwiZGlzYWJsZWQ6ICFsaWtlZCwgcmVkOiBsaWtlZFwiIGNsYXNzPVwiaGVhcnQgaWNvblwiPjwvaT48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiPjxpIHYtY2xhc3M9XCJkaXNhYmxlZDogIWNvbXBsZXRlLCBncmVlbjogY29tcGxldGVcIiBjbGFzcz1cImNoZWNrIGNpcmNsZSBvdXRsaW5lIGljb25cIj48L2k+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj5DcmVhdGVkOiB7e2NyZWF0ZWR9fTwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+TW9kaWZpZWQ6IHt7bW9kaWZpZWR9fTwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblxcbjxkaXYgY2xhc3M9XCJ1aSBiYXNpYyBzZWdtZW50XCI+e3t7dGV4dH19fTwvZGl2Plxcbic7Il19
