import React from "react";
import { useStyles } from "../plumbing";
import TheButton from "../containers/TheButton";

export default function Layout() {
  const [styles, cx] = useStyles(({ unit, border, mixin }) => ({
    container: {
      ...mixin.newLayer,
      ...mixin.vertical,
      "@selectors": {
        "> header": {
          ...mixin.horizontallyCenterChildren,
          borderBottom: border,
          paddingTop: unit
        },
        "> main": {
          ...mixin.flex,
          ...mixin.centerCenter,
          margin: 'auto',
          padding: unit
        }
      }
    }
  }));

  return (
    <div className={cx(styles.container)}>
      <header>
        <h3 className={cx('bp3-heading')}>The Button</h3>
      </header>

      <main>
        <TheButton />
      </main>
    </div>
  );
}
