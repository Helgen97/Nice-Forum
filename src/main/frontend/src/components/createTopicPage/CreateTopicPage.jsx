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
        title="Создание темы - Nice Forum - Форум приятого общения!"
        description="Создать новую тему. Создай новую тему и поделись ней с другими"
        keywords="Форум, общение, разделы, новая тема, создание"
      />

      <CreateForm />
    </main>
  );
};

export default CreateTopicPage;
