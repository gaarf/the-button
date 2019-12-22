import React from "react";
import { useStyles, plural } from "../../plumbing";
import { Tag } from "@blueprintjs/core";
import { InfoProps } from "./types";

const InfoPanel: React.FC<InfoProps> = ({
  isYou,
  waitTime,
  ethCost,
  lastParticipant,
  age
}) => {
  const [styles, cx] = useStyles(({ border, mixin, color, unit }) => ({
    info: {
      ...mixin.attachToBottom,
      backgroundColor: color.bg,
      borderTop: border,
      padding: unit,
      "@selectors": {
        "> ul > li > *": {
          marginRight: unit
        }
      }
    }
  }));

  return (
    <div className={cx(styles.info)}>
      <ul className={cx("bp3-list-unstyled", "bp3-running-text")}>
        <li>
          <strong>Cost:</strong>
          <span>{ethCost}</span>
        </li>
        {Number(lastParticipant) > 0 && (
          <li>
            <strong>Last Participant:</strong>
            {isYou && <Tag round>YOU!</Tag>}
            <a
              href={`https://rinkeby.etherscan.io/address/${lastParticipant}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <code>{lastParticipant}</code>
            </a>
            <span>{plural(age, "block")} ago</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default InfoPanel;
