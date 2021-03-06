(function (win, doc) {
  function RedCircle() {}
  RedCircle.prototype.create = function () {
    this.item = doc.createElement("div");
    this.item.style.backgroundColor = "red";
    return this;
  };

  function BlueCircle() {}

  BlueCircle.prototype.create = function () {
    this.item = doc.createElement("div");
    this.item.style.backgroundColor = "blue";
    return this;
  };

  CircleFactory = function () {
    this.types = {};
    this.create = function (type) {
      return new this.types[type]().create();
    };

    this.register = function (type, cls) {
      if (cls.prototype.create) {
        this.types[type] = cls;
      }
    };
  };

  var CircleGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _aCircle = [],
        _stage = win.document.querySelector(".ex"),
        _cf = new CircleFactory();
      _cf.register("red", RedCircle);
      _cf.register("blue", BlueCircle);

      function _position(circle, left, top) {
        circle.css("left", left);
        circle.css("top", top);
      }

      function create(left, top, type) {
        var circle = _cf.create(type).item;
        _position(circle, left, top);
        return circle;
      }

      function add(circle) {
        _stage.append(circle);
        _aCircle.push(circle);
      }

      function index() {
        return _aCircle.length;
      }

      return { index: index, create: create, add: add };
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = init();
        }

        return instance;
      },
    };
  })();

  doc.addEventListener("DOMConentnLoaded", function () {
    doc.querySelector(".target").addEventListener("click", function () {
      var cg = CircleGeneratorSingleton.getInstance();
      var circle = cg.create(e.pageX - 25, e.pageY - 25, "red");

      cg.add(circle);
    });

    doc.addEventListener("keypress", function (e) {
      if (e.key === "a") {
        var cg = CircleGeneratorSingleton.getInstance();
        var circle = cg.create(
          Math.floor(Math.random() * 600),
          Math.floor(Math.random() * 600),
          "blue"
        );

        cg.add(circle);
      }
    });
  });
})(window, document);
