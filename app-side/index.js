import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();
const refreshToken = ""

let SPOTIFY_AUTH_TOKEN = "";

const http = {
  play: "PUT",
  pause: "PUT",
  next: "POST",
  previous: "POST",
  "": "GET",
};

const refreshBearerToken = async () => {
  try {
    let urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("client_id", "");
    urlencoded.append("client_secret", "");
    urlencoded.append("refresh_token", refreshToken);

    const res = await fetch({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded.toString(),
    });

    const { body = {} } = res;
    const { access_token = "" } = body; //JSON.parse(body); // body

    SPOTIFY_AUTH_TOKEN = access_token;
  } catch (error) {
    SPOTIFY_AUTH_TOKEN = error;
  }
};

const player = async (ctx, func = "", args = "") => {
  try {
    const res = await fetch({
      url: `https://api.spotify.com/v1/me/player/${func}`,
      method: http[func],
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
    });
    const { status } = res;
    if (status == 400 || status == 401) {
      await refreshBearerToken();
      return await player(ctx);
    }

    if (func != "") return await player(ctx);

    const { body = {} } = res;
    const { item: { name = "", artists = "" } = {}, is_playing = false } = body; //JSON.parse(body); // body

    let artistNames = artists.map((artist) => artist.name).join(", ");
    ctx.response({
      data: {
        songName: name,
        artistNames: artistNames,
        isPlaying: is_playing,
      },
    });
  } catch (error) {
    ctx.response({
      data: {
        result: `ERROR: ${error}`,
        songName: `ERROR: ${error}`,
        artistNames: SPOTIFY_AUTH_TOKEN,
      },
    });
  }
};

AppSideService({
  onInit() {
    messageBuilder.listen(() => {});

    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      return player(ctx, jsonRpc.method, jsonRpc.args);
    });
  },

  onRun() {},

  onDestroy() {
    SPOTIFY_AUTH_TOKEN = "";
  },
});
