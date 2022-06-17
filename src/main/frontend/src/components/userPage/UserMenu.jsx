import React, { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import { useParams } from "react-router-dom";
import UserService from "../../API/UserService";
import UserMenuTitle from "./UserMenuTitle";
import UserMenuInformation from "./UserMenuInformation";
import UserMenuStatistic from "./UserMenuStatistic";
import UserMenuTopics from "./UserMenuTopics";
import UserMenuComments from "./UserMenuComments";
import MetaTags from "../UI/meta/MetaTags";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const UserMenu = () => {
  const userID = useParams().userID;

  const [user, setUser] = useState({
    birthday: "",
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    nickname: "",
    registrationDate: "",
    role: "",
    createdTopics: 0,
    createdComments: 0,
    userLikes: 0,
  });

  const [getUser, isLoading, gettingError] = useFetching(async (userID) => {
    const user = await UserService.getUserByID(userID);
    setUser(user);
  });

  useEffect(() => {
    getUser(userID);
  }, [userID]);

  if (isLoading) return <Loader />;
  if (gettingError) return <Error error={gettingError} />;

  return (
    <div>
      <MetaTags
        title={
          user.nickname + " - Profile - Nice Forum - Forum of Nice Communication!"
        }
        description={
          "Profile of " +
          user.nickname +
          " user. Information about " +
          user.nickname +
          "."
        }
        keywords={
          "Forum, speaking, sections, friendship, news, profile, information about user"
        }
      />

      <div className="user-menu">
        <UserMenuTitle nickname={user.nickname} userID={userID} />

        <UserMenuInformation
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          role={user.role}
          registrationDate={user.registrationDate}
          birthday={user.birthday}
        />

        <UserMenuStatistic
          createdTopicCount={user.createdTopics}
          commentsCount={user.createdComments}
          likes={user.userLikes}
        />
      </div>

      <UserMenuTopics userId={user.id} nickname={user.nickname} />

      <UserMenuComments userId={user.id}/>
    </div>
  );
};

export default UserMenu;
