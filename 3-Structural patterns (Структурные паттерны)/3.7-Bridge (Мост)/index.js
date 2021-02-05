/**
 * *! Реализация паттерна Мост на классах
 */

/* ------------------------------- Абстракция ------------------------------- */

class PageComponent {
  getTemplate() {
    throw new Error(`Не описан метод getTemplate`);
  }

  getStyles() {
    throw new Error(`Не описан метод getStyles`);
  }
}

/* -------------------------------------------------------------------------- */

class IndexPage extends PageComponent {
  constructor(template, styles) {
    super();

    this.template = template;
    this.styles = styles;
  }

  getTemplate() {
    return this.template.render();
  }

  getStyles() {
    this.styles.appendStyles();
  }
}

class ContactPage extends PageComponent {
  constructor(template, styles) {
    super();

    this.template = template;
    this.styles = styles;
  }

  getTemplate() {
    // Делаем что-то
  }

  getStyles() {}
}

/* ------------------------------- Реализация ------------------------------- */

class IndexTemplate {
  render() {
    return `<html>Index</html>`;
  }
}

class ContactTemplate {
  render() {
    return `<html>Contact</html>`;
  }
}

class Styles {
  appendStyles() {
    return `background: black`;
  }
}

/* ------------------------------ Использование ----------------------------- */

const indexPageTemplate = new IndexTemplate();
const contactPageTemplate = new ContactTemplate();
const allStyles = new Styles();

const indexPage = new IndexPage(indexPageTemplate, allStyles);
const contactPage = new ContactPage(contactPageTemplate, allStyles);
