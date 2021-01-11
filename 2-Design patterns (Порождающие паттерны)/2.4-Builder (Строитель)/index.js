(function (win, doc) {
  function Circle() {
    this.item = doc.createElement("div");
  }

  Circle.prototype.color = function (color) {
    this.item.style.background = color;
  };

  Circle.prototype.move = function (left, top) {
    this.item.style.left = left;
    this.item.style.top = top;
  };

  function RedCircleBuilder() {
    this.item = new Circle();
  }

  RedCircleBuilder.prototype.init = function () {
    this.item.color("red");
  };

  RedCircleBuilder.prototype.get = function () {
    return this.item;
  };

  function BlueCircleBuilder() {
    this.item = new Circle();
  }

  BlueCircleBuilder.prototype.init = function () {
    this.item.color("blue");
  };

  BlueCircleBuilder.prototype.get = function () {
    return this.item;
  };
})(window, document);
