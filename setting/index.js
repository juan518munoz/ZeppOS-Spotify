const client_id = "465097c0dc824b8999a6945037afb15f";
const client_secret = "ca566ed2daef45838bbdd4498851c5c9";

AppSettingsPage({
  getRefreshToken(props) {
    let details = {
      grant_type: "authorization_code",
      code: props.settingsStorage.getItem("authToken"),
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: "https://juan518munoz.github.io/ZeppOS-Spotify-Web/",
    };
    let formBody = [];
    for (let property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        const { refresh_token = "", error_description = "Unkown error" } = data;

        if (refresh_token != "")
          props.settingsStorage.setItem("refreshToken", refresh_token);
        else props.settingsStorage.setItem("refreshToken", error_description);
        console.log(props.settingsStorage.getItem("refreshToken"));
      })
      .catch((error) => {
        console.log(error);
        props.settingsStorage.setItem("refreshToken", error);
      });
  },
  clearTokens(props) {
    const result = props.settingsStorage.removeItem("authToken");
    const result2 = props.settingsStorage.removeItem("refreshToken");
    console.log(`Delete auth: ${result}\nDelete refresh: ${result2}`);
  },
  build(props) {
    const authTokenBtn = Link(
      {
        source: `https://accounts.spotify.com/en/authorize?client_id=${client_id}&response_type=code&redirect_uri=https://juan518munoz.github.io/ZeppOS-Spotify-Web/&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private`,
      },
      [
        Button({
          label: "Get auth token",
          style: {
            flex: 1,
            display: "flex",
            justfyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            lineHeight: "30px",
            borderRadius: "30px",
            background: "#1db954",
            color: "white",
            textAlign: "center",
            padding: "0 15px",
            width: "100%",
            height: "40px",
          },
        }),
      ]
    );
    const inputField = View(
      {
        style: {
          width: "100%",
          paddingBottom: "40px",
        },
      },
      [
        TextInput({
          label: "Input auth token",
          bold: true,
          placeholder: "Token",
          rows: "1",
          subStyle: {
            color: "#000000",
            fontSize: "15px",
            borderStyle: "solid",
            borderColor: "#1db954",
            borderRadius: "12px",
            height: "350px",
            overflow: "hidden",
          },
          labelStyle: {
            paddingBottom: "5px",
          },
          maxLength: 1000,
          onChange: (val) => {
            console.log(val);
            this.value = val;
          },
          settingsKey: "authToken",
        }),
      ]
    );
    const refreshToken = Section(
      {
        title: "Current refreshToken:",
        style: {
          paddingTop: "30px",
          width: "100%",
        },
        description: "If you are seeing this then the app should be working.",
      },
      [
        Button({
          style: {
            width: "100%",
            overflow: "hidden",
          },
          label: props.settingsStorage.getItem("refreshToken"),
        }),
      ]
    );
    const refreshTokenBtn = Button({
      label: "Get refreshToken",
      style: {
        flex: 1,
        display: "flex",
        justfyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        lineHeight: "30px",
        borderRadius: "30px",
        background: "#1db954",
        color: "white",
        textAlign: "center",
        padding: "0 15px",
        width: "100%",
        height: "40px",
      },
      onClick: () => {
        this.getRefreshToken(props);
      },
    });
    const authToken = Section(
      {
        title: "Current authToken:",
        style: {
          paddingTop: "30px",
          paddingBottom: "30px",
          width: "100%",
        },
        description:
          "Make sure that your input coincides with this one. authTokens expire short so be sure to open the app on the watch at least once to get a permanent refreshToken.",
      },
      [
        Button({
          style: {
            width: "100%",
            overflow: "hidden",
          },
          label: props.settingsStorage.getItem("authToken"),
        }),
      ]
    );
    const clearTokensBtn = Button({
      label: "Clear keys",
      style: {
        flex: 1,
        display: "flex",
        justfyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        lineHeight: "30px",
        borderRadius: "30px",
        background: "#1db954",
        color: "white",
        textAlign: "center",
        padding: "0 15px",
        width: "100%",
        height: "40px",
      },
      onClick: () => {
        this.clearTokens(props);
      },
    });

    return View(
      {
        style: {
          padding: "20px 20px 20px 20px",
        },
      },
      [
        inputField,
        authTokenBtn,
        refreshToken,
        refreshTokenBtn,
        authToken,
        clearTokensBtn,
      ]
    );
  },
});
