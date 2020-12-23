// Gets the mouse position
const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx =
      e.clientX + window.body.scrollLeft + document.documentElement.scrollLeft;
    posy =
      e.clientY + window.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: posx, y: posy };
};

// Linear interpolation
const interpolate = (a, b, n) => (1 - n) * a + n * b;

// Track the mouse position
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

export default class Cursor {
  constructor(el) {
    this.el = el;
    this.el.style.opacity = 0;

    this.bounds = this.el.getBoundingClientRect();

    this.style = {
      tx: { previous: 0, current: 0, speed: 0.3 },
      ty: { previous: 0, current: 0, speed: 0.3 },
    };

    this.onMouseMoveEv = () => {
      this.style.tx.previous = this.style.tx.current =
        mouse.x - this.bounds.width / 2;
      this.style.ty.previous = this.style.ty.previous =
        mouse.y - this.bounds.height / 2;
      this.el.style.opacity = 1;
      requestAnimationFrame(() => this.render());
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };

    window.addEventListener("mousemove", this.onMouseMoveEv);
  }

  render() {
    this.style["tx"].current = mouse.x - this.bounds.width / 2;
    this.style["ty"].current = mouse.y - this.bounds.height / 2;

    for (const key in this.style) {
      this.style[key].previous = interpolate(
        this.style[key].previous,
        this.style[key].current,
        this.style[key].speed
      );
    }

    this.el.style.transform = `translateX(${this.style["tx"].previous}px) translateY(${this.style["ty"].previous}px)`;

    requestAnimationFrame(() => this.render());
  }
}
