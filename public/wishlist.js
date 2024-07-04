document.addEventListener('DOMContentLoaded', function () {
    const wishlistIcons = document.querySelectorAll('.fa-heart');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const card = this.closest('.food-card');
            const item = {
                title: card.querySelector('.card-title').textContent,
                price: card.querySelector('.price').textContent,
                image: card.querySelector('img').src
            };
            addToWishlist(item);
            alert('Item added to wishlist');
        });
    });

    // Load wishlist items on wishlist page
    if (document.getElementById('wishlist-items')) {
        loadWishlist();
    }
});

function addToWishlist(item) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function removeFromWishlist(title) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.title !== title);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
}

function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist-items');
    wishlistContainer.innerHTML = ''; // Clear previous items

    if (wishlist.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-wishlist-message');
        emptyMessage.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <h5 class="card-title">Your Wishlist is Empty</h5>
                    <p class="card-text">You have no items in your wishlist. Start adding some!</p>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(emptyMessage);
    } else {
        wishlist.forEach(item => {
            const wishlistItem = document.createElement('div');
            wishlistItem.classList.add('wishlist-item');
            wishlistItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h5>${item.title}</h5>
                    <p class="price">${item.price}</p>
                    <button class="btn btn-danger remove-btn">Remove</button>
                </div>
            `;
            wishlistContainer.appendChild(wishlistItem);
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const itemTitle = this.closest('.wishlist-item').querySelector('h5').textContent;
                removeFromWishlist(itemTitle);
            });
        });
    }
}
