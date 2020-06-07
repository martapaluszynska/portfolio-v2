export interface NavbarLink {
    name: string;
    link: string;
}

export interface SiteMetadata {
    name: string;
    navbarLinks: NavbarLink[];
    tagline: string;
}

// -----------------------------

export interface Header {
    cta: string;
    text: string;
}

export interface Link {
    name: string;
    link: string;
}

// -----------------------------

export interface SectionRow {
    title: string;
    text: string;
    date: string;
    link?: Link;
    image?: string;
}

export interface Section {
    title: string;
    text?: string;
    'file-link'?: Link;
    image?: string;
    data: SectionRow[];
}

// -----------------------------

export interface PageResponse {
    header: Header;
    education: Section;
    'work-experience': Section;
    skills: Skills;
    volunteering: Volunteering;
}

// -----------------------------

export interface SkillsData {
    icon: any;
    title: string;
    programs: string;
    type: string;
}

export interface Skills {
    title: string;
    data: SkillsData[];
}

// -------------------------------

export interface Volunteering {
    title: string;
    text: string;
    textadd: string;
}
