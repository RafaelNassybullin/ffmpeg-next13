"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const Progress = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="3px"
        color="#fdba75"
        options={{ showSpinner: false }}
        showOnShallow={true}
      />
    </>
  );
};

export default Progress;
