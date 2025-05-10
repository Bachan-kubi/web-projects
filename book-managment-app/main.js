// UUID generator for artifact_id
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Book class with encapsulation
class Book {
    #id;
    #stock;

    constructor(title, authorId, isbn, price, stock) {
        this.#id = generateUUID();
        this.title = title;
        this.authorId = authorId;
        this.isbn = isbn;
        this.price = price;
        this.#stock = stock;
    }

    getId() {
        return this.#id;
    }

    getStock() {
        return this.#stock;
    }

    setStock(value) {
        if (value >= 0) {
            this.#stock = value;
        } else {
            throw new Error("Stock cannot be negative");
        }
    }

    // Polymorphic method
    displayBookInfo() {
        return `${this.title} (ISBN: ${this.isbn}) - $${this.price}`;
    }
}

// DigitalBook subclass demonstrating inheritance
class DigitalBook extends Book {
    constructor(title, authorId, isbn, price, stock, fileSize) {
        super(title, authorId, isbn, price, stock);
        this.fileSize = fileSize;
    }

    // Override polymorphic method
    displayBookInfo() {
        return `${super.displayBookInfo()} [Digital, ${this.fileSize}MB]`;
    }
}

// Author class
class Author {
    #id;

    constructor(name, biography, nationality) {
        this.#id = generateUUID();
        this.name = name;
        this.biography = biography || "No biography available";
        this.nationality = nationality || "Unknown";
    }

    getId() {
        return this.#id;
    }
}

// InventoryManager class (Abstraction)
class InventoryManager {
    #books = [];
    #authors = [];

    addBook(book) {
        this.#books.push(book);
        this.notify("Book added successfully");
    }

    addAuthor(author) {
        this.#authors.push(author);
        this.notify("Author added successfully");
        this.updateAuthorSelect();
    }

    updateBook(id, updatedBook) {
        const index = this.#books.findIndex(book => book.getId() === id);
        if (index !== -1) {
            this.#books[index] = updatedBook;
            this.notify("Book updated successfully");
        }
    }

    deleteBook(id) {
        this.#books = this.#books.filter(book => book.getId() !== id);
        this.notify("Book deleted successfully");
    }

    updateStock(id, quantity) {
        const book = this.#books.find(book => book.getId() === id);
        if (book) {
            book.setStock(book.getStock() + quantity);
            this.notify(`Stock updated for ${book.title}`);
        }
    }

    searchBooks(query) {
        query = query.toLowerCase();
        return this.#books.filter(book => {
            const author = this.#authors.find(a => a.getId() === book.authorId);
            return book.title.toLowerCase().includes(query) ||
                   (author && author.name.toLowerCase().includes(query));
        });
    }

    getBooksByAuthor(authorId) {
        return this.#books.filter(book => book.authorId === authorId);
    }

    getAllBooks() {
        return [...this.#books];
    }

    getAllAuthors() {
        return [...this.#authors];
    }

    notify(message) {
        const feedback = document.getElementById("feedback");
        feedback.textContent = message;
        feedback.className = "alert alert-success feedback-message";
        feedback.style.display = "block";
        setTimeout(() => feedback.style.display = "none", 3000);
    }

    updateAuthorSelect() {
        const select = document.getElementById("authorId");
        select.innerHTML = '<option value="">Select Author</option>';
        this.#authors.forEach(author => {
            const option = document.createElement("option");
            option.value = author.getId();
            option.textContent = author.name;
            select.appendChild(option);
        });
    }
}

// UI Manager (Abstraction for UI operations)
class UIManager {
    constructor(inventory) {
        this.inventory = inventory;
        this.initializeEventListeners();
        this.renderBooks();
        this.inventory.updateAuthorSelect();
    }

    initializeEventListeners() {
        // Book Form Submission
        document.getElementById("bookForm").addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleBookSubmit();
        });

        // Author Form Submission
        document.getElementById("authorForm").addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleAuthorSubmit();
        });

        // Search
        document.getElementById("search").addEventListener("input", (e) => {
            this.renderBooks(e.target.value);
        });

        // Cancel Edit
        document.getElementById("cancelEdit").addEventListener("click", () => {
            this.resetBookForm();
        });
    }

    handleBookSubmit() {
        const id = document.getElementById("bookId").value;
        const title = document.getElementById("title").value;
        const authorId = document.getElementById("authorId").value;
        const isbn = document.getElementById("isbn").value;
        const price = parseFloat(document.getElementById("price").value);
        const stock = parseInt(document.getElementById("stock").value);

        try {
            const book = new Book(title, authorId, isbn, price, stock);
            if (id) {
                this.inventory.updateBook(id, book);
            } else {
                this.inventory.addBook(book);
            }
            this.resetBookForm();
            this.renderBooks();
        } catch (error) {
            this.inventory.notify(`Error: ${error.message}`);
        }
    }

    handleAuthorSubmit() {
        const name = document.getElementById("authorName").value;
        const biography = document.getElementById("biography").value;
        const nationality = document.getElementById("nationality").value;

        const author = new Author(name, biography, nationality);
        this.inventory.addAuthor(author);
        document.getElementById("authorForm").reset();
    }

    renderBooks(searchQuery = "") {
        const tbody = document.getElementById("bookTable");
        tbody.innerHTML = "";
        const books = searchQuery ? this.inventory.searchBooks(searchQuery) : this.inventory.getAllBooks();

        books.forEach(book => {
            const author = this.inventory.getAllAuthors().find(a => a.getId() === book.authorId);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${author ? author.name : "Unknown"}</td>
                <td>${book.isbn}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>${book.getStock()}</td>
                <td>${book.getStock() > 0 ? "In Stock" : "Out of Stock"}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${book.getId()}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${book.getId()}">Delete</button>
                    <button class="btn btn-sm btn-success stock-btn" data-id="${book.getId()}">Add Stock</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners for buttons
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => this.editBook(btn.dataset.id));
        });
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => this.inventory.deleteBook(btn.dataset.id) && this.renderBooks());
        });
        document.querySelectorAll(".stock-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const quantity = prompt("Enter stock to add:");
                if (quantity && !isNaN(quantity)) {
                    this.inventory.updateStock(btn.dataset.id, parseInt(quantity));
                    this.renderBooks();
                }
            });
        });
    }

    editBook(id) {
        const book = this.inventory.getAllBooks().find(b => b.getId() === id);
        if (book) {
            document.getElementById("bookId").value = book.getId();
            document.getElementById("title").value = book.title;
            document.getElementById("authorId").value = book.authorId;
            document.getElementById("isbn").value = book.isbn;
            document.getElementById("price").value = book.price;
            document.getElementById("stock").value = book.getStock();
        }
    }

    resetBookForm() {
        document.getElementById("bookForm").reset();
        document.getElementById("bookId").value = "";
    }
}

// Initialize the application
const inventory = new InventoryManager();
const ui = new UIManager(inventory);