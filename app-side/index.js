import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();

const http = {
  play: "PUT",
  pause: "PUT",
  next: "POST",
};

const SPOTIFY_AUTH_TOKEN = "foo";

const player = async (ctx, func = "play", args = "") => {
  try {
    await fetch({
      url: `https://api.spotify.com/v1/me/player/${func}`,
      method: http[func],
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
    });

    const res = await fetch({
      url: `https://api.spotify.com/v1/me/player`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
    });

    const { body } = res;
    const bodyObj = JSON.parse(body.replace(/\\/g, "").replace(/\n/g, "")); // this is neded for the simulator
    const { item = {} } = bodyObj;
    const { name = "", artists = [] } = item;
    let artistNames = artists.map((artist) => artist.name).join(", ");

    ctx.response({
      data: {
        songName: name,
        artistNames: artistNames,
      },
    });
  } catch (error) {
    ctx.response({
      data: { result: `ERROR: ${error}` },
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

  onDestroy() {},
});
