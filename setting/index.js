import { client_id, client_secret } from "../utils/config/client";

const redirectUri =
  "http://zepp-os-staging.zepp.com/app-settings/v1.0.0/index.html?appId=1017560";
let done = false;

AppSettingsPage({
  logout(props) {
    props.settingsStorage.removeItem("authToken");
    props.settingsStorage.removeItem("refreshToken");
    props.settingsStorage.removeItem("user");
    props.settingsStorage.removeItem("mail");
    props.settingsStorage.removeItem("product");
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
        this.getRefreshToken(props).then((bearerToken) => {
          this.getUserInfo(props, bearerToken);
        });
        this.getUserInfo(props);
      }
    });
  },
  getRefreshToken(props) {
    let details = {
      grant_type: "authorization_code",
      code: props.settingsStorage.getItem("authToken"),
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: redirectUri,
    };
    let formBody = [];
    for (let property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let bearerToken = "";
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

        const {
          refresh_token = "",
          error_description = "Unkown error",
          access_token = "",
        } = data;

        if (refresh_token != "") {
          props.settingsStorage.setItem("refreshToken", refresh_token);
          bearerToken = access_token;
        } else props.settingsStorage.setItem("refreshToken", error_description);
      })
      .catch((error) => {
        console.log(error);
        props.settingsStorage.setItem("refreshToken", error);
      });
    return bearerToken;
  },
  getUserInfo(props, bearerToken = "") {
    fetch("https://api.spotify.com/v1/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        const { body } = res;
        const {
          display_name = "fail",
          email = bearerToken,
          product = "",
        } = body;

        props.settingsStorage.setItem("user", display_name);
        props.settingsStorage.setItem("mail", email);
        props.settingsStorage.setItem("product", product);
      })
      .catch((error) => {
        console.log(error);
      });
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
    const loginBtn = Link(
      {
        source: `https://accounts.spotify.com/en/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private`,
      },
      [
        Button({
          label: "Login",
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
            marginTop: "40px",
          },
        }),
      ]
    );
    const userInfo = Section(
      {
        style: {
          borderStyle: "solid",
          borderColor: "#1db954",
          borderWidth: "2px",
          borderRadius: "4px",
          marginTop: "8px",
          padding: "16px",
        },
      },
      [
        TextImageRow({
          label: `User: ${
            props.settingsStorage.getItem("user")
              ? props.settingsStorage.getItem("user")
              : ""
          }`,
        }),
        TextImageRow({
          label: `Mail: ${
            props.settingsStorage.getItem("mail")
              ? props.settingsStorage.getItem("mail")
              : ""
          }`,
        }),
        TextImageRow({
          label: `Account type: ${
            props.settingsStorage.getItem("product")
              ? props.settingsStorage.getItem("product")
              : ""
          }`,
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
    const logoutBtn = Button({
      label: "Logout",
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
        marginTop: "40px",
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
              marginTop: "40px",
            },
          },
          [
            Image({
              src: "https://github.com/favicon.ico",
              style: {
                postion: "relative",
                top: "-50%",
              },
            }),
            "juan518munoz",
          ]
        ),
      ]
    );
    return View(
      {
        style: {
          position: "relative",
          height: "100%",
          padding: "20px 20px 20px 20px",
        },
      },
      [
        logo,
        userInfo,
        refreshToken,
        props.settingsStorage.getItem("refreshToken") == null ||
        props.settingsStorage.getItem("refreshToken") == ""
          ? loginBtn
          : logoutBtn,
        //logoutBtn,
        credits,
      ]
    );
  },
});
