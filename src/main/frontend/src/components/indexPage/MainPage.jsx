import React, { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import SectionService from "../../API/SectionService";
import Section from "./Section";
import MetaTags from "../UI/meta/MetaTags";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const MainPage = () => {
  const [sectionsList, setSectionsList] = useState([]);

  const [getSectionsList, isLoading, gettingSectionsListError] =
    useFetching(async () => {
      const sections = await SectionService.getAll();
      setSectionsList(sections);
    });

  useEffect(() => {
    getSectionsList();
  }, []);

  if (gettingSectionsListError)
    return <Error error={gettingSectionsListError} />;

  if (isLoading) return <Loader />;

  return (
    <main className="main-page">
      <MetaTags
        title="Nice Forum - Форум приятного общения!"
        description={
          "Главная страница форума. Здесь ты можешь поделится новостями, найти людей единомышленников и приятно провести время!"
        }
        keywords={"Форум, общение, разделы, дружба, новости"}
      />

      {sectionsList.map((section) => (
        <Section section={section} key={section.id} />
      ))}
    </main>
  );
};

export default MainPage;
