// Uses the same styles as Product
import PageNav from "../Components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            {/* Keep unforgatable memories with affordable price.  */}
            Create unforgettable memories without breaking the bank with
            WorldWise's affordable pricing. Our budget-friendly options ensure
            that you can capture every moment of your journey without
            sacrificing quality or experience. With WorldWise, cherish priceless
            memories at a price that won't leave a dent in your wallet.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
