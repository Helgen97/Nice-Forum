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
        title="Nice Forum - Forum of Nice Communication!"
        description={
          "Nice forum home. Here you can share news, find like-minded people and have a good time!"
        }
        keywords={"Forum, speaking, sections, friendship, news"}
      />

      {sectionsList.map((section) => (
        <Section section={section} key={section.id} />
      ))}
    </main>
  );
};

export default MainPage;
