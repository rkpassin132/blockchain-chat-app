// components/Hero.js
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

const HeroSection = ({ heading, discription, image }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>{heading}</h1>
        <p>{discription}</p>
        <div className={styles.buttons}>
          <Link href="/allUser">
            <button className={styles.button}>Add Friend</button>
          </Link>
          {/* <button className={`${styles.button} ${styles.outline}`}>
            View demo
          </button> */}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt="Image"
          width={500}
          height="auto"
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default HeroSection;
