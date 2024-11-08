import React from 'react'
import Card from '../../customs/card/card'
import Button from '../../customs/button/button'
import styles from "./index.module.scss"
import Key from "../../assets/claim.svg"

const Subscription = () => {
  return (
      <section className={styles.container}>
          <Card className={styles.cardContainer}>
              <>
              <img src={Key} alt="" />
              </>

              <h2>Subcribe To Claim This Business</h2>
              <p>Choose a subcribtion plann to be able to claim and manage your  <br />business</p>

              <Button text='check out subscription plan' type='button' />

          </Card>


  </section>
  )
}

export default Subscription