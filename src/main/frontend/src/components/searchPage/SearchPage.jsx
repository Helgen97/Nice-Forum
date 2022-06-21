import React, { useEffect, useState } from "react";
import SearchHeader from "./SearchHeader";
import SearchFilters from "./SearchFilters";
import { useSearchParams } from "react-router-dom";
import SearchResultTopic from "./SearchResultTopic";
import { useFetching } from "../../hooks/useFetching";
import SearchService from "../../API/SearchService";
import MetaTags from '../UI/meta/MetaTags';
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    title: "",
    author: "",
    section: "",
    tags: "",
    from: "",
    to: "",
  });
  const [foundTopics, setFoundTopics] = useState([]);
  const [searchTopics, isSearching, searchError] = useFetching(
    async (params) => {
      const topics = await SearchService.searchTopics(params);
      setFoundTopics(topics);
    }
  );

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      search()
    }
  }

  function search() {
    setSearchParams(filterEmptyParams({}, params), { replace: true });
  }

  function filterEmptyParams(target, clone) {
    for (let key in clone) {
      if (clone[key] !== "") target[key] = clone[key];
    }
    return target;
  }

  useEffect(() => {
    if (searchParams.toString() === "") return;
    searchTopics(searchParams.toString());
    setParams(Object.fromEntries([...searchParams]));
  }, [searchParams]);

  if (isSearching) return <Loader />;
  if (searchError) return <Error error={searchError} />;

  return (
    <main className="search-page">
      <MetaTags 
      title={"Advanced Search - Topic Search - Nice Forum - Forum of Nice Communication!"}
      description={"Looking something special? Lets start here! Advanced Search. Search by sections, tags, authors and topics."}
      keywords={"Forum, speaking, sections, friendship, news, search, advanced search, tags, sections, date"}
      />
      <SearchHeader
        value={params.title}
        onChange={(e) => setParams({ ...params, title: e.target.value })}
        search={handleKeyDown}
      />
      <div className="search__content">
        <div className="search__result">
          {foundTopics.map((topic) => (
            <SearchResultTopic topic={topic} key={topic.id} />
          ))}
        </div>
        <SearchFilters applyFilters={search} params={params} setParams={setParams}/>
      </div>
    </main>
  );
};

export default SearchPage;
