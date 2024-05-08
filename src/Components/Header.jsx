import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    const user = localStorage.getItem('user');


    return (
        <div className="nk-header nk-header-fixed">
            <div className="container-fluid">
                <div className="nk-header-wrap">
                    <div className="nk-header-logo ms-n1">
                        <div className="nk-sidebar-toggle me-1">
                            <button className="btn btn-sm btn-zoom btn-icon sidebar-toggle d-sm-none"><em className="icon ni ni-menu"> </em></button>
                            <button className="btn btn-md btn-zoom btn-icon sidebar-toggle d-none d-sm-inline-flex"><em className="icon ni ni-menu"> </em></button>
                        </div>
                        <Link href="index-2.html" className="logo-link">
                            <div className="logo-wrap">
                                <img className="logo-img logo-light" src="images/logo.png" srcset="https://copygen.themenio.com/dashboard/images/logo2x.png 2x" alt="" />
                                <img className="logo-img logo-dark" src="images/logo-dark.png" srcset="https://copygen.themenio.com/dashboard/images/logo-dark2x.png 2x" alt="" />
                                <img className="logo-img logo-icon" src="images/logo-icon.png" srcset="https://copygen.themenio.com/dashboard/images/logo-icon2x.png 2x" alt="" />
                            </div>
                        </Link>
                    </div>
                    <div className="nk-header-tools">
                        <ul className="nk-quick-nav ms-2">
                            <li className="dropdown d-inline-flex">
                                <Link data-bs-toggle="dropdown" className="d-inline-flex" href="#">
                                    <div className="media media-md media-circle media-middle text-bg-primary">
                                        <img src="../../images/avatar/a.png" alt='profile' /></div>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-md rounded-3">
                                    <div className="dropdown-content py-3">
                                        <div className="border border-light rounded-3">
                                            <div className="px-3 py-2 bg-white border-bottom border-light rounded-top-3">
                                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                                    <h6 className="lead-text">Free Plan</h6>
                                                    <Link className="link link-primary" href="#"><em className="ni ni-spark-fill icon text-warning"></em><span>Upgrade</span></Link>
                                                </div>
                                                <div className="progress progress-md"><div className="progress-bar" data-progress="25%"></div></div>
                                                <h6 className="lead-text mt-2">1,360 <span className="text-light">words left</span></h6>
                                            </div>
                                            <Link className="d-flex px-3 py-2 bg-primary bg-opacity-10 rounded-bottom-3" href="profile.html">
                                                <div className="media-group">
                                                    <div className="media media-sm media-middle media-circle text-bg-primary">
                                                        <img src="./../../images/avatar/a.png" alt='' /></div>
                                                    <div className="media-text">
                                                        {/* <h6 className="fs-6 mb-0">{user.name}</h6> */}
                                                        <span className="text-light fs-7">shawn@websbd.com</span>
                                                    </div>
                                                    <em className="icon ni ni-chevron-right ms-auto ps-1"></em>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
