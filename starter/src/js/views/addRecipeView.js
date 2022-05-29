import View from './view';

class AddRecipe extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowAWindow();
    this._addHandlerHideAWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowAWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideAWindow() {
    this._btnClose.addEventListener('click', function(){
      this.toggleWindow
      location.reload()
    })
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      ///using data from a form as array
      const dataArr = [...new FormData(this)];

      ///converting the data in an object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipe();
