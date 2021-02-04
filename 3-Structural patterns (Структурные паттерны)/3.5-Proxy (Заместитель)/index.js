/**
 * *! Реализация паттерна Заместитель на классах
 */

const INVALID_PASSWORD = "0000";
const PASSWORD = "passsword";

class LabDoor {
  open() {
    console.log("Здесь что-то происходит");
  }

  close() {
    console.log("Закрытие канала");
  }
}

/* -------------- Это и сам прокси, который совершает проверку -------------- */

class Security {
  constructor(door) {
    this.door = door;
  }

  open(password) {
    if (this.authenticate(password)) {
      this.door.open();
    } else {
      console.log("Доступ запрещен, неверный пароль");
    }
  }

  authenticate(password) {
    return password === PASSWORD;
  }

  close() {
    this.door.close();
  }
}

/* -------------------------------------------------------------------------- */

const door = new Security(new LabDoor());

door.open(INVALID_PASSWORD); // Доступ запрещен, неверный пароль
door.open(PASSWORD); // Здесь что-то происходит
door.close(); // Закрытие канала

/**
 * *! Реализация паттерна на ES6 Proxy
 */

function networkFetch(url) {
  return `${url} - Response from network`;
}

// ES6 Proxy API = new Proxy(target, handler);

let cache = [];

const proxiedNetworkFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const urlParam = args[0];
    if (cache.includes(urlParam)) {
      return `${urlParam} - Response from cache`;
    } else {
      cache.push(urlParam);
      return Reflect.apply(target, thisArg, args);
    }
  },
});

console.log(proxiedNetworkFetch("dogPic.jpg")); // 'dogPic.jpg - Response from network'
console.log(proxiedNetworkFetch("dogPic.jpg")); // 'dogPic.jpg - Response from cache'
