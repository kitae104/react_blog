import React from 'react';
import { Outlet } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About 페이지</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default About;