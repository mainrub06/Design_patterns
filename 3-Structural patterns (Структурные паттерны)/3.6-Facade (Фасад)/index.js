/**
 * *!Здесь классовое использование паттерна Фасад
 */

class Bank {
  constructor(user) {
    this._balance = user.balance;
    this._payments = user.payments;
    this._history = [];
    this._creditStory = [];
  }

  getBalance() {
    return this._balance;
  }

  getHistory() {
    this._history = [...this._payments];

    return this._history;
  }

  getCreditStory() {
    this._creditStory = this._history.filter(
      (check) => check.type === "for credit"
    );

    return this._creditStory;
  }
}

class CreditFacade {
  constructor(user) {
    this.name = user.username;
  }

  isPossibleToGetCredit() {
    const client = new Bank(this.user);
    const percentCreditPayments =
      (client.getCreditStory().length / client.getHistory().length) * 100;
    const balance = client.getBalance();

    return percentCreditPayments > 50 && balance > 0 ? true : false;
  }
}

const user = {
  // Здесь данные клиента
};

const creditPlatform = new CreditFacade(user);
const canIGetCreditFromBank = creditPlatform.isPossibleToGetCredit(); // true or false
