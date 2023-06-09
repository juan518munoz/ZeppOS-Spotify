import { client_id, client_secret } from "../utils/config/client";
import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();
let SPOTIFY_AUTH_TOKEN = "";

const http = {
  "": "GET",
  play: "PUT",
  pause: "PUT",
  next: "POST",
  previous: "POST",
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
    urlencoded.append(
      "refresh_token",
      settings.settingsStorage.getItem("refreshToken")
    );

    const res = await fetch({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded.toString(),
    });
    const { status } = res;
    if (status == 400) {
      return;
    }

    const { body = {} } = res;
    const { access_token = "" } = body; //JSON.parse(body); // body

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
    const { items = [] } = body; //JSON.parse(body); // body
    items.forEach((item) => {
      const { track: { id = "" } = {} } = item;
      if (id == currID) isLiked = true;
    });

    return isLiked;
  } catch (error) {
    return false;
  }
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
    const { queue } = body; //JSON.parse(body); // body
    queue.forEach((item) => {
      const { name = "", uri = "" } = item;
      q.push({name, uri});
    });

    return q;
  } catch (error) {
    return [];
  }
};

const getAllPlaylists = async (ctx) => {
  try {
    const res = await fetch({
      url: `https://api.spotify.com/v1/me/playlists?limit=10`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
    });
    const { status } = res;
    if (status >= 400) return;

    const { body = {} } = res;
    const { items = [] } = body; //JSON.parse(body); // body

    let playLists = [];
    items.forEach((item) => {
      const { name = "", id = "" } = item;
      playLists.push({ name, id });
    });
    ctx.response({
      data: {
        playLists: playLists,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const startPlaylist = async (contextUri = "", offset = null) => {
  const body = {
    context_uri: contextUri,
    offset: offset,
  };
  try {
    await fetch({
      url: `https://api.spotify.com/v1/me/player/play`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
};

const playlist = async (ctx, playlistId = "", func = "") => {
  try {
    const res = await fetch({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/${func}`,
      method: http[func],
      headers: {
        Authorization: `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
    });
    const { status } = res;
    if (status >= 400) return;

    const { body = {} } = res;
    const { tracks: { items = [] } = {} } = body; //JSON.parse(body); // body

    let songList = [];
    items.forEach((item) => {
      const { track: { name = "", artists = [] } = {} } = item;
      let artistNames = artists.map((artist) => artist.name).join(", ");

      songList.push({ name, artistNames });
    });
    ctx.response({
      data: {
        songList: songList.slice(0, 20),
      },
    });
  } catch (error) {
    console.log(error);
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
      ctx.response({
        data: {
          songName: name,
          artistNames: artistNames,
          isPlaying: false,
          isLiked: false,
          isShuffled: false,
          progress: 0,
          songId: "id",
          queue: [],
          context: null,
        },
      });
      return;
    }
    if (func != "") return;
    else if (status == 204) {
      ctx.response({
        songName: "No device playing",
        artistNames: "start streaming in any device",
        isPlaying: false,
        isLiked: false,
        progress: 0,
        songId: "",
        context: null,
      });
    }

    const { body = {} } = res;
    const {
      shuffle_state = false,
      progress_ms = 0,
      item: { name = "", artists = [], duration_ms = 0, id = "" } = {},
      is_playing = false,
      context = null,
    } = body; //JSON.parse(body); // body

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
        context: context.uri,
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

AppSideService({
  onInit() {
    messageBuilder.listen(() => {});

    messageBuilder.on("request", (ctx) => {
      if (
        (settings.settingsStorage.getItem("refreshToken") == null ||
          settings.settingsStorage.getItem("refreshToken") == "") &&
        SPOTIFY_AUTH_TOKEN == ""
      ) {
        ctx.response({
          data: {
            songName: "refresh token not set",
            artistNames: "set refresh token on the Zepp app",
            isPlaying: false,
            isLiked: false,
            isShuffled: false,
            progress: 0,
            songId: "id",
            queue: [],
            context: null,
          },
        });
        return;
      }

      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      if (jsonRpc.func == "player") {
        return player(ctx, jsonRpc.method, jsonRpc.args);
      } else if (jsonRpc.func == "tracks") {
        return tracks(ctx, jsonRpc.method, jsonRpc.curSongId);
      } else if (jsonRpc.func == "getAllPlaylists") {
        return getAllPlaylists(ctx);
      } else if (jsonRpc.func == "playlistInfo") {
        return playlist(ctx, jsonRpc.playlistId);
      } else if (jsonRpc.func == "startPlaylist") {
        return startPlaylist(jsonRpc.playlistId, jsonRpc.offset);
      }
    });
  },

  onRun() {},

  onDestroy() {},
});
