// Декоратор bind - привязка контекста

function bind(func, context) {
  return function () {
    return func.apply(context, arguments);
  };
}

// Декоратор логирования

function log(Class) {
  return (...args) => {
    console.log(args);
    return new Class(...args);
  };
}

// @log -> Использование
// class Caclulator() {
//     static sum(a, b) {
//         return a + b;
//     }
// }

// Специальный миксин, с помощью которого легко и удобно создавать декораторы, добавляющие новые методы к классу

function mixin(behaviour, sharedBehaviour = {}) {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol(`isa`);

  function _mixin(clazz) {
    for (let property of instanceKeys) {
      Object.defineProperty(clazz.prototype, property, {
        value: behaviour[property],
      });
    }
    Object.defineProperty(clazz.prototype, typeTag, { value: true });
    return clazz;
  }
  for (let property of sharedKeys) {
    Object.defineProperty(_mixin, property, {
      value: sharedBehaviour[property],
      enumerable: sharedBehaviour.propertyIsEnumerable(property),
    });
  }
  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[typeTag],
  });
  return _mixin;
}

const newMethods = mixin({
  getSome(some) {
    this.some = some;
  },
  showSome() {
    console.log(this.some);
  },
});

@newMethods
class ComicBookCharacter {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }

  realName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const hero = new ComicBookCharacter();

hero.getSome("SP");
hero.showSome();
