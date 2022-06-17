import React, { useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import TopicService from "../../API/TopicService";
import Input from "../UI/input/Input";
import SectionMenu from "./SectionMenu";
import TagMenu from "./TagMenu";
import TextArea from "./TextArea";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const CreateForm = () => {
  const navigate = useNavigate();

  const maxTextLength = 600;
  const [newTopic, setNewTopic] = useState({
    title: "",
    description: "",
    text: "",
    section: {
      id: 0,
    },
    topicTags: [],
  });

  const [inputsError, setInputsError] = useState("");
  const [tagEror, setTagError] = useState("");

  const [createTopic, isCreating, creatingError] = useFetching(async () => {
    const createdTopic = await TopicService.createTopic(newTopic);
    navigate("/topic/" + createdTopic.id, { replace: true });
  });

  function create(e) {
    e.preventDefault();

    if (checkInputs()) {
      setInputsError("Fill in the empty fields!");
      return;
    }
    setInputsError("");
    if (newTopic.text.length > maxTextLength) return;
    
    createTopic();
  }

  function checkInputs() {
    if (
      newTopic.title === "" ||
      newTopic.description === "" ||
      newTopic.section.id === 0 ||
      newTopic.text === ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  function unChooseTag(tagName) {
    setNewTopic({
      ...newTopic,
      topicTags: newTopic.topicTags.filter((tag) => tag.tagName !== tagName),
    });
  }

  function setTags(tag) {
    const newTagList = [...newTopic.topicTags, tag];
    setNewTopic({ ...newTopic, topicTags: newTagList });
  }

  function setSection(sectionID) {
    setNewTopic({ ...newTopic, section: { id: sectionID } });
  }

  if (isCreating) return <Loader />;
  if (creatingError) return <Error error={creatingError} />;

  return (
    <div className="form">
      <div className="form__title">
        <h2>Create new topic</h2>
      </div>
      <form>
        <Input
          id={"topic_name"}
          labelText={"Title:"}
          type={"text"}
          placeholder={"Enter topic title..."}
          value={newTopic.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
        />
        <Input
          id={"topic_desctription"}
          labelText={"Description"}
          type={"text"}
          placeholder={"Enter topic description..."}
          value={newTopic.description}
          onChange={(e) =>
            setNewTopic({ ...newTopic, description: e.target.value })
          }
          error={inputsError || tagEror}
        />

        <div className="form__select-container">
          <SectionMenu setSection={setSection} />

          <TagMenu
            setTags={setTags}
            unChooseTag={unChooseTag}
            setError={setTagError}
          />
        </div>

        <TextArea
          value={newTopic.text}
          onChange={(e) => setNewTopic({ ...newTopic, text: e.target.value })}
          maxTextLength={maxTextLength}
        />

        <div className="form-btn-container">
          <button onClick={create}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
