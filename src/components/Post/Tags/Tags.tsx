import React from "react";

import { Link } from "gatsby";

import * as styles from "./Tags.module.scss";

type Props = {
  tags: string[];
  tagSlugs: string[];
};

const Tags = ({ tags, tagSlugs }: Props) => (
  <div className={styles.tags}>
    <ul className={styles.list}>
      {tagSlugs
        ? tagSlugs.map((slug, i) => (
            <li className={styles.item} key={slug}>
              <Link to={slug} className={styles.link}>
                {tags[i]}
              </Link>
            </li>
          ))
        : null}
    </ul>
  </div>
);

export default Tags;
