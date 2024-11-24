function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === "block") {
        section.style.display = "none";
    } else {
        section.style.display = "block";
    }
}
// Initialize an empty bucket
const bucket = [];

// Function to add items to the bucket
function addToBucket(itemName, itemPrice) {
    // Add item to the bucket array
    bucket.push({ name: itemName, price: itemPrice, quantity: 1 });

    // Update the UI (e.g., show total items in the bucket)
    updateBucketUI();
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
    const bucketTotal = document.getElementById('bucket-total');
    const bucketItems = document.getElementById('bucket-items');

    // Calculate total items and total price
    const totalItems = bucket.length;
    const totalPrice = bucket.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update bucket summary
    bucketCount.innerText = `Items in Bucket: ${totalItems}`;
    bucketTotal.innerText = `Total: €${totalPrice.toFixed(2)}`;

    // Update bucket details dropdown
    bucketItems.innerHTML = '';
    bucket.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} - €${item.price} x ${item.quantity}</span>
            <button class="bucket-action-btn" onclick="removeFromBucket(${index})">Remove</button>
            <button class="bucket-action-btn" onclick="duplicateItem(${index})">Duplicate</button>
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