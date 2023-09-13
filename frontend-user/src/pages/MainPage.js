import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import MotPasseOublie from "../formulaire/MotPasseOublie";
import MotPasseOublie2 from "../formulaire/MotPasseOublie2";
import IdeaWithLogin from "./IdeaWithLogin";
import PrivateRoutes from "../components/PrivateRoutes";
import IdeaForm from "../formulaire/IdeaForm";
import AllIdeas from "./profil/AllIdeas";
import Account from "./profil/Account";
import Logout from "./Logout";
import DetailIdeas from "./DetailIdea";
import UpdateIdea from "../formulaire/UpdateIdea";
import UpdateAccount from "../formulaire/UpdateAccount";
import FavoriteIdea from "./profil/FavoriteIdea";
import ResetPassword from "../formulaire/ResetPassword";
import UpdateImageForm from "../formulaire/UpdateImageForm";

function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<IdeaWithLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetPassword" element={<MotPasseOublie />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/motPasseOublie2" element={<MotPasseOublie2 />} />
        <Route path="/detail/:ideaId" element={<DetailIdeas />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/detail" element={<DetailIdeas />} />
          <Route path="/account" element={<Account />} />
          <Route path="/updateAccount" element={<UpdateAccount />} />
          <Route path="/ajouterIdee" element={<IdeaForm />} />
          <Route path="/allIdea" element={<AllIdeas />} />
          <Route path="/updateImage/:id" element={<UpdateImageForm />} />
          <Route path="/updateIdea/:id" element={<UpdateIdea />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/myIdeas" element={<AllIdeas />} />
          <Route path="/myFavoris" element={<FavoriteIdea />} />
          <Route path="/resetPassword/:id" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
  );
}
export default MainPage;
