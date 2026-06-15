import PageLayout from "@components/layout/PageLayout";
import CompanyLogo from "@assets/logo.png";
import Avatar from "@assets/avatar.png";
import React, { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import { useStore } from "@store";
import ProfileInfo from "./ProfileInfo";

type MenuItem = {
    label: string;
    icon: React.ComponentProps<typeof Icon>["icon"];
    path?: string;
    danger?: boolean;
};

type NavItem = {
    label: string;
    icon: React.ComponentProps<typeof Icon>["icon"];
    path: string;
    active?: boolean;
};

const accountMenu: MenuItem[] = [
    { label: "Thông tin tài khoản", icon: "zi-user" },
    { label: "Điểm tích lũy", icon: "zi-star" },
    { label: "Lịch sử đồng bộ", icon: "zi-refresh" },
    { label: "Lịch sử xem bài viết", icon: "zi-clock-1", path: "/news" },
    { label: "Lịch sử đặt chỗ sự kiện", icon: "zi-calendar" },
    {
        label: "Lịch sử phản ánh / khiếu nại",
        icon: "zi-file",
        path: "/feedbacks",
    },
    { label: "Jobs đã ứng tuyển", icon: "zi-more-grid", path: "/jobs" },
    { label: "Đăng ký nhận việc", icon: "zi-notif" },
    { label: "Hồ sơ tìm việc", icon: "zi-search" },
    { label: "Chính sách bảo mật", icon: "zi-warning" },
    { label: "Liên hệ chính quyền", icon: "zi-call" },
    { label: "Đăng xuất", icon: "zi-arrow-right", danger: true },
];

const navItems: NavItem[] = [
    { label: "Trang chủ", icon: "zi-home", path: "/" },
    { label: "Tin tức", icon: "zi-note", path: "/news" },
    { label: "Cộng đồng", icon: "zi-chat", path: "/feedbacks" },
    { label: "Thông báo", icon: "zi-notif", path: "/notifications" },
    { label: "Tài khoản", icon: "zi-user", path: "/profile", active: true },
];

const ICON_SIZE = {
    header: 27,
    menu: 25,
    nav: 23,
    floating: 27,
} as const;

const AccountPage = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    padding: 112px 0 104px;

    background: radial-gradient(
            circle at 28px 130px,
            rgba(0, 87, 160, 0.12),
            transparent 150px
        ),
        linear-gradient(180deg, #eef7ff 0, #f7fbff 258px, #f5f7fb 100%);

    color: #172033;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;
`;

const AccountHeader = styled.header`
    position: fixed;
    inset: 0 auto auto 50%;
    transform: translateX(-50%);
    z-index: 20;

    width: min(100vw, 430px);
    min-height: 96px;
    padding: calc(16px + var(--zaui-safe-area-inset-top, 0px)) 14px 14px;

    display: flex;
    align-items: flex-end;
    gap: 12px;

    color: #ffffff;
    background: radial-gradient(
            circle at 18% 18%,
            rgba(77, 184, 255, 0.28),
            transparent 34%
        ),
        linear-gradient(135deg, #00325f 0%, #004b86 48%, #0067ad 100%);

    box-shadow: 0 10px 26px rgba(0, 50, 95, 0.24);
`;

const HeaderIcon = styled.div`
    width: 42px;
    height: 42px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
`;

const HeaderTitle = styled.h1`
    margin: 0 0 3px;
    font-size: calc(28px * var(--app-font-scale));
    line-height: 1.08;
    font-weight: 950;
`;

const Content = styled.main`
    padding: 24px 16px 0;
`;

const PageTitle = styled.h2`
    margin: 0 2px 22px;
    color: #172033;
    font-size: calc(30px * var(--app-font-scale));
    line-height: 1.08;
    font-weight: 950;
`;

const ProfileCard = styled.button`
    width: 100%;
    min-height: 92px;
    border: 1px solid rgba(0, 95, 168, 0.08);
    border-radius: 24px;
    padding: 16px 18px;
    display: grid;
    grid-template-columns: 66px 1fr 24px;
    gap: 14px;
    align-items: center;
    text-align: left;
    color: #172033;
    background: radial-gradient(
            circle at 86% 18%,
            rgba(0, 139, 210, 0.1),
            transparent 38%
        ),
        #ffffff;
    box-shadow: 0 16px 34px rgba(30, 35, 50, 0.11);
`;

const AvatarImage = styled.img`
    width: 58px;
    height: 58px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 8px 18px rgba(0, 75, 134, 0.16);
`;

const ProfileName = styled.div`
    font-size: calc(22px * var(--app-font-scale));
    line-height: 1.1;
    font-weight: 950;
`;

const Points = styled.div`
    margin-top: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #667085;
    font-size: calc(18px * var(--app-font-scale));
    line-height: 1.2;
    font-weight: 650;

    .zaui-icon {
        color: #008bd2;
    }
`;

const MenuList = styled.div`
    display: grid;
    gap: 14px;
    margin-top: 16px;
`;

const MenuButton = styled.button<{ $danger?: boolean }>`
    width: 100%;
    min-height: 76px;
    border: 1px solid
        ${({ $danger }) =>
            $danger ? "rgba(180, 35, 24, 0.12)" : "rgba(0, 95, 168, 0.08)"};
    border-radius: 22px;
    padding: 13px 17px;
    display: grid;
    grid-template-columns: 52px 1fr 22px;
    gap: 14px;
    align-items: center;
    text-align: left;
    color: ${({ $danger }) => ($danger ? "#b42318" : "#172033")};
    background: ${({ $danger }) => ($danger ? "#fff2f0" : "#ffffff")};
    box-shadow: 0 14px 30px rgba(30, 35, 50, 0.09);

    &:active {
        transform: scale(0.985);
    }
`;

const MenuIcon = styled.span<{ $danger?: boolean }>`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: ${({ $danger }) => ($danger ? "#d92d20" : "#0063a7")};
    background: ${({ $danger }) =>
        $danger ? "rgba(255, 218, 214, 0.82)" : "rgba(230, 247, 255, 0.94)"};
`;

const MenuLabel = styled.span`
    min-width: 0;
    font-size: calc(21px * var(--app-font-scale));
    line-height: 1.22;
    font-weight: 900;
`;

const Chevron = styled.span`
    display: grid;
    place-items: center;
    color: #98a2b3;
`;

const FloatingActions = styled.div`
    position: fixed;
    right: max(16px, calc((100vw - 430px) / 2 + 16px));
    bottom: calc(96px + var(--zaui-safe-area-inset-bottom, 0px));
    z-index: 21;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const FloatingButton = styled.button`
    width: 58px;
    height: 58px;
    border: 0;
    border-radius: 999px;
    display: grid;
    place-items: center;
    color: #ffffff;
    background: linear-gradient(135deg, #005b9f, #008bd2);
    box-shadow: 0 14px 26px rgba(0, 91, 159, 0.28);
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
    top: -30px;
    transform: translateX(-50%);
    z-index: 3;

    width: 94px;
    height: 16px;
    display: grid;
    place-items: center;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid rgba(0, 83, 145, 0.08);
    border-bottom: 0;
    border-radius: 18px 18px 0 0;
    box-shadow: 0 -5px 14px rgba(0, 75, 134, 0.1);

    &::after {
        content: "";
        position: absolute;
        left: -1px;
        right: -1px;
        bottom: -16px;
        height: 18px;
        background: rgba(255, 255, 255, 0.94);
    }
`;

const BottomNavLogoImage = styled.img`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    opacity: 0.86;
`;

const NavButton = styled.button<{ $active?: boolean }>`
    position: relative;
    border: 0;
    background: ${({ $active }) =>
        $active ? "rgba(0, 99, 167, 0.1)" : "transparent"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: ${({ $active }) => ($active ? "#0063a7" : "#98a2b3")};
    font-size: calc(11px * var(--app-font-scale));
    line-height: 1.15;
    font-weight: ${({ $active }) => ($active ? 800 : 550)};
    transition: color 160ms ease, transform 160ms ease;

    &:active {
        transform: scale(0.94);
    }

    &:nth-of-type(3) {
        justify-content: flex-end;
        padding-bottom: 10px;
    }

    &:nth-of-type(3) svg {
        display: none;
    }
`;

const AccountMenuPage: FC = () => {
    const navigate = useNavigate();

    const handleMenuClick = (item: MenuItem) => {
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <AccountPage id="profile-page">
            <AccountHeader>
                <HeaderIcon>
                    <Icon icon="zi-user" size={ICON_SIZE.header} />
                </HeaderIcon>
                <HeaderTitle>Tài khoản</HeaderTitle>
            </AccountHeader>

            <Content>
                <PageTitle>Menu tài khoản</PageTitle>

                <ProfileCard type="button">
                    <AvatarImage src={Avatar} alt="Ảnh đại diện" />
                    <div>
                        <ProfileName>Danh</ProfileName>
                        <Points>
                            <Icon icon="zi-star" size={18} />
                            100 điểm
                        </Points>
                    </div>
                    <Chevron>
                        <Icon icon="zi-chevron-right" size={24} />
                    </Chevron>
                </ProfileCard>

                <MenuList>
                    {accountMenu.map(item => (
                        <MenuButton
                            key={item.label}
                            type="button"
                            $danger={item.danger}
                            onClick={() => handleMenuClick(item)}
                        >
                            <MenuIcon $danger={item.danger}>
                                <Icon icon={item.icon} size={ICON_SIZE.menu} />
                            </MenuIcon>
                            <MenuLabel>{item.label}</MenuLabel>
                            {!item.danger && (
                                <Chevron>
                                    <Icon icon="zi-chevron-right" size={24} />
                                </Chevron>
                            )}
                        </MenuButton>
                    ))}
                </MenuList>
            </Content>

            <FloatingActions>
                <FloatingButton type="button" aria-label="Mở rộng">
                    <Icon icon="zi-arrow-up" size={ICON_SIZE.floating} />
                </FloatingButton>
                <FloatingButton type="button" aria-label="Trò chuyện">
                    <Icon icon="zi-chat" size={ICON_SIZE.floating} />
                </FloatingButton>
            </FloatingActions>

            <BottomNav>
                <BottomNavLogo aria-label="Logo công ty">
                    <BottomNavLogoImage src={CompanyLogo} alt="Logo công ty" />
                </BottomNavLogo>

                {navItems.map(item => (
                    <NavButton
                        key={item.label}
                        type="button"
                        $active={item.active}
                        onClick={() => navigate(item.path)}
                    >
                        <Icon icon={item.icon} size={ICON_SIZE.nav} />
                        <span>{item.label}</span>
                    </NavButton>
                ))}
            </BottomNav>
        </AccountPage>
    );
};

const ProfilePage: FC = () => {
    const { profile, getProfile } = useStore();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (id) {
            getProfile({ id });
        }
    }, [getProfile, id]);

    if (!id) {
        return <AccountMenuPage />;
    }

    return (
        <PageLayout bg="white" title="Chi tiết hồ sơ">
            {profile && <ProfileInfo profile={profile} />}
        </PageLayout>
    );
};

export default ProfilePage;
