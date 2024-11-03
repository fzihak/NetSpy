// Function to fetch user IP, location, ISP details
async function fetchUserInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/'); // Get user details based on IP
        const data = await response.json();
        
        // Display IP address, country, and ISP name
        document.getElementById("ip").textContent = data.ip;
        document.getElementById("country").textContent = `${data.city}, ${data.region}, ${data.country_name}`;
        document.getElementById("isp-name").textContent = data.org;

        // Display local time based on user's timezone
        const localTime = new Date().toLocaleString("en-US", { timeZone: data.timezone });
        document.getElementById("local-time").textContent = localTime;

        // Display device information
        const deviceInfo = `${navigator.userAgent}`;
        document.getElementById("device-info").textContent = deviceInfo;
        
    } catch (error) {
        console.error("Error fetching user info:", error);
        document.getElementById("ip").textContent = "Could not retrieve data";
        document.getElementById("country").textContent = "Could not retrieve data";
        document.getElementById("isp-name").textContent = "Could not retrieve data";
        document.getElementById("local-time").textContent = "Could not retrieve data";
        document.getElementById("device-info").textContent = "Could not retrieve data";
    }
}

// Function to calculate network speed
function calculateNetworkSpeed() {
    const testImage = "https://via.placeholder.com/1000x1000.jpg"; // URL of test image
    const downloadSize = 1000 * 1000 * 1; // Size in bytes (1 MB)
    const startTime = new Date().getTime();
    
    const download = new Image();
    download.onload = function() {
        const endTime = new Date().getTime();
        const duration = (endTime - startTime) / 1000; // Time in seconds
        const bitsLoaded = downloadSize * 8; // Convert bytes to bits
        const speedMbps = (bitsLoaded / (1024 * 1024)) / duration; // Speed in Mbps
        
        document.getElementById("speed").textContent = `${speedMbps.toFixed(2)} Mbps`;
    };
    
    download.onerror = function() {
        document.getElementById("speed").textContent = "Error calculating speed.";
    };
    
    download.src = `${testImage}?cacheBuster=${startTime}`; // Avoid cached image
}

// Run all functions on page load
window.onload = function() {
    fetchUserInfo();
    calculateNetworkSpeed();
};
