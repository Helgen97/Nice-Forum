import React from "react";
import { useAuth } from '../../context/Auth';
import MetaTags from "../UI/meta/MetaTags";
import CreateForm from "./CreateForm";
import PermissionDeniedBlock from '../UI/permissionDeniedPage/PermissionDeniedBlock';

const CreateTopicPage = () => {
  const { isAuth } = useAuth();

  if(!isAuth) return <PermissionDeniedBlock />

  return (
    <main className="create-page">
      <MetaTags
        title="Create topic - Nice Forum - Forum of Nice Communication!"
        description="Want create topic? Here you can do this! Create new topic and share it to others."
        keywords="Forum, speaking, sections, new topic, creating, tags, text, questions, post, thread"
      />

      <CreateForm />
    </main>
  );
};

export default CreateTopicPage;
