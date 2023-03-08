import OrderCard from '../order-card/order-card';
import styleProfileOrders from "./profile-orders.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from 'react';
import Modal from "../modal/modal";
import OrderDetailsInfo from '../order-details-info/order-details-info';
import { useSelector, useDispatch } from "react-redux";


const ProfileOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visibility, changeVisibility] = useState(location.state?.from === 'profile')
  const {orders, total, totalToday, } = useSelector((store) => store.wsocketUser);
  const handleCloseModal = useCallback(() => {
    changeVisibility(false)
    navigate(-1)
},[navigate])

  return (
    <>
        <div className={`${styleProfileOrders.container} pr-4`}>
            {orders.map(order => <OrderCard elementPosition={"profile"} order={order} key={order._id} />)}
        </div>
        {visibility &&
                        <Modal onClose={handleCloseModal}>
                            <div className={"mt-15 mb-15"}>
                                <OrderDetailsInfo />
                                {/* <OrderInfo orderInfo={orders.find(order => order._id === location.state.order._id)}/> */}
                            </div>
                        </Modal>
                    }
    </>
  );
};

export default ProfileOrders;
