// get input text from input field 
const getInputVal = () => {
    const inputField = document.getElementById('search-input');
    const inputVal = inputField.value;
    inputField.value = '';
    loadData(inputVal);
    //console.log(inputVal);
}
// event handler on search button
document.getElementById('search-btn').addEventListener('click', function () {
    const bookContainer = document.getElementById('book-container');
    const totalSearch = document.getElementById('total-result')
    bookContainer.textContent = '';
    totalSearch.textContent ='';
    getInputVal();
    loader(true);
});
//Input field enter key handler(*done on input field)
document.getElementById('search-input').addEventListener('keypress', function (e) {
    const bookContainer = document.getElementById('book-container');
    const totalSearch = document.getElementById('total-result');
    //console.log(e.key);
    if (e.key === 'Enter') {
        bookContainer.textContent = '';
        totalSearch.textContent ='';
        getInputVal();
        loader(true);
    }
    
})

//fetch books api
const loadData = (input) => {
    const url = `https://openlibrary.org/search.json?q=${input}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs));
}

// loader
function loader(isLoading) {
    const loaderDiv = document.getElementById('loaderDiv');
    if (isLoading) {
        const noResultMessage = document.getElementById('no-result');
        noResultMessage.classList.add('d-none');
        loaderDiv.classList.remove('d-none');
    }
    else {
        loaderDiv.classList.add('d-none');
    }
}
//display books
const displayBook = books => {
    const bookContainer = document.getElementById('book-container');
    bookContainer.textContent = '';
    const totalSearch = document.getElementById('total-result');
    totalSearch.innerHTML = `<small>Showing (${books.length} of All)</small>`;
    // handle no result
    const noResultMessage = document.getElementById('no-result');
    if (books.length === 0) {
        noResultMessage.classList.remove('d-none');
        totalSearch.classList.add('d-none');
        loader(false);
    }

    else {
        books.forEach(book => {
            //console.log(book);  
            totalSearch.classList.remove('d-none');
            const div = document.createElement('div');
            div.classList.add('col');
            // 
            div.innerHTML = `
                <div class="card h-100">
                <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="p-3 card-img-top" alt="Book Image"></img>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${book.title}</h5>
                        <p id="author" class="card-text">Authors: ${book.author_name ? book.author_name : 'No author found'}</p>
                        <p class="card-text">Publisher: ${book.publisher ? book.publisher[0] : 'No publisher information found'}</p>              
                    </div >
                    <div><p class="card-footer bg-transparent"><small class="text-muted">First Published: ${book.first_publish_year ? book.first_publish_year : 'No publish date information found'}</small></p> </div>
                </div >
        `;
            bookContainer.appendChild(div);
            noResultMessage.classList.add('d-none');
            loader(false);
        });
    }
}