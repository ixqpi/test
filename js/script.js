document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value

    if (username === "ixqpi" && password === "ssa12") {
        alert("Successfully logged in!");
        // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول بنجاح
        window.location.href = "main.html"; 
    
    }else{
        alert("Incorrect username or password.");}
  
    

});
// Function to show Home section
function showHome() {
    alert ("Home icon clicked");
    document.getElementById("main-content").innerHTML = `
        <div class="post">
            <img src="images/sample-post.png" alt="Post Image">
            <p>Home: Sample post content here.</p>
        </div>`;
}

// Function to show Search section
function showSearch() {
    document.getElementById("main-content").innerHTML = `
        <div class="search">
            <h2>Search Section</h2>
            <p>Here you can search for content.</p>
        </div>`;
}

// Function to show Add Post section
function showAddPost() {
    document.getElementById("main-content").innerHTML = `
        <div class="add-post">
            <h2>Add Post</h2>
            <p>This is where you can add a new post.</p>
        </div>`;
}

// Function to show reels section
function reels() {
    document.getElementById("main-content").innerHTML = `
        <div class="reels">
            <h2>reels</h2>
            <p>You have no new reels.</p>
        </div>`;
}

// Function to show Profile section
function showProfile() {
    document.getElementById("main-content").innerHTML = `
        <div class="profile">
            <h2>Your Profile</h2>
            <p>This is your profile page.</p>
        </div>`;
}