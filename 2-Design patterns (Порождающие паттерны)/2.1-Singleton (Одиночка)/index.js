// -------------- Exampel - 1 --------------

const singleton = (function () {
  let instance;

  function User(name, age) {
    this.name = name;
    this.age = age;
  }
  return {
    getInstance: function (name, age) {
      if (!instance) {
        instance = new User(name, age);
      }
      return instance;
    },
  };
})();

const user1 = singleton.getInstance("Peter", 24);
const user2 = singleton.getInstance("Mark", 26);

// prints true
console.log(user1 === user2);

// -------------- Exampel - 2 --------------

(function (win, doc) {
  //-----------Singleton-----------

  const CircleGeneratorSingleton = function () {
    let instance;

    function init() {
      let _aCircle = [],
        _stage = doc.querySelector(".example");

      function _setPosition(circle, left, top) {
        circle.style.left = left;
        circle.style.top = top;
      }

      function create(left, top) {
        let circle = doc.createElement("div");

        _setPosition(circle, left, top);

        return circle;
      }

      function add(circle) {
        _stage.append(circle);
        _aCircle.push(circle);
      }

      function index() {
        return _aCircle.length;
      }

      return {
        index,
        create,
        add,
      };
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = init();
        }

        return instance;
      },
    };
  };

  doc.querySelector(".target").addEventListener("click", function (e) {
    const singletonCreator = CircleGeneratorSingleton.getInstance();

    const circle = singletonCreator.create(e.pageX - 25, e.pageY - 25);

    singletonCreator.add(circle);
  });
})(window, document);
