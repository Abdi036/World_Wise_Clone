import PageNav from "../Components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise.</h2>
          <p>
            Embark on a journey of a lifetime with WorldWise, your ultimate
            companion in global exploration. With WorldWise, your adventures
            become more than just memories—they become a living map of your
            wanderlust. Our platform meticulously tracks your footsteps across
            every city imaginable, ensuring you never forget the incredible
            experiences you've had around the world. From the bustling streets
            of Tokyo to the tranquil shores of Santorini, our world map
            showcases every destination you've explored, allowing you to relive
            your journeys and share them with friends. Let WorldWise be your
            guide as you wander the globe and create a lifetime of unforgettable
            moments.
          </p>
        </div>
      </section>
    </main>
  );
}
