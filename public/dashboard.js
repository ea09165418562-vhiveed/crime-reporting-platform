const reportForm = document.getElementById("reportForm");

if (reportForm) {

    reportForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const location = document.getElementById("location").value;
        const description = document.getElementById("description").value;

        const reporter = localStorage.getItem("user");

        try {

            const response = await fetch("/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    category,
                    location,
                    description,
                    reporter
                })
            });

            const data = await response.json();

            if (data.success) {

                alert("Crime Report Submitted Successfully");

                reportForm.reset();

            } else {

                alert("Submission Failed");

            }

        } catch (error) {

            console.error(error);
            alert("Server Error");

        }

    });

}