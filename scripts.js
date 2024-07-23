document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    console.log(JSON.stringify(data)); // Send this data to your server or process it as needed
    
    alert('Form submitted successfully!');
});
