import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();

const refreshToken = ""
const client_id = "";
const client_secret = "";
let SPOTIFY_AUTH_TOKEN = "";

const http = {
  play: "PUT",
  pause: "PUT",
  next: "POST",
  previous: "POST",
  "": "GET",
  liked: "PUT",
  notLiked: "DELETE",
  shuffle: "PUT",
};

const refreshBearerToken = async () => {
  try {
    let urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("client_id", client_id);
    urlencoded.append("client_secret", client_secret);
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
    const { access_token = "" } = body; //= JSON.parse(body); // body

    SPOTIFY_AUTH_TOKEN = access_token;
  } catch (error) {
    SPOTIFY_AUTH_TOKEN = error;
  }
};

const isSongLiked = async (currID) => {
  try {
    let isLiked = false;
    const res = await fetch({
      url: `https://api.spotify.com/v1/me/tracks`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
    });

    const { body } = res;
    const { items = [] } = body; //= JSON.parse(body); // body
    items.forEach((item) => {
      const { track: { id = "" } = {} } = item;
      if (id == currID) isLiked = true;
    });

    return isLiked;
  } catch (error) {
    return false;
  }
};

const player = async (ctx, func = "", args = "") => {
  try {
    const res = await fetch({
      url: `https://api.spotify.com/v1/me/player/${func}?${args}`,
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
    else if (status == 204) {
      ctx.response({
        songName: "No device playing",
        artistNames: "start streaming in any device",
        isPlaying: false,
        isLiked: false,
        progress: 0,
        songId: "",
      });
    }

    const { body = {} } = res;
    const {
      shuffle_state = false,
      progress_ms = 0,
      item: { name = "", artists = [], duration_ms = 0, id = "" } = {},
      is_playing = false,
    } = body; //= JSON.parse(body); // body

    let artistNames = artists.map((artist) => artist.name).join(", ");
    const isLiked = await isSongLiked(id);
    const progress = (progress_ms * 100) / duration_ms / 100;
    const queue = await getQueue();
    ctx.response({
      data: {
        songName: name,
        artistNames: artistNames,
        isPlaying: is_playing,
        isLiked: isLiked,
        isShuffled: shuffle_state,
        progress: progress,
        songId: id,
        queue: queue.slice(0, 16),
      },
    });
  } catch (error) {
    ctx.response({
      data: {
        songName: "No connection",
        artistNames: "make sure a device is streaming",
      },
    });
  }
};

const tracks = async (ctx, func = "", curSongId = "") => {
  try {
    const res = await fetch({
      url: `https://api.spotify.com/v1/me/tracks?ids=${curSongId}`,
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
  } catch (error) {}
};

const getQueue = async (ctx) => {
  try {
    const res = await fetch({
      url: `https://api.spotify.com/v1/me/player/queue`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
    });
    const { status } = res;
    if (status != 200) throw "Error";

    let q = [];
    const { body = {} } = res;
    const { queue } = body; //= JSON.parse(body); // body
    queue.forEach((item) => {
      const { name = "" } = item;
      q.push(name);
    });

    return q;
  } catch (error) {
    return [];
  }
};

AppSideService({
  onInit() {
    messageBuilder.listen(() => {});

    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      if (jsonRpc.func == "player") {
        return player(ctx, jsonRpc.method, jsonRpc.args);
      } else if (jsonRpc.func == "tracks")
        return tracks(ctx, jsonRpc.method, jsonRpc.curSongId);
    });
  },

  onRun() {},

  onDestroy() {
    SPOTIFY_AUTH_TOKEN = "";
  },
});
