var isDragging = null;

const onDragged = ({
  el,
  deltaX,
  deltaY,
  offsetX,
  offsetY,
  clientX,
  clientY,
  first,
  last
}) => {
  if (first) {
    isDragging = true;
    return;
  }
  if (last) {
    isDragging = false;
    return;
  }

  const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
  el.style.left = parseFloat(el.style.left || 0) + deltaX / fontSize + "em";
  el.style.top = parseFloat(el.style.top || 0) + deltaY / fontSize + "em";
  el.style.position = "absolute";

  var positions = JSON.parse(localStorage.positions || "{}");
  positions[el.id] = {
    left: parseFloat(el.style.left || 0),
    top: parseFloat(el.style.top || 0)
  };
  localStorage.positions = JSON.stringify(positions);
};

const addEventListeners = (el, events, handler) => {
  for (var i = 0, len = events.length; i < len; i++) {
    el.addEventListener(events[i], handler);
  }
};

const removeEventListeners = (el, events, handler) => {
  for (var i = 0, len = events.length; i < len; i++) {
    el.removeEventListener(events[i], handler);
  }
};

const POINTER_START_EVENTS = ["mousedown", "touchstart"];
const POINTER_MOVE_EVENTS = ["mousemove", "touchmove"];
const POINTER_END_EVENTS = ["mouseup", "touchend"];
var draggedElem;

const directive = {
  inserted(el, binding, vnode) {
    if (!document) return;
    if (typeof binding !== "function") {
      binding = { value: onDragged };
    }
    if (localStorage.positions) {
      const positions = JSON.parse(localStorage.positions);

      if (positions[el.id]) {
        el.style.left = positions[el.id].left + "em";
        el.style.top = positions[el.id].top + "em";
        el.style.position = "absolute";
      }
    }
    function onPointerStart(evt) {
      el.lastCoords = el.firstCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      binding.value({
        el,
        first: true,
        clientX: evt.clientX,
        clientY: evt.clientY
      });
      draggedElem = el;
    }
    function onPointerEnd(evt) {
      if (el !== draggedElem) return;
      evt.preventDefault();
      el.lastCoords = null;
      binding.value({
        el,
        last: true,
        clientX: evt.clientX,
        clientY: evt.clientY
      });
      draggedElem = null;
    }
    function onPointerMove(evt) {
      if (el !== draggedElem) return;
      evt.preventDefault();
      if (el.lastCoords) {
        var deltaX = evt.clientX - el.lastCoords.x;
        var deltaY = evt.clientY - el.lastCoords.y;
        var offsetX = evt.clientX - el.firstCoords.x;
        var offsetY = evt.clientY - el.firstCoords.y;
        var clientX = evt.clientX;
        var clientY = evt.clientY;

        binding.value({
          el,
          deltaX,
          deltaY,
          offsetX,
          offsetY,
          clientX,
          clientY
        });
        el.lastCoords = {
          x: evt.clientX,
          y: evt.clientY
        };
      }
    }
    addEventListeners(el, POINTER_START_EVENTS, onPointerStart);
    addEventListeners(
      document.documentElement,
      POINTER_END_EVENTS,
      onPointerEnd
    );
    addEventListeners(
      document.documentElement,
      POINTER_MOVE_EVENTS,
      onPointerMove
    );
  },

  unbind(el) {
    removeEventListeners(el, POINTER_START_EVENTS);
    removeEventListeners(document.documentElement, POINTER_END_EVENTS);
    removeEventListeners(document.documentElement, POINTER_MOVE_EVENTS);
  }
};

const defaultOptions = {};
export default {
  install: function(Vue, options) {
    options = Object.assign({}, defaultOptions, options);
    let major = Number(Vue.version.split(".")[0]);
    let minor = Number(Vue.version.split(".")[1]);
    if (major < 2 && minor < 1) {
      throw new Error(
        `v-dragged supports vue version 2.1 and above. You are using Vue@${Vue.version}. Please upgrade to the latest version of Vue.`
      );
    }
    // registration
    Vue.directive("dragged", directive);
  },
  directive
};
