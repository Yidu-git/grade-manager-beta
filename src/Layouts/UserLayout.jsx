import { Routes, Route } from "react-router-dom";

export const UserLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
