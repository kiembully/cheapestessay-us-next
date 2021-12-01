import React, { useState, useEffect } from 'react';
import Router, { useRouter } from "next/router";
import Link from 'next/link'
import { jwtDecode } from "../../../helper/jwtHelper";

import Img from '../../Common/image';

// Image
import DummyProfile from '../../../public/dummy-profile.png';
import orderCss from '../../../styles/order.scss'


const Sidebar = (props) => {

    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [userProfileImg, setUserProfileImg] = useState("");
    const [userBalance, setUserBalance] = useState(0);

    const getUserData = () => {
        const loginToken = localStorage.getItem('token');
        var convertedToken = JSON.parse(loginToken);
        if (loginToken) {
            const now = new Date();
            if (now.getTime() > convertedToken.expiry) {
                localStorage.removeItem('token');
                Router.push('/login');
            } else {
                var decodeOrder = jwtDecode(convertedToken.value);
                setUserName(decodeOrder.user_details.first_name + ' ' + decodeOrder.user_details.last_name);
                setUserProfileImg(decodeOrder.user_details.profile_pic ? decodeOrder.user_details.profile_pic : '')
                setUserBalance(decodeOrder.account.total_balance ? decodeOrder.account.total_balance : 0)
            }
        }
    }

    useEffect(() => {
        getUserData();
    }, [props.changeProfile])

    const imgNotFound = (e) => {
        e.target.src = DummyProfile;
    }

    const changePage = (link) => {
        props.toggleClose()
        router.push(`${process.env.hostBaseUrl}${link}`)
    }

    var currLink = router.pathname
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: orderCss }}></style>
            <div className={`sidebar ${props.className && props.className}`}>
                <Link href={process.env.hostBaseUrl}>
                    <a className="navbar-brand text-center d-block" >Cheapest<span>Essay</span></a>
                </Link>
                <div className="profile">
                    <img src={userProfileImg && userProfileImg === '' ? { DummyProfile } : userProfileImg} alt="Profile" onError={imgNotFound} />
                    <h5 className="name">{userName}</h5>
                </div>
                <div className="menuLinks">
                    <ul>
                        <li>
                            <a href="#" onClick={() => { changePage('/order') }} className={currLink === '/order' ? 'active' : ''}>
                                <Img src='/order/place-order.svg' alt="place-order" width="20" height="20" />
                                Place order
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => { changePage('/my-orders') }} className={currLink === '/my-orders' || currLink === '/my-orders/order-details' ? 'active' : ''}>
                                <Img src='/order/orders.svg' alt="Order" width="20" height="20" />
                                orders
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => { changePage('/balance') }} className={currLink === '/balance' ? 'active' : ''}>
                                <Img src='/order/balance.svg' alt="Balance" width="20" height="20" />
                                Balance <span className="bedge">$ {userBalance.toFixed(2)}</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => { changePage('/referral') }} className={currLink === '/referral' ? 'active' : ''}>
                                <Img src='/order/discount.svg' alt="Discount" width="20" height="20" />
                                Referral{props.discount}
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => { changePage('/level') }} className={currLink === '/level' ? 'active' : ''}>
                                <Img src='/order/level.svg' alt="Level" width="20" height="20" />
                                Level
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => { changePage('/profile') }} className={currLink === '/profile' ? 'active' : ''}>
                                <Img src='/order/profile.svg' alt="Profile" width="20" height="20" />
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => { changePage('/logout') }}>
                                <Img src='/order/logout.svg' alt="Logout" width="20" height="20" />
                                Logout
                            </a>
                        </li>
                    </ul>
                    <div className="sidebarlink">
                        <a href="https://play.google.com/store/apps/details?id=com.cheapestessay.service" className="downloadLink">
                            <Img
                                src='/order/downGoogleplay.svg'
                                alt="Android"
                                className="me-2"
                                width="20" height="20"
                            />
                            <span>Android</span>
                        </a>
                        <a href="https://apps.apple.com/us/app/cheapest-custom-writing-papers/id1447217562" className="downloadLink ms-2">
                            <Img src='/order/downApple.svg' alt="IOS" className="me-2" width="20" height="20" />
                            <span>IOS</span>
                        </a>
                    </div>
                </div>
            </div>
        </>

    );
}
export default Sidebar;