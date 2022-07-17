import React from "react";

import { Icon } from "@/components/Icon";
import { ICONS } from "@/constants";
import { Dictionary } from "@/types";
import { getContactHref, getIcon } from "@/utils";

import * as styles from "./Contacts.module.scss";

type Props = {
  contacts: Dictionary<string>;
};

const Contacts: React.FC<Props> = ({ contacts }: Props) => (
  <div className={styles.contacts}>
    <ul className={styles.list}>
      {(Object.keys(contacts) as Array<keyof typeof ICONS>).map((name) =>
        contacts[name] ? (
          <li className={styles.item} key={name}>
            <a
              className={styles.link}
              href={getContactHref(name, contacts[name])}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name={name} icon={getIcon(name)} />
            </a>
          </li>
        ) : null,
      )}
    </ul>
  </div>
);

export default Contacts;
