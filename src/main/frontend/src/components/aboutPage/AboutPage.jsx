import React from "react";
import Avatar from "../../img/avatar.svg";
import MetaTags from "../UI/meta/MetaTags";

const AboutPage = () => {
  return (
    <main className="about">
      <MetaTags
        title={"About - Nice Forum - Forum of Nice Communication"}
        description={
          "About forum. At this page you can read about this forum, who created it and why."
        }
        keywords={"Forum, speaking, sections, friendship, about, creator"}
      />

      <div className="about-page">
        <div className="about__title">
          <h2>About forum</h2>
        </div>
        <div className="about__details">
          <p className="about__details-desctription">
            <span className="about__details-title">Nice-Forum</span> - is a
            graduate project of IT courses.
          </p>
          <p className="about__details-desctription">
            <span className="about__details-title">Project Goal</span> - is show
            practical skills on the passed material.
          </p>
          <p className="about__details-desctription">
            <span className="about__details-title">Idea of the Project</span> -
            is create simple version of the internet-forum, where anyone could
            discuss, share and exchange any information on any topics.
          </p>
          <p className="about__details-desctription">
            The project was created by me alone.
          </p>
          <p className="about__details-desctription">
            <span className="about__details-title">Project author</span> -{" "}
            <span className="about__details-author">Donchenko Dmytro.</span>
          </p>
          <div className="about__details-links">
            <span>How to contact me? - </span>
            <a href="mailto:drmegman@gmail.com" className="mail" />
            <a
              href="https://linkedin.com/in/dmytrodonchenko"
              className="linked_in"
            />
            <a href="https://github.com/Helgen97" className="git_hub" />
          </div>
        </div>
        <div className="about__footer">
          <h3>Forum Administrator</h3>
          <div>
            <a className="about__footer-content" href="/user/1">
              <img
                src={Avatar}
                alt="admin"
                className="about__footer-content_avatar"
              />
              <div>
                <p className="about__footer-content_nickname">Admin</p>
                <p>Dmytro Donchenko</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
