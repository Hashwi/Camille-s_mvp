const authProvider = {
    isAuthenticated: false,
    error: undefined,
    user: undefined,
    async signin(input, callback) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      authProvider.error = undefined
      authProvider.user = undefined;

            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            };
            try {
              const response = await fetch("api/users/login", options);
              if (!response.ok) throw new Error(response.statusText);

                const data = await response.json()
                localStorage.setItem("user_id", JSON.stringify(data.user.id))
                console.log(data)
                localStorage.setItem("token", data.user.token)
                authProvider.isAuthenticated = true;
                authProvider.user = data;
               callback.setUser(data)
               callback.successCallback()
            } catch (err) {
              authProvider.error = err.message ? err.message  : JSON.stringify(err)
              callback.setError(authProvider.error )
            }
    },
    // signout(callback) {
    //     authProvider.isAuthenticated = false;
    //     localStorage.removeItem('user')
    // },
  };
  
  export { authProvider };
  