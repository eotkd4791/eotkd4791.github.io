interface Frontmatter {
  date: string;
  title: string;
  category: string;
  template: string;
  description?: string;
  tags?: Array<string>;
  socialImage?: string;
}

export default Frontmatter;
