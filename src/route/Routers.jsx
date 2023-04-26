import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { allRoutes } from "./Route";

const Routers = () => {
 

  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map((val, _) => {
          return (
            <Route
              key={val.title}
              path={`/${val.path}`}
              element={val.element}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
