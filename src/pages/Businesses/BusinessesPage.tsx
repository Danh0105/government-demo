import React from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import Thumb from "@assets/thumb.png";
import Background from "@assets/background.png";
import SocialInsurance from "@assets/social-insurance.png";

type Business = {
    name: string;
    status: string;
    category: string;
    address: string;
    description: string;
    phone: string;
    websiteLabel: string;
    image: string;
};

const businesses: Business[] = [
    {
        name: "Công ty TNHH Thương mại Vận tải Hoàn Ngọc",
        status: "Đang hoạt động",
        category: "Doanh nghiệp",
        address:
            "Thanh Hóa - Nhà bà Lê Thị Ngọc, Tổ dân phố Hồng Phong, Phường Hải Lĩnh, Tỉnh Thanh Hóa, Việt Nam",
        description: "Chuyên cung cấp các sản phẩm liên quan về Atiso",
        phone: "02378715178",
        websiteLabel: "Website",
        image: Thumb,
    },
    {
        name: "Hộ kinh doanh Phan Minh Anh",
        status: "Đang hoạt động",
        category: "Doanh nghiệp",
        address:
            "Thanh Hóa - Tầng 1, số 4, ngõ 583 phố Kim Ngưu, Phường Vĩnh Tuy, Quận Hai Bà Trưng, Thành Phố Hà Nội, Việt Nam",
        description: "Chuyên cung cấp sản phẩm về nem chua Thanh Hoá",
        phone: "0979383123",
        websiteLabel: "Website",
        image: Background,
    },
    {
        name: "Công ty TNHH chế biến hải sản Ba Làng",
        status: "Đang hoạt động",
        category: "Doanh nghiệp",
        address:
            "Thanh Hóa - Số 05, Đường Đỗ Đại, Tổ dân phố Thượng Hải, Phường Tĩnh Gia, Tỉnh Thanh Hóa, Việt Nam",
        description: "Chuyên cung cấp đặc sản về nước mắm, mắm tép, mắm tôm.",
        phone: "02373612973",
        websiteLabel: "Website",
        image: SocialInsurance,
    },
];

const PageWrapper = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    background: #f7f5f2;
    color: #172033;
    padding: 112px 0 96px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
`;

const Header = styled.header`
    position: fixed;
    inset: 0 auto auto 50%;
    transform: translateX(-50%);
    width: min(100vw, 430px);
    z-index: 20;
    height: 96px;
    padding: 24px 14px 14px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.22),
        rgba(255, 255, 255, 0.96)
    );
    backdrop-filter: blur(14px);
`;

const Title = styled.h1`
    margin: 0;
    font-size: 24px;
    line-height: 1.1;
    font-weight: 900;
    color: #1c1f26;
`;

const Content = styled.main`
    padding: 0 14px;
`;

const BusinessList = styled.div`
    display: grid;
    gap: 16px;
`;

const BusinessCard = styled.article`
    display: flex;
    gap: 14px;
    background: #ffffff;
    border-radius: 24px;
    padding: 16px;
    box-shadow: 0 14px 30px rgba(30, 35, 50, 0.08);
    border: 1px solid rgba(226, 232, 240, 0.8);
`;

const BusinessImage = styled.div<{ $image: string }>`
    width: 82px;
    height: 110px;
    border-radius: 18px;
    background: url(${({ $image }) => $image}) center/cover;
    flex-shrink: 0;
`;

const BusinessBody = styled.div`
    flex: 1;
    display: grid;
    gap: 10px;
`;

const BusinessTop = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

const BusinessName = styled.h2`
    margin: 0;
    font-size: 18px;
    line-height: 1.35;
    font-weight: 900;
    color: #121828;
    min-width: 0;
`;

const BadgeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

const Badge = styled.span<{ $tone: "red" | "green" }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    color: ${({ $tone }) => ($tone === "red" ? "#bb1b24" : "#146c32")};
    background: ${({ $tone }) =>
        $tone === "red"
            ? "rgba(255, 226, 228, 0.92)"
            : "rgba(220, 248, 220, 0.9)"};
`;

const AddressRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
`;

const Description = styled.p`
    margin: 0;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.6;
`;

const ContactRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
`;

const Phone = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #d8162a;
    font-size: 14px;
    font-weight: 700;
`;

const Website = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #475467;
    font-size: 14px;
    font-weight: 700;
`;

const IconButton = styled.button`
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.88);
    color: #d8162a;
    box-shadow: 0 8px 22px rgba(18, 28, 45, 0.1);
`;

const BusinessesPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper id="businesses-page">
            <Header>
                <IconButton
                    aria-label="Quay lại"
                    onClick={() => navigate(-1, { direction: "backward" })}
                >
                    <Icon icon="zi-arrow-left" size={24} />
                </IconButton>
                <Title>Doanh nghiệp</Title>
                <IconButton aria-label="Đóng">
                    <Icon icon="zi-close" size={24} />
                </IconButton>
            </Header>

            <Content>
                <BusinessList>
                    {businesses.map(item => (
                        <BusinessCard key={item.name}>
                            <BusinessImage $image={item.image} />
                            <BusinessBody>
                                <BusinessTop>
                                    <BusinessName>{item.name}</BusinessName>
                                </BusinessTop>
                                <BadgeRow>
                                    <Badge $tone="red">{item.category}</Badge>
                                    <Badge $tone="green">{item.status}</Badge>
                                </BadgeRow>
                                <AddressRow>
                                    <Icon icon="zi-location" size={16} />
                                    <span>{item.address}</span>
                                </AddressRow>
                                <Description>{item.description}</Description>
                                <ContactRow>
                                    <Phone>
                                        <Icon icon="zi-call" size={16} />
                                        {item.phone}
                                    </Phone>
                                    <Website>
                                        <Icon icon="zi-link" size={16} />
                                        {item.websiteLabel}
                                    </Website>
                                </ContactRow>
                            </BusinessBody>
                        </BusinessCard>
                    ))}
                </BusinessList>
            </Content>
        </PageWrapper>
    );
};

export default BusinessesPage;
