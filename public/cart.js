document.addEventListener('DOMContentLoaded', function() {
        const addToCartButtons = document.querySelectorAll('.btn-outline-warning');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const card = event.target.closest('.food-card');
                const title = card.querySelector('.card-title').textContent;
                const price = card.querySelector('.price').textContent;
                const imgSrc = card.querySelector('img').src;

                addItemToCart(title, price, imgSrc);
                showPopup('Your item is added to the cart!');
            });
        });

        function addItemToCart(title, price, imgSrc) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItemIndex = cartItems.findIndex(item => item.title === title);

            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity += 1;
            } else {
                cartItems.push({ title, price, imgSrc, quantity: 1 });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        function showPopup(message) {
            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.textContent = message;

            document.body.appendChild(popup);

            setTimeout(() => {
                popup.remove();
            }, 2000);
        }
    });

    const popupStyle = document.createElement('style');
    popupStyle.innerHTML = `
        .popup {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
    `;
    document.head.appendChild(popupStyle);
