

window.onload = async function () {

    document.getElementById("submit-btn")
        .addEventListener("click", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email-input").value;
            const password = document.getElementById("password-input").value;

            const res = await fetch("/api/users/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
        });

}