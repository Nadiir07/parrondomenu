function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.section-content');
    const targetSection = document.getElementById(sectionId);
    const body = document.body;
    let anyActive = false;

    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.classList.toggle('active');
            if (section.classList.contains('active')) {
                anyActive = true;
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            section.classList.remove('active');
        }
    });

    if (anyActive) {
        body.classList.add('dimmed');
    } else {
        body.classList.remove('dimmed');
    }
}


// Initialize an empty bucket
const bucket = [];

// Function to add items to the bucket
function addToBucket(itemName, itemPrice) {
    const bucketCircle = document.getElementById('bucket-circle');
    const bucketCount = document.getElementById('bucket-count');

    // Add item to the bucket array
    bucket.push({ name: itemName, price: itemPrice, quantity: 1 });

    // Trigger item animation
    const tempItem = document.createElement('div');
    tempItem.textContent = itemName;
    tempItem.style.position = 'absolute';
    tempItem.style.top = '50%';
    tempItem.style.left = '50%';
    tempItem.style.transform = 'translate(-50%, -50%)';
    tempItem.style.background = '#f04';
    tempItem.style.color = 'white';
    tempItem.style.padding = '5px 10px';
    tempItem.style.borderRadius = '5px';
    tempItem.style.zIndex = '1000';
    document.body.appendChild(tempItem);

    // Animate the item to the bucket
    const rect = bucketCircle.getBoundingClientRect();
    tempItem.style.transition = 'all 0.5s ease-in-out';
    tempItem.style.top = `${rect.top + window.scrollY}px`;
    tempItem.style.left = `${rect.left + window.scrollX}px`;
    tempItem.style.opacity = '0';

    setTimeout(() => {
        tempItem.remove();
        updateBucketUI();
    }, 500);
}

// Function to remove an item from the bucket
function removeFromBucket(index) {
    bucket.splice(index, 1); // Remove item at the specified index
    updateBucketUI();
}

// Function to duplicate an item in the bucket
function duplicateItem(index) {
    const itemToDuplicate = bucket[index];
    bucket.push({ ...itemToDuplicate }); // Add a copy of the item
    updateBucketUI();
}

// Function to update the bucket UI
function updateBucketUI() {
    const bucketCount = document.getElementById('bucket-count');
    const bucketItems = document.getElementById('bucket-items');
    const bucketTotal = document.getElementById('bucket-total');

    // Update bucket count and total price
    const totalItems = bucket.length;
    const totalPrice = bucket.reduce((sum, item) => sum + item.price * item.quantity, 0);

    bucketCount.textContent = totalItems;
    bucketTotal.textContent = `Total: €${totalPrice.toFixed(2)}`;

    // Update bucket items list
    bucketItems.innerHTML = '';
    bucket.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} - €${item.price} x ${item.quantity}</span>
            <button onclick="removeFromBucket(${index})">Remove</button>
            <button onclick="duplicateItem(${index})">Duplicate</button>
        `;
        bucketItems.appendChild(listItem);
    });
}


// Function to toggle the dropdown details
function toggleBucketDetails() {
    const bucketDetails = document.getElementById('bucket-details');
    if (bucketDetails.classList.contains('hidden')) {
        bucketDetails.classList.remove('hidden');
    } else {
        bucketDetails.classList.add('hidden');
    }
}

function filterMenu() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const menuSections = document.querySelectorAll('.menu-section');

    menuSections.forEach((section) => {
        const sectionTitle = section.querySelector('.section-title');
        const items = section.querySelectorAll('.menu-item');
        let sectionHasMatch = false;

        items.forEach((item) => {
            const itemText = item.querySelector('h3').textContent.toLowerCase();
            if (itemText.includes(searchInput)) {
                item.style.display = 'flex'; // Show matching item
                sectionHasMatch = true;
            } else {
                item.style.display = 'none'; // Hide non-matching item
            }
        });

        // Show or hide the section based on matches
        if (sectionHasMatch) {
            section.style.display = 'block'; // Show section
            section.querySelector('.section-content').classList.add('active'); // Expand section
        } else {
            section.style.display = 'none'; // Hide section
            section.querySelector('.section-content').classList.remove('active'); // Collapse section
        }
    });
}


function toggleBucketWindow() {
    const bucketWindow = document.getElementById('bucket-window');
    bucketWindow.classList.toggle('active');
}

