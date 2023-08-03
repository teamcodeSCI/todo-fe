import React from 'react'
import style from './card.module.scss'

const Card = (props) => {
    return <div className={style['card']}>
        <h4 className={style['title']}>{props.children}</h4>
    </div>


}

export default Card