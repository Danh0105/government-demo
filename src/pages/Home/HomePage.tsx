import React from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import Background from "@assets/background.png";
import HeaderBackground from "@assets/header-background.png";
import Thumb from "@assets/thumb.png";
import FeedbackThumb from "@assets/feedback-thumb.png";
import Youtube from "@assets/youtube.png";
import SocialInsurance from "@assets/social-insurance.png";
import CompanyLogo from "@assets/logo.png";

type FeatureItem = {
    label: string;
    icon: React.ComponentProps<typeof Icon>["icon"];
    path?: string;
};

type Section = {
    title: string;
    more?: string;
    items: FeatureItem[];
};

type NavItem = FeatureItem & {
    active?: boolean;
    path?: string;
};

const featureSections: Section[] = [
    {
        title: "Hành chính công",
        more: "Xem thêm",
        items: [
            { label: "Tin tức", icon: "zi-note", path: "/news" },
            { label: "Văn bản", icon: "zi-file", path: "/legal-documents" },
            {
                label: "Dịch vụ công",
                icon: "zi-home",
                path: "/public-services",
            },
            {
                label: "Phản ánh người dân ",
                icon: "zi-chat",
                path: "/feedbacks",
            },
        ],
    },
    {
        title: "Kinh tế số",
        more: "Xem thêm",
        items: [
            { label: "OCOP", icon: "zi-star", path: "/ocop" },
            { label: "Thông tin tuyển dụng", icon: "zi-search", path: "/jobs" },
            {
                label: "Khu công nghiệp",
                icon: "zi-home",
                path: "/industrial-zones",
            },
            { label: "Doanh nghiệp", icon: "zi-user", path: "/businesses" },
        ],
    },
    {
        title: "Du lịch số",
        more: "Xem thêm",
        items: [
            { label: "Du lịch", icon: "zi-location", path: "/destinations" },
            { label: "Nhà hàng", icon: "zi-more-grid", path: "/restaurants" },
            { label: "Khách sạn", icon: "zi-home", path: "/hotels" },
            { label: "Di chuyển", icon: "zi-call", path: "/transport" },
        ],
    },
    {
        title: "Thông tin số ",
        more: "Xem thêm",
        items: [
            {
                label: "Tra phạt nguội",
                icon: "zi-search",
                path: "/traffic-fines",
            },
            { label: "Truyền hình", icon: "zi-video", path: "/television" },
        ],
    },
];

const galleryItems = [
    { title: "Ảnh đẹp Thiệu Hóa", count: "19 ảnh", image: Background },
    { title: "Ẩm thực địa phương", count: "9 ảnh", image: Thumb },
    { title: "Sản vật quê hương", count: "8 ảnh", image: SocialInsurance },
];

const eventItems = [
    {
        title: "LỊCH THI ĐẤU - KÊNH XEM TẠI VIỆT NAM - FIFA World Cup",
        date: "2026-06-11",
        place: "Canada, Mexico, Hoa Kỳ",
        image: HeaderBackground,
    },
    {
        title: "Chào mừng Ngày Quốc khánh 2/9",
        date: "2026-08-31",
        place: "Khu dân cư, trung tâm xã",
        image: FeedbackThumb,
    },
];

const policyItems = [
    "Triển khai thực hiện Nghị định số 163/2026/NĐ-CP...",
    "Giao tham mưu giải quyết đề nghị của UBND phường Đông...",
];

const navItems: NavItem[] = [
    {
        label: "Trang chủ",
        icon: "zi-home",
        active: true,
        path: "/",
    },
    {
        label: "Tin tức",
        icon: "zi-note",
        path: "/news",
    },
    {
        label: "Cộng đồng",
        icon: "zi-chat",
        path: "/feedbacks",
    },
    {
        label: "Thông báo",
        icon: "zi-notif",
        path: "/notifications",
    },
    {
        label: "Tài khoản",
        icon: "zi-user",
        path: "/profile",
    },
];

const StyledPage = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    padding: 112px 0 96px;

    background: radial-gradient(
            circle at 24px 140px,
            rgba(0, 87, 160, 0.12),
            transparent 150px
        ),
        linear-gradient(180deg, #eef7ff 0, #f7fbff 260px, #f5f7fb 100%);

    color: #172033;

    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;

    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

const AppHeader = styled.header`
    position: fixed;
    inset: 0 auto auto 50%;
    transform: translateX(-50%);
    z-index: 10;

    width: min(100vw, 430px);
    min-height: 112px;
    padding: calc(14px + var(--zaui-safe-area-inset-top, 0px)) 14px 14px;

    display: flex;
    align-items: flex-end;
    gap: 11px;

    color: #ffffff;
    background: radial-gradient(
            circle at 18% 18%,
            rgba(77, 184, 255, 0.28),
            transparent 34%
        ),
        linear-gradient(135deg, #00325f 0%, #004b86 48%, #0067ad 100%);

    box-shadow: 0 10px 26px rgba(0, 50, 95, 0.24);
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
`;

const HeaderLogo = styled.div`
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    margin-bottom: 8px;
    border-radius: 50%;
    background: radial-gradient(
            circle at 50% 62%,
            #f7cf48 0 12%,
            transparent 13%
        ),
        radial-gradient(circle at 50% 42%, #f7cf48 0 10%, transparent 11%),
        radial-gradient(
            circle at center,
            #9f0614 0 57%,
            #f2ca66 58% 66%,
            transparent 67%
        );
    border: 2px solid #f7cf48;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
        0 10px 18px rgba(66, 2, 8, 0.28);
    position: relative;

    &::before {
        content: "★";
        position: absolute;
        inset: 2px 0 auto;
        text-align: center;
        color: #f7cf48;
        font-size: 15px;
        line-height: 1;
    }

    &::after {
        content: "";
        position: absolute;
        left: 9px;
        right: 9px;
        bottom: 7px;
        height: 9px;
        border: 2px solid #f7cf48;
        border-top: 0;
        border-radius: 0 0 10px 10px;
    }
`;

const HeaderText = styled.div`
    flex: 1;
    min-width: 0;
`;

const HeaderTitle = styled.div`
    font-size: 20px;
    line-height: 1.15;
    font-weight: 800;
    letter-spacing: 0.2px;
    white-space: nowrap;
`;

const HeaderSubTitle = styled.div`
    margin-top: 5px;

    font-size: 13px;
    line-height: 1.3;
    font-weight: 500;

    color: rgba(255, 255, 255, 0.78);
    white-space: nowrap;
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0;
    transform: translateY(10px);
`;

const SquareButton = styled.button`
    width: 40px;
    height: 40px;

    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 13px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;

    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(8px);

    transition: transform 160ms ease, background 160ms ease;

    &:active {
        transform: scale(0.94);
        background: rgba(255, 255, 255, 0.22);
    }
`;

const Content = styled.main`
    overflow: hidden;
`;

const Hero = styled.section`
    position: relative;
    overflow: hidden;

    width: auto;
    min-height: 210px;
    height: clamp(220px, 58vw, 270px);

    margin: clamp(10px, 3vw, 14px) clamp(10px, 3vw, 12px) 10px;
    border-radius: clamp(18px, 5vw, 24px);

    background: linear-gradient(
            110deg,
            rgba(0, 42, 82, 0.96) 0%,
            rgba(0, 79, 142, 0.84) 48%,
            rgba(0, 145, 210, 0.5) 100%
        ),
        url(${HeaderBackground});

    background-size: cover;
    background-position: center;

    box-shadow: 0 16px 30px rgba(0, 75, 134, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.18);

    &::after {
        content: "";
        position: absolute;
        inset: 0;

        background: linear-gradient(
            180deg,
            rgba(0, 36, 68, 0.04) 0%,
            rgba(0, 36, 68, 0.08) 48%,
            rgba(0, 36, 68, 0.5) 100%
        );

        pointer-events: none;
    }

    @media (max-width: 360px) {
        min-height: 208px;
        height: 220px;
        border-radius: 18px;

        background-position: center;
    }

    @media (min-width: 431px) {
        height: 270px;
        margin-left: 14px;
        margin-right: 14px;
    }
`;

const HeroInner = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;

    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(68px, 22vw, 98px);
    align-items: center;
    gap: clamp(8px, 2vw, 14px);

    padding: clamp(14px, 4vw, 22px) clamp(14px, 4vw, 18px);
`;

const HeroCopy = styled.div`
    text-align: left;
    color: #ffffff;
    text-shadow: 0 8px 20px rgba(49, 5, 10, 0.35);
`;

const Script = styled.div`
    color: #ffe08a;

    font-size: clamp(20px, 5.8vw, 27px);
    line-height: 1.15;
    font-weight: 750;
    font-style: italic;
`;

const HeroTitle = styled.div`
    margin-top: 7px;

    color: #ffffff;

    font-size: clamp(20px, 6vw, 28px);
    line-height: 1.08;
    font-weight: 850;
    letter-spacing: -0.3px;
`;

const HeroMeta = styled.div`
    width: fit-content;
    max-width: 100%;
    margin-top: clamp(10px, 3vw, 14px);
    padding: 5px 10px;

    border-radius: 999px;

    color: #00558f;
    background: rgba(230, 247, 255, 0.92);

    font-size: clamp(10px, 3vw, 12px);
    line-height: 1.2;
    font-weight: 700;

    white-space: nowrap;
`;

const PhonePreview = styled.div`
    width: clamp(66px, 21vw, 88px);
    height: clamp(130px, 39vw, 166px);

    overflow: hidden;

    border: clamp(5px, 1.5vw, 7px) solid #171719;
    border-radius: clamp(18px, 5vw, 24px);

    background: #ffffff;

    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.28);
`;

const PhoneTop = styled.div`
    height: 32px;
    background: linear-gradient(135deg, #870713, #d90d22);
`;

const PhoneImage = styled.div`
    height: 58px;
    background: url(${Background}) center/cover;
`;

const PhoneGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 10px;
`;

const PhoneDot = styled.div`
    aspect-ratio: 1;
    border-radius: 999px;
    background: #a25b32;
`;

const Dots = styled.div`
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Dot = styled.div<{ $active?: boolean }>`
    width: ${({ $active }) => ($active ? "32px" : "8px")};
    height: 8px;
    border-radius: 999px;
    background: ${({ $active }) =>
        $active ? "#ffffff" : "rgba(255,255,255,0.42)"};
`;

const SectionBlock = styled.section`
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.85);
    border-radius: 22px;
    margin: 12px;
    padding: 22px 14px 6px;
    box-shadow: 0 14px 30px rgba(30, 35, 50, 0.07);
`;

const SectionHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
`;

const SectionTitle = styled.h2`
    margin: 0;
    font-size: 25px;
    line-height: 1.1;
    font-weight: 1000;
    color: #172033;
`;

const MoreLink = styled.button`
    border: 0;
    background: transparent;
    color: #b50b1b;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 16px;
    font-weight: 850;
    white-space: nowrap;
`;

const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
`;

const FeatureButton = styled.button`
    min-width: 0;
    padding: 2px 2px 12px;

    border: 0;
    border-radius: 14px;
    background: transparent;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;

    color: #26364d;

    transition: transform 160ms ease, background 160ms ease;

    &:active {
        transform: scale(0.95);
        background: rgba(0, 91, 160, 0.06);
    }
`;

const Medallion = styled.div`
    width: 52px;
    height: 52px;

    border: 1px solid rgba(0, 95, 168, 0.1);
    border-radius: 17px;

    display: grid;
    place-items: center;

    color: #0063a7;
    background: linear-gradient(145deg, #f7fcff, #e4f3ff);

    box-shadow: 0 8px 18px rgba(0, 86, 153, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);

    transition: transform 180ms ease, box-shadow 180ms ease;

    ${FeatureButton}:active & {
        transform: translateY(1px);
        box-shadow: 0 4px 10px rgba(0, 86, 153, 0.1);
    }
`;

const FeatureLabel = styled.span`
    min-height: 32px;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    color: #344054;

    font-size: 13px;
    line-height: 1.25;
    font-weight: 650;
    letter-spacing: -0.05px;

    text-align: center;
    overflow-wrap: anywhere;
`;

const BannerStrip = styled.div`
    height: 78px;
    margin: 12px;
    padding: 0 22px;

    display: flex;
    align-items: center;

    border-radius: 20px;

    background: linear-gradient(
            105deg,
            rgba(0, 50, 95, 0.96),
            rgba(0, 75, 134, 0.92) 55%,
            rgba(0, 132, 207, 0.82)
        ),
        url(${Background});

    background-size: cover;
    background-position: center;

    color: #ffffff;

    font-size: 19px;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: 0.3px;
    text-transform: uppercase;

    box-shadow: 0 14px 26px rgba(0, 75, 134, 0.2);
`;

const DestinationCard = styled.article`
    margin: 0 12px 18px;
    border-radius: 24px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 18px 34px rgba(30, 35, 50, 0.12);
`;

const DestinationImage = styled.div`
    position: relative;
    height: 246px;
    background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.1),
            rgba(23, 32, 51, 0.12)
        ),
        url(${Background}) center/cover;
`;

const Badge = styled.span`
    position: absolute;
    top: 18px;
    left: 18px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.86);
    padding: 8px 14px;
    font-size: 14px;
    font-weight: 800;
    color: #475467;
`;

const DestinationBody = styled.div`
    padding: 18px;
`;

const CardTitle = styled.h3`
    margin: 0;

    color: #182230;

    font-size: 19px;
    line-height: 1.35;
    font-weight: 750;
    letter-spacing: -0.15px;
`;

const MetaLine = styled.div`
    margin-top: 10px;

    display: flex;
    align-items: center;
    gap: 7px;

    color: #667085;

    font-size: 14px;
    line-height: 1.4;
    font-weight: 450;
`;

const HorizontalScroller = styled.div`
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 0 12px 18px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const GalleryCard = styled.article`
    width: 154px;
    flex: 0 0 154px;
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 14px 28px rgba(30, 35, 50, 0.1);
    overflow: hidden;
    scroll-snap-align: start;
`;

const GalleryImage = styled.div<{ $image: string }>`
    height: 82px;
    margin: 10px;
    border-radius: 14px;
    background: url(${({ $image }) => $image}) center/cover;
    box-shadow: 8px 0 0 rgba(255, 255, 255, 0.9),
        14px 0 0 rgba(16, 24, 40, 0.12);
`;

const GalleryBody = styled.div`
    padding: 0 14px 16px;
`;

const GalleryTitle = styled.div`
    color: #25324b;

    font-size: 14px;
    line-height: 1.35;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const GalleryCount = styled.div`
    margin-top: 5px;

    color: #7b8494;

    font-size: 13px;
    line-height: 1.3;
    font-weight: 500;
`;

const EventCard = styled.article`
    width: 280px;
    flex: 0 0 280px;
    border-radius: 22px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 18px 34px rgba(30, 35, 50, 0.12);
`;

const EventImage = styled.div<{ $image: string }>`
    height: 150px;
    position: relative;
    background: url(${({ $image }) => $image}) center/cover;
`;

const Status = styled.span`
    position: absolute;
    left: 16px;
    bottom: 16px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.62);
    color: #ffffff;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 900;
    backdrop-filter: blur(4px);
`;

const EventBody = styled.div`
    padding: 18px;
`;

const EventTitle = styled.h3`
    margin: 0 0 12px;

    color: #1d2939;

    font-size: 16px;
    line-height: 1.4;
    font-weight: 720;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const PolicyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 0 12px 22px;
`;

const PolicyCard = styled.article`
    border-radius: 20px;
    background: #ffffff;
    padding: 24px 18px 18px;
    min-height: 172px;
    box-shadow: 0 16px 30px rgba(30, 35, 50, 0.1);
`;

const PolicyIcon = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: #b77413;
    background: linear-gradient(135deg, #fff9eb, #fff0cc);
    margin-bottom: 18px;
`;

const PolicyTitle = styled.div`
    color: #27364b;

    font-size: 15px;
    line-height: 1.45;
    font-weight: 700;
`;

const PolicyMeta = styled.div`
    margin-top: 10px;

    color: #7b8494;

    font-size: 13px;
    line-height: 1.5;
    font-weight: 450;
`;

const RadioCard = styled.article`
    margin: 0 12px 18px;
    border-radius: 22px;
    background: #ffffff;
    border: 1px solid rgba(126, 7, 18, 0.08);
    overflow: hidden;
    box-shadow: 0 18px 34px rgba(30, 35, 50, 0.1);
`;

const RadioHero = styled.div`
    height: 230px;
    background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.48)),
        url(${FeedbackThumb}) center/cover;
    position: relative;
`;

const RadioHeroTitle = styled.div`
    position: absolute;
    inset: auto 18px 20px;
    color: #ffffff;
    font-size: 20px;
    line-height: 1.25;
    font-weight: 1000;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
`;

const RadioRow = styled.div`
    display: grid;
    grid-template-columns: 58px 68px 1fr;
    gap: 12px;
    align-items: center;
    padding: 16px 18px;
    border-top: 1px solid #eef0f3;
`;

const RadioNumber = styled.div`
    color: #e20018;
    font-size: 24px;
    font-weight: 1000;
`;

const RadioThumb = styled.div`
    width: 58px;
    height: 42px;
    border-radius: 4px;
    background: url(${FeedbackThumb}) center/cover;
`;

const RadioTitle = styled.div`
    color: #26364d;

    font-size: 14px;
    line-height: 1.4;
    font-weight: 700;
`;

const RadioDate = styled.div`
    margin-top: 6px;

    color: #7b8494;

    font-size: 12px;
    line-height: 1.35;
    font-weight: 500;
`;

const BoardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    padding: 0 12px 28px;
`;

const BoardImage = styled.div<{ $image: string }>`
    height: 134px;
    border-radius: 18px;
    background: url(${({ $image }) => $image}) center/cover;
    box-shadow: 0 16px 28px rgba(30, 35, 50, 0.12);
`;

const FloatingActions = styled.div`
    position: fixed;
    right: max(14px, calc((100vw - 430px) / 2 + 14px));
    bottom: calc(104px + var(--zaui-safe-area-inset-bottom, 0px));
    z-index: 30;

    display: flex;
    align-items: center;
    gap: 7px;
`;
const AssistantLabel = styled.span`
    padding: 7px 11px;

    border: 1px solid rgba(0, 99, 167, 0.12);
    border-radius: 999px;

    color: #005b9f;
    background: rgba(255, 255, 255, 0.94);

    font-size: 12px;
    line-height: 1;
    font-weight: 700;

    box-shadow: 0 8px 18px rgba(30, 35, 50, 0.1);
`;
const AssistantButton = styled.button`
    position: relative;

    width: 52px;
    height: 52px;

    display: grid;
    place-items: center;

    border: 0;
    border-radius: 999px;

    color: #ffffff;
    background: linear-gradient(135deg, #005b9f, #008bd2);

    box-shadow: 0 10px 20px rgba(0, 91, 159, 0.26),
        0 0 0 4px rgba(0, 132, 207, 0.1);

    &:active {
        transform: scale(0.92);
    }
`;

const BottomNav = styled.nav`
    position: fixed;
    inset: auto auto 0 50%;
    transform: translateX(-50%);
    z-index: 20;

    width: min(100vw, 430px);
    height: calc(76px + var(--zaui-safe-area-inset-bottom, 0px));
    padding-bottom: var(--zaui-safe-area-inset-bottom, 0px);

    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));

    background: rgba(255, 255, 255, 0.97);
    border-top: 1px solid rgba(0, 83, 145, 0.08);

    box-shadow: 0 -8px 24px rgba(30, 35, 50, 0.08);
    backdrop-filter: blur(18px);
`;

const BottomNavLogo = styled.div`
    position: absolute;
    left: 50%;
    top: -38px;
    transform: translateX(-50%);
    z-index: 3;

    width: 128px;
    height: 20px;

    display: grid;
    place-items: center;

    padding: 7px 12px;

    background: rgba(255, 255, 255, 0.98);

    border: 1px solid rgba(0, 83, 145, 0.08);
    border-bottom: 0;
    border-radius: 20px 20px 0 0;

    box-shadow: 0 -6px 16px rgba(0, 75, 134, 0.12);

    &::after {
        content: "";
        position: absolute;
        left: -1px;
        right: -1px;
        bottom: -18px;

        height: 20px;

        background: rgba(255, 255, 255, 0.98);
    }
`;

const BottomNavLogoImage = styled.img`
    position: relative;
    z-index: 1;

    width: 100%;
    height: 100%;

    display: block;
    object-fit: contain;
`;
const NavButton = styled.button<{ $active?: boolean }>`
    position: relative;

    border: 0;
    background: transparent;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    color: ${({ $active }) => ($active ? "#0063a7" : "#98a2b3")};

    font-size: 11px;
    line-height: 1.15;
    font-weight: ${({ $active }) => ($active ? 700 : 550)};

    transition: color 160ms ease, transform 160ms ease;

    &:active {
        transform: scale(0.94);
    }

    /* Item giữa: Cộng đồng */
    &:nth-of-type(3) {
        justify-content: flex-end;
        padding-bottom: 10px;
    }

    &:nth-of-type(3) svg {
        display: none;
    }
`;
const ICON_SIZE = {
    header: 23,
    feature: 23,
    inline: 18,
    policy: 20,
    nav: 23,
    floating: 25,
} as const;
const HomePage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    return (
        <StyledPage id="home-page">
            <AppHeader>
                <HeaderLogo aria-label="Công dân số" />
                <HeaderText>
                    <HeaderTitle>CÔNG DÂN SỐ</HeaderTitle>
                    <HeaderSubTitle>Xã Tân Lập - Tỉnh Tây Ninh</HeaderSubTitle>
                </HeaderText>
                <HeaderActions>
                    <SquareButton aria-label="Tìm kiếm">
                        <Icon icon="zi-search" size={28} />
                    </SquareButton>
                </HeaderActions>
            </AppHeader>

            <Content>
                <Hero>
                    <HeroInner>
                        <HeroCopy>
                            <Script>Chào mừng</Script>
                            <HeroTitle>
                                QUÝ CÔNG DÂN
                                <br />
                                THAM GIA ỨNG DỤNG
                                <br />
                                CÔNG DÂN SỐ
                            </HeroTitle>
                            <HeroMeta>
                                Văn minh - Hiện đại - Phát triển
                            </HeroMeta>
                        </HeroCopy>
                        <PhonePreview>
                            <PhoneTop />
                            <PhoneImage />
                            <PhoneGrid>
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <PhoneDot key={index} />
                                ))}
                            </PhoneGrid>
                        </PhonePreview>
                    </HeroInner>
                    <Dots>
                        <Dot />
                        <Dot $active />
                    </Dots>
                </Hero>

                {featureSections.slice(0, 2).map(section => (
                    <SectionBlock key={section.title}>
                        <SectionHead>
                            <SectionTitle>{section.title}</SectionTitle>
                            <MoreLink>
                                {section.more}
                                <Icon icon="zi-chevron-right" size={22} />
                            </MoreLink>
                        </SectionHead>
                        <FeatureGrid>
                            {section.items.map(item => (
                                <FeatureButton
                                    key={item.label}
                                    onClick={() =>
                                        item.path && navigate(item.path)
                                    }
                                >
                                    <Medallion>
                                        <Icon
                                            icon={item.icon}
                                            size={ICON_SIZE.feature}
                                        />
                                    </Medallion>
                                    <FeatureLabel>{item.label}</FeatureLabel>
                                </FeatureButton>
                            ))}
                        </FeatureGrid>
                    </SectionBlock>
                ))}

                <BannerStrip>Tiện ích số </BannerStrip>

                {featureSections.slice(2).map(section => (
                    <SectionBlock key={section.title}>
                        <SectionHead>
                            <SectionTitle>{section.title}</SectionTitle>
                            <MoreLink>
                                {section.more}
                                <Icon icon="zi-chevron-right" size={22} />
                            </MoreLink>
                        </SectionHead>
                        <FeatureGrid>
                            {section.items.map(item => (
                                <FeatureButton
                                    key={item.label}
                                    onClick={() =>
                                        item.path && navigate(item.path)
                                    }
                                >
                                    <Medallion>
                                        <Icon
                                            icon={item.icon}
                                            size={ICON_SIZE.feature}
                                        />
                                    </Medallion>
                                    <FeatureLabel>{item.label}</FeatureLabel>
                                </FeatureButton>
                            ))}
                        </FeatureGrid>
                    </SectionBlock>
                ))}

                <SectionBlock>
                    <SectionHead>
                        <SectionTitle>Điểm đến du lịch</SectionTitle>
                        <MoreLink
                            onClick={() => navigate("/digital-government")}
                        >
                            Xem thêm
                            <Icon icon="zi-chevron-right" size={22} />
                        </MoreLink>
                    </SectionHead>
                </SectionBlock>
                <DestinationCard>
                    <DestinationImage>
                        <Badge>Du Lịch</Badge>
                    </DestinationImage>
                    <DestinationBody>
                        <CardTitle>Đền thờ Lê Văn Hưu</CardTitle>
                        <MetaLine>
                            <Icon icon="zi-location" size={21} />
                            Đền thờ Lê Văn Hưu
                        </MetaLine>
                    </DestinationBody>
                </DestinationCard>

                <SectionBlock>
                    <SectionHead>
                        <SectionTitle>Hình ảnh</SectionTitle>
                        <MoreLink>
                            Xem thêm
                            <Icon icon="zi-chevron-right" size={22} />
                        </MoreLink>
                    </SectionHead>
                </SectionBlock>
                <HorizontalScroller>
                    {galleryItems.map(item => (
                        <GalleryCard key={item.title}>
                            <GalleryImage $image={item.image} />
                            <GalleryBody>
                                <GalleryTitle>{item.title}</GalleryTitle>
                                <GalleryCount>{item.count}</GalleryCount>
                            </GalleryBody>
                        </GalleryCard>
                    ))}
                </HorizontalScroller>

                <SectionBlock>
                    <SectionHead>
                        <SectionTitle>Lịch sự kiện</SectionTitle>
                        <MoreLink>
                            Xem tất cả
                            <Icon icon="zi-chevron-right" size={22} />
                        </MoreLink>
                    </SectionHead>
                </SectionBlock>
                <HorizontalScroller>
                    {eventItems.map(item => (
                        <EventCard key={item.title}>
                            <EventImage $image={item.image}>
                                <Status>Sắp diễn ra</Status>
                            </EventImage>
                            <EventBody>
                                <EventTitle>{item.title}</EventTitle>
                                <MetaLine>
                                    <Icon icon="zi-calendar" size={20} />
                                    {item.date}
                                </MetaLine>
                                <MetaLine>
                                    <Icon icon="zi-location" size={20} />
                                    {item.place}
                                </MetaLine>
                                <MetaLine>
                                    <Icon icon="zi-user" size={20} />
                                    0/1000000 đã đăng ký
                                </MetaLine>
                            </EventBody>
                        </EventCard>
                    ))}
                </HorizontalScroller>

                <SectionBlock>
                    <SectionHead>
                        <SectionTitle>Văn bản chính sách</SectionTitle>
                        <MoreLink>
                            Xem tất cả
                            <Icon icon="zi-chevron-right" size={22} />
                        </MoreLink>
                    </SectionHead>
                </SectionBlock>
                <PolicyGrid>
                    {policyItems.map(item => (
                        <PolicyCard key={item}>
                            <PolicyIcon>
                                <Icon icon="zi-file" size={22} />
                            </PolicyIcon>
                            <PolicyTitle>{item}</PolicyTitle>
                            <PolicyMeta>
                                Chỉ đạo điều hành · 1049...
                                <br />
                                2026-06-03
                            </PolicyMeta>
                        </PolicyCard>
                    ))}
                </PolicyGrid>

                <RadioCard>
                    <RadioHero>
                        <RadioHeroTitle>
                            Ý nghĩa chính trị cuộc bầu cử đại biểu Quốc hội khóa
                            XVI
                        </RadioHeroTitle>
                    </RadioHero>
                    {[2, 3].map(number => (
                        <RadioRow key={number}>
                            <RadioNumber>
                                {String(number).padStart(2, "0")}
                            </RadioNumber>
                            <RadioThumb />
                            <div>
                                <RadioTitle>
                                    {number === 2
                                        ? "Chỉ thị số 28CT-TTg ngày 18-9-2025 của Thủ tướng Chính phủ"
                                        : "Hướng dẫn về tuyên truyền cuộc bầu cử đại biểu Quốc hội khóa..."}
                                </RadioTitle>
                                <RadioDate>
                                    2026-05-{number === 2 ? "09" : "10"}{" "}
                                    00:00:00
                                </RadioDate>
                            </div>
                        </RadioRow>
                    ))}
                </RadioCard>

                <SectionBlock>
                    <SectionHead>
                        <SectionTitle>Bảng điện tử</SectionTitle>
                    </SectionHead>
                </SectionBlock>
                <BoardGrid>
                    <BoardImage $image={Youtube} />
                    <BoardImage $image={Thumb} />
                </BoardGrid>
            </Content>

            <FloatingActions>
                <AssistantLabel>Trợ lý người dân</AssistantLabel>

                <AssistantButton
                    aria-label="Mở trợ lý số"
                    onClick={() => navigate("/assistant")}
                >
                    <Icon icon="zi-chat" size={27} />
                </AssistantButton>
            </FloatingActions>

            <BottomNav>
                <BottomNavLogo aria-label="Logo công ty">
                    <BottomNavLogoImage src={CompanyLogo} alt="Skill Trip X" />
                </BottomNavLogo>

                {navItems.map(item => (
                    <NavButton
                        key={item.label}
                        $active={item.active}
                        onClick={() => item.path && navigate(item.path)}
                    >
                        <Icon icon={item.icon} size={ICON_SIZE.nav} />
                        <span>{item.label}</span>
                    </NavButton>
                ))}
            </BottomNav>
        </StyledPage>
    );
};

export default HomePage;
