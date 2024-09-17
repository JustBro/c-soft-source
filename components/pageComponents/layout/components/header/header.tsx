import Image from "next/image";

import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className="wrapper">
      <div className={styles.headerWrapper}>
        <div>
          <h1 className={styles.title}>Тестовое задание</h1>
          <h2 className={styles.subTitle}>
            Frontend-разработчик: Оботуров Владислав Аркадьевич
          </h2>
        </div>
        <Image
          className={styles.logo}
          src="/images/logo.svg"
          alt="Логотип"
          width={154}
          height={100}
        ></Image>
      </div>
    </header>
  );
}
