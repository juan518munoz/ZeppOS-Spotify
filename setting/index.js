import { client_id, client_secret } from "../utils/config/client";

const redirectUri =
  "http://zepp-os-staging.zepp.com/app-settings/v1.0.0/index.html?appId=1017560";
const source = `https://accounts.spotify.com/en/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private`;
const manualRedirectUri = "https://juan518munoz.github.io/ZeppOS-Spotify-Web";
const manualSource = `https://accounts.spotify.com/en/authorize?client_id=${client_id}&response_type=code&redirect_uri=https://juan518munoz.github.io/ZeppOS-Spotify-Web&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private`;

let done = false;

const BtnStyle = {
  textTransform: "",
  letterSpacing: "2px",
  fontWeight: "700",
  textAlign: "center",
  lineHeight: "1",
  borderRadius: "500px",
  background: "#1db954",
  color: "white",
  height: "40px",
  minWidth: "160px",
  borderWidth: "0",
  marginTop: "40px",
  padding: "11px 32px 9px",
  verticalAlign: "middle",
};

AppSettingsPage({
  logout(props) {
    props.settingsStorage.removeItem("authToken");
    props.settingsStorage.removeItem("refreshToken");
    props.settingsStorage.removeItem("user");
    props.settingsStorage.removeItem("mail");
    props.settingsStorage.removeItem("product");
    props.settingsStorage.removeItem("iosLogin");
  },
  login(props) {
    if (done) return;
    fetch("").then((res) => {
      const { url } = res;

      let start = url.indexOf("code=");
      let code = "";
      if (start != -1) {
        done = true;
        code = url.substring(start + 5);
        props.settingsStorage.setItem("authToken", code);

        this.getRefreshToken(props).then(this.getUserInfo(props));
      }
    });
  },
  getRefreshToken(props, token = "notoken", uri = redirectUri) {
    return new Promise((resolve) => {
      let details = {
        grant_type: "authorization_code",
        code: props.settingsStorage.getItem("authToken") || token,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: uri,
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
          const {
            refresh_token = "",
            error_description = "Unkown error",
            access_token = "",
          } = data;

          if (refresh_token != "") {
            props.settingsStorage.setItem("refreshToken", refresh_token);
            props.settingsStorage.setItem("accessToken", access_token);
          } else
            props.settingsStorage.setItem("refreshToken", error_description);
        });
      setTimeout(() => {
        console.log("func1 finished");
        resolve();
      }, 3000);
    });
  },
  getUserInfo(props) {
    const access_token = props.settingsStorage.getItem("accessToken");
    if (
      access_token === undefined ||
      access_token === null ||
      access_token.lenght === 0
    ) {
      setTimeout(() => {
        this.getUserInfo(props);
      }, "1000");
    }
    fetch("https://api.spotify.com/v1/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        const { display_name = "fail", email = "", product = "" } = res;

        props.settingsStorage.setItem("user", display_name);
        props.settingsStorage.setItem("mail", email);
        props.settingsStorage.setItem("product", product);
      })
      .catch((error) => {
        props.settingsStorage.setItem("user", error);
      });
    props.settingsStorage.removeItem("accessToken");
  },
  build(props) {
    this.login(props);
    const logo = View(
      {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "50px",
        },
      },
      [
        Image({
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/559px-Spotify_logo_with_text.svg.png",
          alt: "spotifyLogo",
          width: "50%",
        }),
      ]
    );
    const userInfo = View(
      {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
        },
      },
      [
        View(
          {
            style: {
              marginBottom: "12px",
            },
          },
          [
            Text({ bold: true }, "User: "),
            Text(
              {},
              `${
                props.settingsStorage.getItem("user")
                  ? props.settingsStorage.getItem("user")
                  : ""
              }`
            ),
          ]
        ),
        View(
          {
            style: {
              marginBottom: "12px",
            },
          },
          [
            Text({ bold: true }, "Mail: "),
            Text(
              {},
              `${
                props.settingsStorage.getItem("mail")
                  ? props.settingsStorage.getItem("mail")
                  : ""
              }`
            ),
          ]
        ),
        View(
          {
            style: {
              marginBottom: "12px",
            },
          },
          [
            Text({ bold: true }, "Product: "),
            Text(
              {},
              `${
                props.settingsStorage.getItem("product")
                  ? props.settingsStorage.getItem("product")
                  : ""
              }`
            ),
          ]
        ),
      ]
    );
    const loginBtn = Link(
      {
        source: source,
      },
      [
        Button({
          label: "Log in",
          style: {
            ...BtnStyle,
          },
        }),
      ]
    );
    const logoutBtn = Button({
      label: "Log out",
      style: {
        ...BtnStyle,
      },
      onClick: () => {
        this.logout(props);
      },
    });
    const credits = Link(
      {
        source: "https://github.com/juan518munoz/ZeppOS-Spotify",
      },
      [
        Text(
          {
            style: {
              display: "flex",
              color: "black",
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "bottom",
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translate(-50%, -50%)",
              margin: "0 auto",
            },
          },
          [
            Image({
              src: "https://github.com/favicon.ico",
              style: {
                marginRight: "8px",
              },
            }),
            "juan518munoz",
          ]
        ),
      ]
    );
    const iosBtn = Button({
      label: "MANUAL LOG IN",
      style: {
        ...BtnStyle,
      },
      onClick: () => {
        props.settingsStorage.getItem("iosLogin") == "visible"
          ? props.settingsStorage.setItem("iosLogin", "hidden")
          : props.settingsStorage.setItem("iosLogin", "visible");
      },
    });
    const manualLogInModal = View(
      {
        style: {
          visibility: props.settingsStorage.getItem("iosLogin") || "hidden",
          marginTop: "40px",
        },
      },
      [
        Link({ source: manualSource }, "Click here to log in"),
        Text(
          {},
          ", then on the resulting URL then paste the obtained token bellow:"
        ),
        TextInput({
          settingsKey: "authToken",
          subStyle: {
            marginTop: "4px",
            color: "#000000",
            fontSize: "15px",
            borderStyle: "solid",
            borderColor: "#1db954",
            borderRadius: "12px",
            height: "40px",
            overflow: "hidden",
          },
          onChange: (value) => {
            this.getRefreshToken(props, value, manualRedirectUri);
            this.getUserInfo(props);
          },
        }),
      ]
    );

    return View(
      {
        style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          padding: "40px",
          textTransform: "",
          fontFamily: "Circular,Helvetica,Arial,sans-serif",
          fontSize: "16px",
          fontWeight: "400",
        },
      },
      [
        logo,
        props.settingsStorage.getItem("refreshToken") == null ||
        props.settingsStorage.getItem("refreshToken") == ""
          ? [loginBtn, iosBtn, manualLogInModal]
          : [userInfo, logoutBtn],
        credits,
      ]
    );
  },
});
