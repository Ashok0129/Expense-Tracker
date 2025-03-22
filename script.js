// Load the expenses and available cash from localStorage, or initialize them
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let initialAvailableCash = parseFloat(localStorage.getItem('availableCash')) || 0;
let availableCash = initialAvailableCash; // The available cash will be updated based on expenses
let totalAmount = 0;

// Set the available cash in the input field
document.getElementById('available-cash').value = initialAvailableCash;

// Function to update the expense history and the remaining cash
function updateExpenseHistory() {
    const expenseHistoryDiv = document.getElementById('expense-history');
    expenseHistoryDiv.innerHTML = '';

    expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <span>${expense.name} - $${expense.amount.toFixed(2)}</span>
            <span class="date">${expense.date}</span>
        `;
        expenseHistoryDiv.appendChild(expenseItem);
    });

    // Calculate the total amount of expenses
    totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

    // Calculate the remaining cash by subtracting the total expense from initial available cash
    let remainingCash = availableCash; // Use the current availableCash instead of initialAvailableCash
    document.getElementById('remaining-cash').textContent = remainingCash.toFixed(2);

    // Save the expenses and available cash to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('availableCash', availableCash); // Save the availableCash
}

// Function to add an expense
function addExpense() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert('Please enter valid expense details');
        return;
    }

    // Check if there is enough available cash
    if (availableCash < expenseAmount) {
        alert('Not enough available cash!');
        return;
    }

    const currentDate = new Date();
    const expense = {
        name: expenseName,
        amount: expenseAmount,
        date: currentDate.toLocaleString() // Get the current date and time
    };

    // Add the expense to the expenses array
    expenses.push(expense);

    // Deduct the expense amount from available cash
    availableCash -= expenseAmount;

    // Clear input fields after adding
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';

    // Update the display
    updateExpenseHistory();
}

// Function to reset the expenses
function resetExpenses() {
    const confirmation = confirm('Are you sure you want to reset all expenses?');
    if (confirmation) {
        expenses = [];
        availableCash = initialAvailableCash; // Reset available cash to the initial value

        // Update the available cash field and save to localStorage
        document.getElementById('available-cash').value = initialAvailableCash;
        localStorage.setItem('availableCash', initialAvailableCash); // Reset the availableCash in localStorage

        // Update the display
        updateExpenseHistory();
}

// Load the expense history and available cash when the page loads
updateExpenseHistory();

// Event listener for available cash change
document.getElementById('available-cash').addEventListener('input', function () {
    initialAvailableCash = parseFloat(this.value);
    availableCash = initialAvailableCash; // Reset available cash to the new entered value
    localStorage.setItem('availableCash', availableCash); // Save availableCash in localStorage
    updateExpenseHistory();
});
}
