import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

//helper
import { ukApiHelper } from "../../helper/apiHelper";
import { jwtDecode } from "../../helper/jwtHelper";

// reactstrap
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, } from "reactstrap";

// components
import Img from "../Common/image";

// scss
import headerCss from "./header.scss";

function Header() {

  let data = [
    { url: "/how-it-works", link: "How it Works" },
    { url: "/about-us", link: "About us" },
    {
      url: "/services",
      link: "Services",
      ismore: true,
      subLink: [
        // { link: "Custom Essay", url: "/custom-essay" },
        // { link: "Research Paper", url: "/research-paper-writing-services" },
        // { link: "Case Study", url: "/case-study-writing" },
        // { link: "Course Work", url: "/coursework-writing-services" },
        // { link: "Assignment", url: "/assignment-writing-service" },
        // { link: "Dissertation", url: "/dissertation-help" },
        // { link: "Write My Essay", url: "/" },
        // { link: "Research Summary", url: "/" },
        // { link: "Math Problems", url: "/" },
        // { link: "Book Report/Review", url: "/" },
        // { link: "Movie Review", url: "/" },
        // { link: "Lab Report", url: "/" },
        // { link: "PowerPoint", url: "/" },
        // { link: "Admission Essay", url: "/" },
        // { link: "Cover Letter", url: "/" },
        // { link: "CV Writing", url: "/" },
        // { link: "CV Editing", url: "/" },
        // { link: "Article Review", url: "/" },
        // { link: "Report", url: "/" },
        // { link: "Thesis", url: "/" },
        // { link: "Thesis Proposal", url: "/" },
        // { link: "Outline", url: "/" },
        // { link: "Blog Writing", url: "/" },
        // { link: "All Services", url: "/services", className: "btn secondary-btn" },
      ],
    },
    { url: "/reviews", link: "Reviews" },
    { url: "/articles", link: "Blog" },
    { url: "/price", link: "Pricing" },
    {
      link: "More..",
      ismore: true,
      subLink: [
        { link: "Top Writer", url: "/top-writers" },
        { link: "Contact Us", url: "/contact-us" },
      ],
    },
  ];

  const [isLogin, setIsLogin] = useState(false);
  const [linkData, setLinkData] = useState([]);
  const [menuData, setMenuData] = useState([]);

  // get route
  const router = useRouter();

  useEffect(() => {
    setActiveLink();
    getSubMenu()
  }, []);


  useEffect(() => {
    if (menuData && menuData.length > 0) {
      setActiveLink();
    }
  }, [menuData]);

  const setActiveLink = () => {
    let cur_route = router.pathname;
    let c_data = menuData;
    let cRoute = c_data.find((element) => element.url === cur_route);
    if (cRoute) {
      cRoute.isActive = true;
    } else {
      let i = 0;
      c_data.forEach((element) => {
        if (c_data[i].subLink) {
          if (c_data[i].url === cur_route) {
            c_data[i].isActive = true;
          }
          let c_route = c_data[i].subLink.find((e1) => e1.url === cur_route);
          if (c_route) {
            c_data[i].isActive = true;
          }
        }
        i++;
      });
    }
    setLinkData(c_data);
  }

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      const item = JSON.parse(user);
      const now = new Date();
      var decodeToken = item ? jwtDecode(item.value) : null
      if (decodeToken && decodeToken.exp && (decodeToken.exp * 1000) >= now.getTime() && now.getTime() <= item.expiry) {
        setIsLogin(true);
      } else {
        localStorage.removeItem("token");
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
    }
  });
  // navbar toggle
  const [isOpen, setIsOpen] = useState(false);

  // header sidebar
  const toggle = () => {
    document.body.classList.add("headerSidebar-open");
    setIsOpen(true);
  };

  const toggleClose = () => {
    document.body.classList.remove("headerSidebar-open");
    setIsOpen(false);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, (event) => toggleClose());

  const getSubMenu = async () => {

    ukApiHelper("subMenu", "GET", null, null)
      .then((res) => {
        if (res.data.status) {

          var submenu = [];
          (res.data.data).map((info) => {
            submenu.push({
              link: info.display_text, url: "/" + info.file_name
            })
          })

          var menuList = data;
          menuList.some(function (obj) {
            if (obj.url && obj.url === '/services') {
              //change the value here
              obj.subLink = submenu;
              obj.subLink.push({ link: "All Services", url: "/services", className: "btn secondary-btn" })
              return true;    //breaks out of he loop
            }
          });

          setMenuData(menuList)
        } else {
          setMenuData(data)
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerCss }}></style>
      {/* Navbar */}
      <div className="top-navbar navbar-header">
        <Navbar expand="md">
          <div className="container">
            <NavbarBrand
              href={process.env.hostBaseUrl}
              onClick={
                router.pathname === "/" ? (e) => e.preventDefault() : null
              }
            >
              <Img src="/logo.svg" alt="logo" height="64" width="205" />
            </NavbarBrand>
            {isLogin ? (
              <NavLink
                href={`${process.env.hostBaseUrl}/logout`}
                className="btn secondary-btn d-block d-lg-none"
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                href={`${process.env.hostBaseUrl}/login`}
                className="btn secondary-btn d-block d-lg-none"
              >
                Login
              </NavLink>
            )}
            <Collapse isOpen={isOpen} navbar className="d-md-none d-lg-block">
              <Nav className="m-auto" navbar>
                {linkData &&
                  linkData.map(function (item, link) {
                    return (
                      <NavItem key={link}>
                        {item.ismore ? (
                          <>
                            <UncontrolledDropdown>
                              <DropdownToggle>
                                <NavLink
                                  href={
                                    item.url
                                      ? `${process.env.hostBaseUrl}${item.url}`
                                      : "#"
                                  }
                                  className={
                                    item.isActive ? "active" : ""
                                  }
                                >
                                  {item.link}
                                </NavLink>
                              </DropdownToggle>
                              <DropdownMenu>
                                {item.subLink &&
                                  item.subLink.map(function (subitem, list) {
                                    return (
                                      <DropdownItem key={list}>
                                        <NavLink
                                          href={`${process.env.hostBaseUrl}${subitem.url}`}
                                          className={subitem.className}
                                        >
                                          {subitem.link}
                                        </NavLink>
                                      </DropdownItem>
                                    );
                                  })}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </>
                        ) : (
                          <NavLink
                            className={item.isActive ? "active" : ""}
                            href={`${process.env.hostBaseUrl}${item.url}`}
                          >
                            {item.link}
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
              <form className="d-flex header-button">
                <a
                  href={`${process.env.hostBaseUrl}/order`}
                  className="btn theme-btn"
                >
                  Order Now
                </a>
                {isLogin ? (
                  <a
                    href={`${process.env.hostBaseUrl}/logout`}
                    className="btn secondary-btn d-none d-lg-block"
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    href={`${process.env.hostBaseUrl}/login`}
                    className="btn secondary-btn d-none d-lg-block"
                  >
                    Login
                  </a>
                )}
              </form>
            </Collapse>
          </div>
        </Navbar>
      </div>
      <NavbarToggler onClick={toggle} className="d-lg-none d-md-block">
        <div className="navbar-toggler-icon open">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M1.25 9H17.75"
                stroke="#212121"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.25 2.25H17.75"
                stroke="#212121"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.25 15.75H8.75"
                stroke="#212121"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </NavbarToggler>
      {isOpen ? (
        <div className="sidebarOverlay">
          <div ref={wrapperRef}>
            <Collapse isOpen={isOpen} navbar className="d-lg-none d-md-block">
              <Nav className="m-auto" navbar>
                {menuData &&
                  menuData.map(function (item, link) {
                    return (
                      <NavItem key={link}>
                        {item.ismore ? (
                          <>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className={
                                  item.isActive ? "active" : ""
                                }
                              >
                                <NavLink
                                  href={
                                    item.url
                                      ? `${process.env.hostBaseUrl}${item.url}`
                                      : "#"
                                  }
                                >
                                  {item.link}
                                </NavLink>
                              </DropdownToggle>
                              <DropdownMenu>
                                {item.subLink && item.subLink.length > 0 ?
                                  item.subLink.map(function (subitem, list) {
                                    return (
                                      <DropdownItem key={list}>
                                        <NavLink
                                          href={`${process.env.hostBaseUrl}${subitem.url}`}
                                        >
                                          {subitem.link}
                                        </NavLink>
                                      </DropdownItem>
                                    );
                                  }) :
                                  null}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </>
                        ) : (
                          <NavLink
                            className={item.isActive ? "active" : ""}
                            href={`${process.env.hostBaseUrl}${item.url}`}
                          >
                            {item.link}
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
              <form className="d-flex header-button">
                <a
                  href={`${process.env.hostBaseUrl}/order`}
                  className="btn theme-btn"
                >
                  Order Now
                </a>
                {isLogin ? (
                  <a
                    href={`${process.env.hostBaseUrl}/logout`}
                    className="btn secondary-btn d-none d-lg-block"
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    href={`${process.env.hostBaseUrl}/login`}
                    className="btn secondary-btn d-none d-lg-block"
                  >
                    Login
                  </a>
                )}
              </form>
            </Collapse>
          </div>
          <div className="navbar-toggler-icon close">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.4895 1.98975L13.4895 13.9897"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.6567 2L7.99988 7.65685"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.65649 14L7.65649 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Header;

function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
