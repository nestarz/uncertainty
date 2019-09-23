import { Remarkable } from "/web_modules/remarkable/dist/esm/index.browser.js";

export default {
  install: function(Vue, options) {
    Vue.prototype.$md = new Remarkable();
    Vue.component("remarkable", {
      render: function(createElement) {
        console.log(
          this.$slots.default.reduce((prev, curr) => `${prev} ${curr.text}`, "")
        );
        return createElement(
          "div", // nom de balise
          {
            domProps: {
              innerHTML: this.$md.render(
                this.$slots.default.reduce(
                  (prev, curr) => prev.text + curr.text,
                  ""
                )
              ) // tableau des enfants
            }
          }
        );
      }
    });
  }
};
