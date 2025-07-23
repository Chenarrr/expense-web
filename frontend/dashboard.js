// Get references to the button and the transactions list
const addButton = document.getElementById('add-expense'); // Target the "Add Expense" button
const transactionsList = document.getElementById('transactions-list'); // This is a div in your HTML

let transactions = [];

// Initialize transactions from localStorage when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
        renderTransactions();
    } else {
        // If no transactions are stored, ensure the "No transactions" message is shown
        transactionsList.innerHTML = 'No transactions recorded yet.'; // Display directly in the div
    }
});

// Attach a click event listener to the "Add Expense" button
addButton.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default button behavior (though not strictly necessary for a button, it's good practice if it were part of a form later)

    // Retrieve input values
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const noteInput = document.getElementById('note');

    const amount = amountInput.value;
    const date = dateInput.value;
    const note = noteInput.value;

    // Input validation: Ensure amount is a valid positive number
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        alert('Bro, the amount gotta be a valid positive number. No cap!');
        return;
    }
    // Input validation: Ensure date is not empty
    if (!date) {
        alert('Date can\'t be empty, for real. Pick one!');
        return;
    }
    // Input validation: Ensure note is not empty
    if (!note.trim()) {
        alert('A note is low-key crucial here. What was this for, bestie?');
        return;
    }

    const transaction = {
        amount: parseFloat(amount).toFixed(2), // Format to two decimal places
        date,
        note
    };

    transactions.push(transaction);
    saveTransactions(); // Persist to local storage
    renderTransactions(); // Update the displayed list

    // Clear the input fields after adding
    amountInput.value = '';
    dateInput.value = '';
    noteInput.value = '';
});

// Function to render transactions in the DOM
function renderTransactions() {
    transactionsList.innerHTML = ''; // Clear existing content

    if (transactions.length === 0) {
        transactionsList.innerHTML = 'No transactions recorded yet.';
    } else {
        // Create a fragment to optimize DOM manipulation
        const fragment = document.createDocumentFragment();
        // Display transactions in reverse order (newest first)
        transactions.slice().reverse().forEach(tx => {
            const transactionItem = document.createElement('div'); // Using a div as per your current HTML structure
            transactionItem.textContent = `${tx.date}: $${tx.amount} - ${tx.note}`;
            fragment.appendChild(transactionItem);
        });
        transactionsList.appendChild(fragment);
    }
}

// Function to save transactions to local storage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}