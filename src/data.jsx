import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import { RiProductHuntLine } from "react-icons/ri";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import MarkEmailUnreadTwoToneIcon from '@mui/icons-material/MarkEmailUnreadTwoTone';
import MarkChatUnreadTwoToneIcon from '@mui/icons-material/MarkChatUnreadTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import WorkOutlineTwoToneIcon from '@mui/icons-material/WorkOutlineTwoTone';
import ContactPageTwoToneIcon from '@mui/icons-material/ContactPageTwoTone';
import NewspaperTwoToneIcon from '@mui/icons-material/NewspaperTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';

export const sidebarMenu = [
    {
        title: "Home Page",
        href: "/",
        icon: <GridViewTwoToneIcon size={16} />
    },
    {
        title: "About Us",
        href: "/about-us",
        icon: <InfoTwoToneIcon size={16} />,
        // items: [
        //     { title: "Listing", href: "/about/list" },
        //     { title: "Add", href: "/about/add" },
        //     { title: "Update", href: "/about/update" }
        // ]
    },
    // {
    //     title: "Careers",
    //     href: "/careers",
    //     icon: <WorkOutlineTwoToneIcon size={16} />,
    //     // items: [
    //     //     { title: "Listing", href: "/careers/list" }
    //     // ]
    // },
    {
        title: "Contact Us",
        href: "/contact-us",
        icon: <ContactPageTwoToneIcon size={16} />,
        // items: [
        //     { title: "Listing", href: "/contact/list" },
        //     { title: "Show All", href: "/contact/show" }
        // ]
    },
    {
        title: "Recent Job Related News",
        href: "/job-news",
        icon: <NewspaperTwoToneIcon size={16} />,
        // items: [
        //     { title: "Add Article", href: "/job-news/add" },
        //     { title: "Listing", href: "/job-news/list" },
        //     { title: "Detail", href: "/job-news/detail" },
        //     { title: "Update", href: "/job-news/update" }
        // ]
    },
    {
        title: "Skill Development Program",
        href: "/skills",
        icon: <SchoolTwoToneIcon size={16} />,
        // items: [
        //     { title: "Add Article", href: "/skills/add" },
        //     { title: "Listing", href: "/skills/list" },
        //     { title: "Detail", href: "/skills/detail" },
        //     { title: "Update", href: "/skills/update" }
        // ]
    },
    {
        title: "State Gov. Certification",
        href: "/certifications",
        icon: <SchoolTwoToneIcon size={16} />,
        // items: [
        //     { title: "Add Article", href: "/certifications/add" },
        //     { title: "Listing", href: "/certifications/list" },
        //     { title: "Detail", href: "/certifications/detail" },
        //     { title: "Update", href: "/certifications/update" }
        // ]
    },
    {
        title : "Departments",
        href : "/departments",
        icon : <CategoryTwoToneIcon size={16} />,
        items : [
            { title : "Government Departments", href : "/departments/government" },
            { title : "Aided Departments", href : "/departments/aided" },
            { title : "Public Undertakings", href : "/departments/public" },
            { title: "Department User ",href: "/departments/users",}
        ]
    },
    {
        title : "Sliders",
        href : "/image-sliders",
        icon : <RiProductHuntLine size={16} />,
    },
    // {
    //     title: "External Links",
    //     href: "/external-links",
    //     icon: <LinkTwoToneIcon size={16} />,
    //     // items: [
    //     //     { title: "Add Article", href: "/external-links/add" },
    //     //     { title: "Listing", href: "/external-links/list" },
    //     //     { title: "Detail", href: "/external-links/detail" },
    //     //     { title: "Update", href: "/external-links/update" }
    //     // ]
    // },
    {
        title: "Social Media",
        href: "/social-gallery",
        icon: <ShareTwoToneIcon size={16} />
    },
    {
        title: "Feedback & Complaints",
        href: "/complaints",
        icon: <FeedbackTwoToneIcon size={16} />,
        // items: [
        //     { title: "All Feedback & Complaints", href: "/feedback/list" },
        //     { title: "Action", href: "/feedback/action" }
        // ]
    },
    {
        title: "Site Setting",
        href: "/site-setting",
        icon: <RiProductHuntLine size={16} />,
    },
    // {
    //     title: "Chatbot",
    //     href: "/chatbot",
    //     icon: <ChatTwoToneIcon size={16} />,
    //     // items: [
    //     //     { title: "AI Auto Response", href: "/chatbot/ai" },
    //     //     { title: "Client API", href: "/chatbot/api-info" }
    //     // ]
    // },
    // {
    //     title: "User",
    //     href: "/users",
    //     icon: <PeopleAltTwoToneIcon size={16} />,
    //     // items: [
    //     //     { title: "User List", href: "/users/list" },
    //     //     { title: "Add User", href: "/users/add" },
    //     //     { title: "Update User", href: "/users/update" },
    //     //     { title: "Create Profile", href: "/users/profile" },
    //     //     { title: "Access Limitation", href: "/users/access" }
    //     // ]
    // },
    {
        title: "Logout",
        href: "/login",
        icon: <LogoutTwoToneIcon size={16} />
    }
];



export const ordersData = [
    {
        orderId: "3413",
        customer: {
            avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
            name: "Dr. Ernest Fritsch-Shanahan",
            email: "august17@hotmail.com"
        },
        items:83,
        price:"457.00",
        createdAt:{
            date:"August 5, 2023",
            time:"5:01 PM"
        },
        modifiedAt:{
            date:"August 10, 2023",
            time:"3:10 PM"
        },
        status:"cancelled"
    },
     {
        orderId: "9192",
        customer: {
            avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp",
            name: "Mr. Gregory Medhurst-Lubowitz",
            email: "general.bergstrom@yahoo.com"
        },
        items:21,
        price:"657.00",
        createdAt:{
            date:"August 10, 2023",
            time:"4:21 PM"
        },
        modifiedAt:{
            date:"August 12, 2023",
            time:"1:10 PM"
        },
        status:"refunded"
    },
     {
        orderId: "4983",
        customer: {
            avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-13.webp",
            name: "Becky Goodwin",
            email: "daniella_littel@gmail.com"
        },
        items:93,
        price:"557.00",
        createdAt:{
            date:"July 29, 2023",
            time:"6:11 PM"
        },
        modifiedAt:{
            date:"August 20, 2023",
            time:"4:10 PM"
        },
        status:"cancelled"
    },
     {
        orderId: "2413",
        customer: {
            avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-12.webp",
            name: "Mrs. Ann Leuschke Jr.",
            email: "favian49@yahoo.com"
        },
        items:23,
        price:"857.00",
        createdAt:{
            date:"July 25, 2023",
            time:"8:01 PM"
        },
        modifiedAt:{
            date:"July 21, 2023",
            time:"1:22 PM"
        },
        status:"cancelled"
    },
     {
        orderId: "4849",
        customer: {
            avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp",
            name: "Elmer Heathcote",
            email: "efren.wehner@gmail.com"
        },
        items:89,
        price:"357.00",
        createdAt:{
            date:"July 18, 2023",
            time:"7:45 AM"
        },
        modifiedAt:{
            date:"August 14, 2023",
            time:"3:42 AM"
        },
        status:"completed"
    },
     {
        orderId: "5881",
        customer: {
            avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-15.webp",
            name: "Mr. Irvin Farrell",
            email: "chanel21@yahoo.com"
        },
        items:91,
        price:"263.00",
        createdAt:{
            date:"July 10, 2023",
            time:"5:01 PM"
        },
        modifiedAt:{
            date:"August 12, 2023",
            time:"11:10 PM"
        },
        status:"pending"
    },

]



export const productsData = [
    {
            image:"https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
            title:"Tasty Metal Shirt",
            cat:"Books",
            sku:"52442",
            stock:30,
            price:"410.00",
            ratings:{
                rating:"3.5",
                reviews:14
            },
            status:"pending"
    },
    {
            image:"https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
            title:"Modern Gloves",
            cat:"Kids",
            sku:"98424",
            stock:50,
            price:"770.00",
            ratings:{
                rating:"4.5",
                reviews:140
            },
            status:"publish"
    },
    {
            image:"https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
            title:"Licensed Concrete Cheese",
            cat:"Electronics",
            sku:"86229",
            stock:70,
            price:"210.00",
            ratings:{
                rating:"3.2",
                reviews:24
            },
            status:"pending"
    },
    {
            image:"https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp",
            title:"Electronic Rubber Table",
            cat:"Books",
            sku:"89762",
            stock:60,
            price:"210.00",
            ratings:{
                rating:"3.3",
                reviews:45
            },
            status:"pending"
    },
    {
            image:"https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp",
            title:"Practical Steel Keyboard",
            cat:"Kids",
            sku:"41063",
            stock:50,
            price:"310.00",
            ratings:{
                rating:"3.3",
                reviews:57
            },
            status:"publish"
    },
    {
            image:"https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
            title:"Sleek Frozen Ball",
            cat:"Electronics",
            sku:"13240",
            stock:14,
            price:"410.00",
            ratings:{
                rating:"2.5",
                reviews:75
            },
            status:"pending"
    },
    {
            image:"https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/9.webp",
            title:"Ergonomic Frozen Pants",
            cat:"Games",
            sku:"26214",
            stock:0,
            price:"410.00",
            ratings:{
                rating:"3.5",
                reviews:14
            },
            status:"publish"
    },
]