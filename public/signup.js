document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {

        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullname,
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("user", fullname);

            alert("Account Created Successfully");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }
});