import React from "react";
import Avatar from "../../img/avatar.svg";
import MetaTags from "../UI/meta/MetaTags";

const AboutPage = () => {
  return (
    <main className="about">
      <MetaTags
        title={"Про форум - Nice Forum - форум приятного общения!"}
        description={
          "Про форум. Здесь ты можешь почитать о том, что это за форум, кто сделал, и для чего!"
        }
        keywords={"Форум, общение, разделы, дружба, о форуме, создатель"}
      />

      <div className="about-page">
        <div className="about__title">
          <h2>Информация о форуме</h2>
        </div>
        <div className="about__details">
          <p className="about__details-desctription">
            <span className="about__details-title">Nice-Forum</span> - это дипломный выпускной проект IT курсов.
          </p>
          <p className="about__details-desctription">
            <span className="about__details-title">Цель проекта</span> - показать практические навыки по
            пройденому материалу.
          </p>
          <p className="about__details-desctription">
            <span className="about__details-title">Идея проекта</span> - создать простую версию интернет-форума
            где любой желающий смог бы обсуждать, делится, и обмениватся любой
            информацией на любые темы.
          </p>
          <p className="about__details-desctription">Проект был создан мной единолично.</p>
          <p className="about__details-desctription">
            <span className="about__details-title">Автор проекта</span> -{" "}
            <span className="about__details-author">Донченко Дмитрий.</span>
          </p>
          <div className="about__details-links">
            <span>Как со мной связаться? - </span>
            <a href="mailto:drmegman@gmail.com" className="mail" />
            <a
              href="https://linkedin.com/in/dmytrodonchenko"
              className="linked_in"
            />
            <a href="https://github.com/Helgen97" className="git_hub" />
          </div>
        </div>
        <div className="about__footer">
          <h3>Администратор форума</h3>
          <div>
            <a className="about__footer-content" href="/user/1">
              <img src={Avatar} alt="admin" className="about__footer-content_avatar"/>
              <div>
                <p className="about__footer-content_nickname">Admin</p>
                <p>Дмитрий Донченко</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
