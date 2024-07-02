document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('searchInput').value.toLowerCase();
    const foodCards = document.querySelectorAll('.food-card');
    
    foodCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

