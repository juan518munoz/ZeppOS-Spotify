const toggle = {
  play: "pause",
  pause: "play",
  like: "notLike",
  notLike: "like",
  shuffle: "noShuffle",
  noShuffle: "shuffle",
};

export class PlayerControl {
  constructor(messageBuilder) {
    this.messageBuilder = messageBuilder;
    this.player = {
      isPlaying: false, //  this is temporary until the music sensor is fixed
    };
    this.song = "";
    this.artist = "";
    this.playState = "play";
    this.likeState = "notLiked";
    this.shuffleState = "noShuffle";
    this.songId = "";
    this.queue = [];
    this.progress = 0;
    this.devices = [];
    this.context = null;
  }

  connect() {
    /*this.player.addEventListener(hmSensor.event.CHANGE, function () {
      this.song = this.player.song;
      this.artist = this.player.artist;
      this.playbackState = this.player.playbackState;
    });*/
  }

  play() {
    if (this.player.isPlaying) {
      // foo
      return;
    }

    this.messageBuilder.request({
      func: "player",
      method: toggle[this.playState],
    });

    this.playState = toggle[this.playState];
  }

  next() {
    if (this.player.isPlaying) {
      // foo
      return;
    }

    this.messageBuilder.request({
      func: "player",
      method: "next",
    });
    this.update();
  }

  previous() {
    if (this.player.isPlaying) {
      // foo
      return;
    }

    this.messageBuilder.request({
      func: "player",
      method: "previous",
    });
    this.update();
  }

  toggleLike() {
    if (this.likeState == "notLiked") {
      this.likeState = "liked";
      this.messageBuilder.request({
        func: "tracks",
        method: "liked",
        curSongId: this.songId,
      });
      return;
    }

    this.likeState = "notLiked";
    this.messageBuilder.request({
      func: "tracks",
      method: "notLiked",
      curSongId: this.songId,
    });
  }

  toggleShuffle() {
    this.messageBuilder.request({
      func: "player",
      method: "shuffle",
      args: `state=${this.shuffleState != "shuffle"}`,
    });
    this.shuffleState = toggle[this.shuffleState];
  }

  playOffset(index) {
    this.messageBuilder
      .request({
        func: "startPlaylist",
        playlistId: this.context,
        offset: index,
      })
      .then((data) => {
        //console.log(data);
      });
  }

  update() {
    this.messageBuilder
      .request({
        func: "player",
      })
      .then((data) => {
        const {
          songName = "No content playing",
          artistNames = "check if any device is streaming",
          isPlaying = false,
          isLiked = false,
          isShuffled = false,
          progress = 0,
          songId = "",
          queue = [],
          context = null,
        } = data;

        if (!this.player.isPlaying) {
          this.song = songName;
          this.artist = artistNames;
          isPlaying ? (this.playState = "play") : (this.playState = "pause");
        }

        this.songId = songId;
        this.progress = progress;
        this.queue = queue;
        this.context = context;
        isLiked ? (this.likeState = "liked") : (this.likeState = "notLiked");
        isShuffled
          ? (this.shuffleState = "shuffle")
          : (this.shuffleState = "noShuffle");
      });
  }

  disconnect() {}
}
