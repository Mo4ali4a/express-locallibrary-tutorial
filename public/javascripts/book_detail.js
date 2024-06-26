document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndPopulate();
  });
  
  function fetchDataAndPopulate() {
    fetch("/catalog/api/book/" + window.location.pathname.split("/").pop())
      .then(response => response.json())
      .then(data => {
        const bookDetail = document.getElementById('bookDetail');
  
        // Создаем элементы для книги
        const bookTitle = document.createElement('h2');
        bookTitle.textContent = data.book.title;
  
        const authorName = document.createElement('p');
        const authorLink = document.createElement('a'); // Создаем элемент ссылки
        authorLink.classList.add('author-link'); // Добавляем класс для стилизации
        authorLink.href = `http://localhost:3000/catalog/author/${data.book.author._id}`; // Устанавливаем href ссылки
        authorLink.textContent = `${data.book.author.first_name} ${data.book.author.family_name}`; // Устанавливаем текст ссылки
        authorName.appendChild(authorLink); // Добавляем ссылку к автору
  
        const summary = document.createElement('p');
        summary.textContent = `Summary: ${data.book.summary}`;
  
        const isbn = document.createElement('p');
        isbn.textContent = `ISBN: ${data.book.isbn}`;
  
        // Добавляем элементы книги в элемент с id "bookDetail"
        bookDetail.appendChild(bookTitle);
        bookDetail.appendChild(authorName);
        bookDetail.appendChild(summary);
        bookDetail.appendChild(isbn);
  
        // Создаем элемент для жанра книги
        const genre = document.createElement('p');
        genre.textContent = `Genre: ${data.book.genre.map(genre => genre.name).join(', ')}`;
        bookDetail.appendChild(genre);
  
        // Создаем элементы для экземпляров книги
        const instancesHeader = document.createElement('h3');
        instancesHeader.textContent = 'Book Instances';
        bookDetail.appendChild(instancesHeader);
  
        if (data.book_instances.length === 0) {
          const noInstancesMessage = document.createElement('p');
          noInstancesMessage.textContent = 'N/A';
          bookDetail.appendChild(noInstancesMessage);
        } else {
          data.book_instances.forEach(instance => {
            // Создаем div для каждого экземпляра книги
            const instanceDiv = document.createElement('div');
            instanceDiv.classList.add('border-with-background', 'instance');
    
            const imprint = document.createElement('p');
            imprint.textContent = `Imprint: ${instance.imprint}`;
    
            const status = document.createElement('p');
            status.textContent = `Status: ${instance.status}`;
    
            const dueBack = document.createElement('p');
            dueBack.textContent = `Due Back: ${instance.due_back ? new Date(instance.due_back).toLocaleString() : 'N/A'}`;
    
            instanceDiv.appendChild(imprint);
            instanceDiv.appendChild(status);
            instanceDiv.appendChild(dueBack);
    
            bookDetail.appendChild(instanceDiv);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }