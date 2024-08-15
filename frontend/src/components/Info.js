import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";

export default function Info() {
  
  return (
    <>
      <section
  className="relative sm:grid sm:grid-cols-2 sm:items-center"
  style={{
    height: '100vh', // Ensure the section has a height
  }}
>
  {/* Pseudo-element for the blur effect */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('../../static/images/about.jpg  ')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      // filter: 'blur(8px)', // Adjust the blur intensity here
      // zIndex: -1, // Place it behind the content
    }}
  ></div>
<div className="p-8 md:p-12 lg:px-16 lg:py-24 relative z-10 backdrop-blur-sm">
  
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right shadow-xl bg-opacity-20 shadow-yellow-200  rounded-xl bg-yellow-600">
      <h2 className="text-2xl font-bold  text-black  py-3 px-2  md:text-3xl">
      Welcome to VIBE MASTER!
      
      </h2>

      <p className="hidden font-bold text-lg text-justify text-pretty text-white md:mt-4 md:block px-3">
      Welcome if you are not able to play and pause the  song or skip it. 
      It means you are not a premium user of spotify they had changed their 
      policies so no one in you room can perform the operation host have to be 
      spotify premium user sorry for inconvinence.
     
      </p>

      <div className="mt-4 md:mt-8 pb-4">
        <a
          href="/"
          className="relative z-10  p-4 md:inline-block hidden pb-4 rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Thankyou for your visit..
        </a>
      </div>
    </div>
  </div>

  <Grid container spacing={3} className="z-10">
      <Grid item xs={12} align="center">
        <div className="relative inline-block text-center">
          <Typography variant="h3">
            <div className="text-2xl w-152 font-bold text-black shadow-xl shadow-yellow-100 bg-yellow-200 bg-opacity-30 py-3 rounded-xl md:text-3xl px-2">
              This is MUSIC VOTE Counter  
            </div>
          </Typography>
        </div>
      </Grid> 
    </Grid>
  </section>
</>
  );
}
