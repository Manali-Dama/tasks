export async function Get(req) {
    try {
      // Parse request body from frontend
      const { email, password } = await req.json();
  
      // Include mac_address in the request body
      const requestBody = {
        email,
        password,
        // mac_address: "646EE0E68240", // ✅ Add mac_address here
      };
  
      const apiUrl = "https://i-stage.mkwms.dev/login"; // ✅ No mac_address in URL
  
      // Send request to the backend
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      // Parse response from backend
      const data = await response.json();
  
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  