const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {
        email: "default@example.com",
        name: "Jhon",
        last_name: "Snow",
      },
      token: localStorage.getItem("token") || null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      Register: async (email, password, name, last_name) => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: `${email}`,
              password: `${password}`,
              name: `${name}`,
              last_name: `${last_name}`,
            }),
          });
          if (response.ok) {
            return response.status;
          } else {
            return false;
          }
        } catch (err) {
          console.log(err);
        }
      },
      Login: async (email, password) => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: `${email}`,
              password: `${password}`,
            }),
          });
          let data = await response.json();
          if (response.ok) {
            setStore({
              token: data.token,
            });
            localStorage.setItem("token", data.token);
            return true;
          }
        } catch (err) {}
      },
      Logout: () => {
        setStore({
          token: null,
        });
      },
    },
  };
};

export default getState;
