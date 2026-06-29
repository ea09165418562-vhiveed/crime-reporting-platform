document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("user", data.fullname);

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Email or Password");

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }
});