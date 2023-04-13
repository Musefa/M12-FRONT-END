// UserController.js
import Cookies from "js-cookie";

const usersURL = "http://localhost:5000/users";

export async function getUsers() {
    const token = Cookies.get("token");
    const response = await fetch(usersURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.docs;
    } else {
        let error;
        try {
            error = await response.json();
        } catch (e) {
            error = { message: response.statusText || "Error fetching users" };
        }
        throw new Error(error.message);
    }
}
