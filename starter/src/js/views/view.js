import icons from '../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateHTML();

    if (!render) return html;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newHTML = this._generateHTML();

    const newdom = document.createRange().createContextualFragment(newHTML);

    const newElements = Array.from(newdom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    //UPDATES TO CHANGE TEXT
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //UPDATES TO CHANGE ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(at =>
          curEl.setAttribute(at.name, at.value)
        );
      }
    });
  }

  renderSpinner() {
    const HTML = `
            <div class="spinner">
              <svg>
                  <use href="${icons}.svg#icon-loader"></use>
              </svg>
            </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', HTML);
  }

  renderError(message = this._errorMessage) {
    const html = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(message) {
    const html = `
            <div class="class">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  addHandlerEvent(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }
}
