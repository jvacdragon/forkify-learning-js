class SearchView{

    _searchField = document.querySelector('.search__field')
    getQuery(){
       this.query = this._searchField.value
       this._clear()
       return this.query

    }

    _clear(){
        this._searchField.value = ''
    }
    
    addHandlerSearch(handler){
        document.querySelector('.search__btn').addEventListener('click', function(e){
            e.preventDefault()
            handler()
        })
    }
}

export default new SearchView();