import React, { useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import SectionService from "../../API/SectionService";
import Input from "../UI/input/Input";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const SectionMenu = () => {
  const [newSection, setNewSection] = useState({
    name: "",
    description: "",
  });
  const [createSection, isCreating, creatingError] = useFetching(async () => {
    const createdSection = await SectionService.createSection(newSection);
    setNewSection(createdSection);
    setInputMessage("Раздел создан!");
  });
  const [inputMessage, setInputMessage] = useState("");

  function create() {
    if (newSection.name === "" || newSection.description === "") {
      setInputMessage("Заполните пустые поля!");
      return;
    }
    createSection();
  }

  if (isCreating) return <Loader />;
  if (creatingError) return <Error error={creatingError} />;

  return (
    <div
      id="new_section_menu"
      className="settings__panel-edit__block settings__panel-edit__block-active"
    >
      <div className="settings__panel-edit__title">
        <h3>Создать новый раздел:</h3>
      </div>
      <Input
        id={"section"}
        labelText={"Название раздела:"}
        type={"text"}
        placeholder={"Введите название"}
        value={newSection.name}
        onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
        error={inputMessage}
      />
      <Input
        id={"description"}
        labelText={"Описание раздела:"}
        type={"text"}
        placeholder={"Введите описание"}
        value={newSection.description}
        onChange={(e) =>
          setNewSection({ ...newSection, description: e.target.value })
        }
      />
      <div className="form-btn-container">
        <button className="form-btn" onClick={create}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default SectionMenu;
