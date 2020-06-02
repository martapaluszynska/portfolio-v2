import { graphql } from 'gatsby';
import * as React from 'react';

import { TimeLine } from '../components/career';
import { Layout } from '../components/Layout';
import { Hero } from './../components/Hero';

import { TreesImage } from './../components/images/sections/volunteering/TreesImage';
import { TextBouble } from './../components/TextBouble/TextBouble';
import { SkillsData } from './../models/site';

import { ThreeD } from './../components/images/sections/skills/ThreeD';
import { TwoD } from './../components/images/sections/skills/TwoD';
import { Ux } from './../components/images/sections/skills/Ux';
import { ZuchoweWiesci } from './../components/images/sections/work/ZuchoweWiesci';

import { WorkImage } from '../components/images/WorkImage';
import { EducationImage } from './../components/images/sections/education/EducationImage';
import { IkeaImage } from './../components/images/sections/work/IkeaImage';
import { MilutkaImage } from './../components/images/sections/work/MilutkaImage';
import { XFiveImage } from './../components/images/sections/work/XFiveImage';

import WORK_PAGE from '../data/work.json';
import '../styles/styles.scss';
import styles from './Work.module.scss';

interface IndexPageProps {
    data: {
        site: {
            siteMetadata: {
                name: string;
                tagline: string;
            },
        },
    };
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        name
        tagline
      }
    }
  }
`;

const IndexPage = (props: IndexPageProps) => {

    const {
        name,
        tagline,
    } = props.data.site.siteMetadata;

    const header = WORK_PAGE.header;
    const education = WORK_PAGE.education;
    const work = WORK_PAGE['work-experience'];
    const skills = WORK_PAGE.skills;
    const volunteering = WORK_PAGE.volunteering;

    const mappedWorkExperience = () => {
        return work.data.map((data, index: number) => {
            switch (index) {
                case 0:
                    data.image = <IkeaImage /> as unknown as string;
                    break;
                case 1:
                    data.image = <XFiveImage /> as unknown as string;
                    break;
                case 2:
                    data.image = <MilutkaImage /> as unknown as string;
                    break;
                default:
                    data.image = <ZuchoweWiesci /> as unknown as string;
                    break;
            }
            return data;
        });
    };

    return (
        <Layout>
            <Hero name="Ścieżka zawodowa" tagline={`From product design, through to graphic design, to UX/UI, my skillset is forever evolving and continually adaptable in it's approach. My passion is to combine beauty, simplicity and usability.`} image={<WorkImage />}>
                <TextBouble text={header.cta} top="10%" left="70%" />
            </Hero>
            {/* EDUCATION */}
            <section className={`section ${styles.sectionEducation}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1366 190.3"
                    style={{
                        position: 'absolute',
                        bottom: `100%`,
                        left: 0,
                        width: `100%`,
                        zIndex: -1,
                    }}
                >
                    <path
                        fill="#0e3239"
                        d="M307 190a83.7 83.7 0 01-31.4-3.6c-52-16.7-55-74.4-55-76a110.3 110.3 0 00-220.6 0l.1 5.5H0v166.3h1366V115.9z"
                    />
                </svg>
                <div className="container">
                    <div className="columns is-centered is-relative">
                        <div className="column is-half">
                            <h2 className="title has-text-centered">{education.title}</h2>
                            <p className="">{education.text}</p>
                        </div>

                    </div>
                    <TimeLine rows={education.data} mainImage={<EducationImage />} />

                </div>
            </section>
            {/* WORK EXPERIENCE */}
            <section className="section">
                <TextBouble text={work['file-link'].name} link={work['file-link'].link} top="-100px" left="60%" />
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <h2 className="title has-text-centered">{work.title}</h2>
                        </div>
                    </div>
                    <TimeLine rows={mappedWorkExperience()} alternatingNth={2} />
                </div>
            </section>
            {/* SKILLS */}
            <section className={`section ${styles.sectionSkills}`}>
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <h2 className={`title has-text-centered ${styles.skillsTitle}`}>{skills.title}</h2>
                        </div>
                    </div>
                </div>
                <SkillsItems skills={skills.data} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="310.5"
                    style={{
                        position: 'absolute',
                        top: `100%`,
                        left: 0,
                        width: `100%`,
                    }}
                >
                    <path d="M0 0a320 320 0 00319.8 310.5 319.4 319.4 0 00249.3-119.4C664.3 73.1 719 4.1 950.6 0z" fill="#0e3239"/>
                </svg>
            </section>
            {/* VOLUNTEERING */}
            <section className="section section--volunteering">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div
                            className="column is-half section-image"
                            style={{
                                // marginTop: `-25%`
                            }}
                        >
                            <TreesImage />
                        </div>
                        <div className="column is-half">
                            <h2 className="title">{volunteering.title}</h2>
                            <p className="">{volunteering.text}</p>
                        </div>
                    </div>

                </div>
            </section>
            <section className={`footer ${styles.sectionContact}`}>
                <div className="container">
                    <div className="columns">
                        <div className="column is-half">
                            Contact
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default IndexPage;

interface SkillsProps {
    skills: SkillsData[];
}

const SkillsItems = ({ skills }: SkillsProps) => {

    const mappedSkills = () => {
        return skills.map((skill) => {
            switch (skill.title) {
                case '2d':
                    skill.icon = <TwoD />;
                    break;
                case '3d':
                    skill.icon = <ThreeD />;
                    break;
                default:
                    skill.icon = <Ux />;
                    break;
            }
            return skill;
        });
    };

    return (
        <div className="container">
            <div className="columns">
                {mappedSkills().map((skill: SkillsData) => (
                    <div className="skill column" key={skill.title}>
                        <div>
                            {skill.icon}
                            <h3 className="title">{skill.title}</h3>
                        </div>
                        <p>{skill.programs}</p>
                        <p>{skill.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
