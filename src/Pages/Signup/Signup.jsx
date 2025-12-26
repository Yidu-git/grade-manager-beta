import "./Signup.css";

export const SignupPage = () => {
  const AttemptSignUp = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
          // Add auth header if needed:
          // 'Authorization': 'Bearer YOUR_TOKEN'
        },
        body: JSON.stringify(userData),
      });
      // console.log("HI");

      if (!response.ok) {
        // Try to read error body if available
        let errorBody;
        try {
          errorBody = await response.json();
        } catch {
          errorBody = await response.text();
        }
        throw new Error(
          `Request failed with status ${response.status}: ${JSON.stringify(
            errorBody
          )}`
        );
      }

      const createdUser = await response.json();
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const submit = async () => {
    console.log("SignupAttempted");

    const first_name = document.getElementById("First").value;
    const last_name = document.getElementById("Last").value;
    const display_name = document.getElementById("Displayname").value;
    const user_name = "@" + document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    const repeat = document.getElementById("Repeat").value;
    const email = document.getElementById("Email").value;

    // console.log("frst", first_name);

    if (password == repeat) {
      const data = {
        displayname: display_name,
        username: user_name,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
      };
      try {
        const CreatedUser = await AttemptSignUp(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div id="form">
        <div>
          <input type="text" id="First" placeholder="First name" />
          <input type="text" id="Last" placeholder="Last name" />
        </div>
        <input type="text" id="Displayname" placeholder="Displayname" />
        <input type="text" id="Username" placeholder="Username" />
        <input type="text" id="Email" placeholder="Email" />
        <input type="text" id="Password" placeholder="Password" />
        <input type="text" id="Repeat" placeholder="Repeat password" />
        <button onClick={submit}>Sign up</button>
        <a href="/login">Login</a>
      </div>
    </>
  );
};
