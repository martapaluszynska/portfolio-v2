import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

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

import cv from '../../static/marta_paluszynska_CV_ANG_PL.pdf';
import WORK_PAGE from '../data/work.json';
import ContactForm from './contactForm';
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
                <TextBouble pointerEvents="none" flipped={true} text={header.cta} top="10%" left="20%" />
            </Hero>
            {/* EDUCATION */}
            <section className={`section ${styles.sectionEducation}`}>
                {/* <div className={`${styles.scrollForMore}`}>
                </div> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1366 190.3"
                    style={{
                        position: 'absolute',
                        bottom: `100%`,
                        left: 0,
                        width: `100%`,
                        zIndex: 1,
                    }}
                >
                    <path
                        fill="#0e3239"
                        d="M307 190a83.7 83.7 0 01-31.4-3.6c-52-16.7-55-74.4-55-76a110.3 110.3 0 00-220.6 0l.1 5.5H0v166.3h1366V115.9z"
                    />
                    <g
                        transform="
                            scale(.75)
                            translate(125 40)
                        "
                        style={{
                            fill: 'none',
                            stroke: '#fff',
                            strokeWidth: 4,
                            strokeMiterlimit: 10,
                        }}
                    >
                        <polyline
                            style={{
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                            }}
                            points="37,85.8 22,95.8 7,85.8 "
                        />
                        <path
                            d="M2,52.2l0-30.5C2,10.8,10.8,2,21.8,2l0.5,0C33.2,2,42,10.8,42,21.8l0,30.5C42,63.2,33.2,72,22.2,72l-0.5,0C10.8,72,2,63.2,2,52.2z"
                        />
                        <line
                            style={{
                                strokeLinecap: 'round',
                            }}
                            x1="22"
                            y1="17.3"
                            x2="22"
                            y2="27.3"
                        />
                    </g>
                </svg>
                <div className="container">
                    <div className="columns is-centered is-relative">
                        <div className="column is-half">
                            <div className={`${styles.header}`}>
                                <h2 className="title has-text-centered">{education.title}</h2>
                                <div className="is-hidden-desktop">
                                    <EducationImage />
                                </div>
                                <p className="text">{education.text}</p>
                            </div>
                        </div>
                    </div>
                    <TimeLine rows={education.data} mainImage={<EducationImage />} />
                </div>
            </section>
            {/* WORK EXPERIENCE */}
            <section className="section">
                <TextBouble text={work['file-link'].name} link={cv} top="-7%" left="60%" />
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <div className={`${styles.header}`}>
                                <h2 className="title has-text-centered">{work.title}</h2>
                                <div className="is-hidden-desktop">
                                    <MilutkaImage />
                                </div>
                            </div>
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
                            <div className={`${styles.header}`}>
                                <h2 className={`title has-text-centered`}>{skills.title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <SkillsItems skills={skills.data} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 310.5"
                    style={{
                        position: 'absolute',
                        top: `100%`,
                        left: 0,
                        width: `70%`,
                        marginTop: `-1px`,
                    }}
                >
                    <path d="M0 0a320 320 0 00319.8 310.5 319.4 319.4 0 00249.3-119.4C664.3 73.1 719 4.1 950.6 0z" fill="#0e3239" />
                </svg>
            </section>
            {/* VOLUNTEERING */}
            <section className="section section--volunteering">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div className="column is-half section-image">
                            <TreesImage />
                        </div>
                        <div className="column is-half">
                            <h2 className="title">{volunteering.title}</h2>
                            <p className="">{volunteering.text}</p>
                            <p className="">{volunteering.textadd}</p>
                        </div>
                    </div>

                </div>
            </section>
            <ContactForm />
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
                    <div className={`skill column ${styles.skill__item}`} key={skill.title}>
                        <div className={`${styles.skill__header}`}>
                            <div className={`${styles.skillIcon}`}>
                                {skill.icon}
                            </div>
                            <h3 className={`title ${styles.skillTitle}`}>{skill.title}</h3>
                        </div>
                        <p className={`${styles.skill__text}`}>{skill.programs}</p>
                        <p className={`${styles.skill__text} has-text-weight-bold`}>{skill.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
