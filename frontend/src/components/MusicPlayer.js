import React from "react";
import { Grid, Typography, Card, IconButton, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const MusicPlayer = ({ title, artist, duration, time, image_url, is_playing, votes, votes_required }) => {
  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  };

  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  };

  const songProgress = (time / duration) * 100;

  return (
    <Grid container justifyContent="center" className="rounded-xl pt-6">
      <Grid item xs={12} sm={8} md={6} className="">
  <Card
  sx={{
    // padding: 2,
    backgroundColor: 'gray', // Ensure the card background color
    // borderRadius: 'xl',
    // border: '1px solid gray', // Add border color if needed
  }}
  className="shadow-xl shadow-slate-200 py-3 px-2 rounded-xl"
>
  <Grid container className="flex flex-col justify-center items-center">
    <Grid item sm={7}>
      <img
        src={image_url}
        alt="Album cover"
        style={{ height: '100%', width: '100%' }}
      />
    </Grid>
    <Grid item xs={8}>
      <Typography
        variant="h5"
        style={{ fontFamily: 'Gupter, serif', fontWeight: 700 }}
        className="w-full truncate"
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ fontFamily: 'Gupter, serif', fontWeight: 500 }}
      >
        {artist}
      </Typography>
      <div>
        <IconButton>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={is_playing ? pauseSong : playSong}>
          {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={skipSong}>
          <SkipNextIcon />
        </IconButton>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          style={{ fontFamily: 'Gupter, serif', fontWeight: 400 }}
          className="pl-20"
        >
          {votes} / {votes_required}
        </Typography>
      </div>
    </Grid>
  </Grid>

  <div className="relative mt-4 bg-gray-400">
    <div className="flex items-center bg-gray-400">
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={songProgress}
        sx={{
          borderRadius: 8, // For a rounded progress bar
          height: 8, // Adjust height if necessary
          backgroundColor: 'gray.600', // Background color of the progress bar
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'gray.200', // Color of the progress fill
          },
        }}
        className="rounded-full flex-1"
      />

      {/* Percentage Label */}
      <div
        className="absolute left-0 flex items-center bg-gray-200 text-slate-900 font-semibold rounded-full px-2 py-1"
        style={{ fontFamily: 'Gupter, serif', fontWeight: 500 }}
      >
        <span>{Math.round(songProgress)}%</span>
      </div>
    </div>
  </div>
</Card>


      </Grid>
    </Grid>
  );
};

export default MusicPlayer;
