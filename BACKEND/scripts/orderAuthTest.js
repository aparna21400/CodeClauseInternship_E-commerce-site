import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWMxZTVkYzczZmQyMzdjZDE4ZDcyOCIsImlhdCI6MTc2NzY0NDc2NX0.Oz7Ewsgp-8wkn7R636wnZhojVm7PDGnIX29ZLW0ILIw"; // 👈 important

const run = async () => {
    try {
        const res = await axios.post(
            "http://localhost:5000/api/orders",
            {
                shippingAddress: {
                    fullName: "Aparna",
                    address: "Test Street",
                    city: "Indore",
                    state: "Madhya Pradesh",
                    zipCode: "452001",
                    country: "India",
                    phone: "9999999999"
                },
                paymentMethod: "cod"

            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );

        console.log("✅ Order created successfully");
        console.log(res.data);
    } catch (err) {
        console.error("❌ Order failed");
        console.error(err.response?.status, err.response?.data);
    }
};

run();
