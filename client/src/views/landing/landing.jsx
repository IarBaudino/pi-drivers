import React from 'react'
import styles from '../landing/landing.module.css'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.tituloUno}>READY...</h1>
        <p className={styles.tituloUno}>SET...</p>
        <Link to="/home">
          <button className={styles.button}>GO!!!</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing