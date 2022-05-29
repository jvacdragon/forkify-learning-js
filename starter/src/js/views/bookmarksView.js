import View from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateHTML() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
/*   _previewHTML(result) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}.</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
        </li>
        `;
  } */
}

export default new bookmarksView();
