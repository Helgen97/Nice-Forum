import React from "react";
import { useFetching } from "../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import UserService from "../../API/UserService";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const DeleteMenu = ({ userId }) => {
  const navigate = useNavigate();

  const [deleteAcc, isDeleting, deleteError] = useFetching(async () => {
    UserService.deleteUser(userId);
    navigate("/signout", { replace: true });
  });

  function deleteAccount() {
    if (window.confirm("Вы уверены в удалении аккаунта?")) {
      deleteAcc();
    }
  }

  if (isDeleting) return <Loader />;
  if (deleteError) return <Error error={deleteError} />;

  return (
    <div id="delete_menu" className="settings__panel-edit__block">
      <div className="settings__panel-edit__title">
        <h3>Delete account</h3>
      </div>
      <div className="form-btn-container">
        <button className="form-btn-delete" onClick={deleteAccount}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteMenu;
