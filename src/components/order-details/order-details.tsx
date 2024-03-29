import styles from './order-details.module.css';
import accept from '../../images/accept-icon.png';
import { FC } from 'react';

type TOrderDetails = {
  orderNumber: number;
}

export const OrderDetails: FC<TOrderDetails> = ({orderNumber}) => {
  return (

    <div className={styles.details}>
      <h2 className={`text text_type_digits-large m-15 mb-8 ${styles.id}`}>{orderNumber}</h2>
      <h3 className='text text_type_main-medium '>Идентификатор заказа</h3>
      <img className='mt-15 mb-15' src={accept} alt='Подтверждено'/>
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-10'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
