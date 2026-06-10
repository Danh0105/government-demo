import React from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import Background from "@assets/background.png";
import Thumb from "@assets/thumb.png";

type IndustrialZone = {
    name: string;
    type: string;
    status: string;
    address: string;
    investor: string;
    area: string;
    occupancy: number;
    phone: string;
    image: string;
};

const zones: IndustrialZone[] = [
    {
        name: "KHU CÔNG NGHIỆP TÂY BẮC GIA - THANH HÓA",
        type: "Khu công nghiệp",
        status: "Đang hoạt động",
        address: "Thanh Hóa - Phường Đông Thọ, Thành phố Thanh Hóa, Thanh Hóa",
        investor: "Do Chủ đầu tư: Công ty Cổ phần Kiến trúc và Đầu tư...",
        area: "176.03 ha",
        occupancy: 60,
        phone: "0979643567",
        image: Background,
    },
    {
        name: "Khu công nghiệp Lễ Môn - Thanh Hóa",
        type: "Khu công nghiệp",
        status: "Đang hoạt động",
        address: "Thanh Hóa - Thành phố Thanh Hóa, Tỉnh Thanh Hoá",
        investor: "Do Chủ đầu tư: LEMON-IP-TH thực hiện.",
        area: "87.61 ha",
        occupancy: 93,
        phone: "0912 087 807",
        image: Thumb,
    },
];

const PageWrapper = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    background: #f7f8fa;
    color: #141d2d;
    padding: 112px 0 112px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
`;

const Header = styled.header`
    position: fixed;
    inset: 0 auto auto 50%;
    transform: translateX(-50%);
    width: min(100vw, 430px);
    height: 96px;
    z-index: 20;
    padding: 26px 14px 16px;
    color: #ffffff;
    background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12),
            transparent 36%
        ),
        linear-gradient(120deg, #820712 0%, #ad0717 52%, #d31825 100%);
    display: flex;
    align-items: flex-end;
    gap: 12px;
    box-shadow: 0 10px 26px rgba(109, 7, 17, 0.18);
`;

const IconButton = styled.button`
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: inherit;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
`;

const Title = styled.h1`
    margin: 0;
    flex: 1;
    min-width: 0;
    font-size: 25px;
    line-height: 1.08;
    font-weight: 950;
    white-space: nowrap;
`;

const Capsule = styled.div`
    height: 44px;
    width: 108px;
    border-radius: 999px;
    background: rgba(255, 245, 247, 0.86);
    color: #151822;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 27px;
    font-weight: 750;
    box-shadow: 0 10px 20px rgba(82, 3, 12, 0.2);
`;

const Content = styled.main`
    padding: 0 16px;
`;

const ZoneList = styled.div`
    display: grid;
    gap: 14px;
`;

const ZoneCard = styled.article`
    position: relative;
    display: grid;
    grid-template-columns: 72px 1fr;
    align-items: start;
    gap: 14px;
    min-height: 286px;
    border-radius: 22px;
    background: #ffffff;
    padding: 14px 16px 14px 14px;
    box-shadow: 0 12px 25px rgba(18, 28, 45, 0.1);
    border: 1px solid rgba(143, 153, 168, 0.08);
`;

const ZoneImage = styled.img`
    width: 72px;
    height: 258px;
    border-radius: 15px;
    object-fit: cover;
    background: #e8edf1;
`;

const ZoneBody = styled.div`
    min-width: 0;
`;

const ZoneTop = styled.div`
    display: grid;
    grid-template-columns: 1fr 20px;
    gap: 6px;
`;

const ZoneName = styled.h2`
    margin: 0;
    color: #182132;
    font-size: 20px;
    line-height: 1.32;
    font-weight: 950;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Chevron = styled.div`
    color: #c4c8ce;
    padding-top: 2px;
`;

const BadgeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin: 12px 0 12px;
`;

const Badge = styled.span<{ $tone: "red" | "green" }>`
    display: inline-flex;
    align-items: center;
    height: 32px;
    border-radius: 999px;
    padding: 0 11px;
    color: ${({ $tone }) => ($tone === "red" ? "#df1125" : "#15944d")};
    background: ${({ $tone }) => ($tone === "red" ? "#fde9ec" : "#eaf8ef")};
    font-size: 15px;
    font-weight: 900;
    white-space: nowrap;
`;

const Address = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 7px;
    color: #737b87;
    font-size: 17px;
    line-height: 1.35;
    font-weight: 600;

    span {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const TextLine = styled.div`
    margin-top: 12px;
    color: #737b87;
    font-size: 17px;
    line-height: 1.32;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const AreaValue = styled.strong`
    color: #2a3342;
    font-weight: 950;
`;

const ProgressHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 12px;
    color: #9aa0a8;
    font-size: 16px;
    line-height: 1.2;
    font-weight: 700;
`;

const ProgressTrack = styled.div`
    height: 7px;
    border-radius: 999px;
    background: #eef0f3;
    overflow: hidden;
    margin-top: 7px;
`;

const ProgressFill = styled.div<{ $value: number }>`
    width: ${({ $value }) => `${$value}%`};
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #e50920, #f0182c);
`;

const ContactRow = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 16px;
    font-size: 17px;
    line-height: 1.2;
    font-weight: 700;
`;

const Phone = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #d92534;
`;

const Website = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #8f969f;
`;

const FloatingActions = styled.div`
    position: fixed;
    right: max(16px, calc((100vw - 430px) / 2 + 16px));
    bottom: 40px;
    z-index: 22;
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
    background: linear-gradient(135deg, #a40516, #f0182c);
    box-shadow: 0 14px 26px rgba(168, 5, 22, 0.28);
`;

const IndustrialZonesPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper id="industrial-zones-page">
            <Header>
                <IconButton
                    aria-label="Quay lại"
                    onClick={() => navigate("/", { direction: "backward" })}
                >
                    <Icon icon="zi-arrow-left" size={30} />
                </IconButton>
                <Title>Khu công nghiệp</Title>
                <Capsule aria-hidden="true">
                    <span>...</span>
                    <span>×</span>
                </Capsule>
            </Header>

            <Content>
                <ZoneList>
                    {zones.map(zone => (
                        <ZoneCard key={zone.name}>
                            <ZoneImage src={zone.image} alt="" />
                            <ZoneBody>
                                <ZoneTop>
                                    <ZoneName>{zone.name}</ZoneName>
                                    <Chevron>
                                        <Icon
                                            icon="zi-chevron-right"
                                            size={20}
                                        />
                                    </Chevron>
                                </ZoneTop>

                                <BadgeRow>
                                    <Badge $tone="red">{zone.type}</Badge>
                                    <Badge $tone="green">{zone.status}</Badge>
                                </BadgeRow>

                                <Address>
                                    <Icon icon="zi-location" size={19} />
                                    <span>{zone.address}</span>
                                </Address>

                                <TextLine>{zone.investor}</TextLine>
                                <TextLine>
                                    Diện tích:{" "}
                                    <AreaValue>{zone.area}</AreaValue>
                                </TextLine>

                                <ProgressHeader>
                                    <span>Tỉ lệ lấp đầy</span>
                                    <span>{zone.occupancy}%</span>
                                </ProgressHeader>
                                <ProgressTrack>
                                    <ProgressFill $value={zone.occupancy} />
                                </ProgressTrack>

                                <ContactRow>
                                    <Phone>
                                        <Icon icon="zi-call" size={20} />
                                        {zone.phone}
                                    </Phone>
                                    <Website>
                                        <Icon icon="zi-link" size={20} />
                                        Website
                                    </Website>
                                </ContactRow>
                            </ZoneBody>
                        </ZoneCard>
                    ))}
                </ZoneList>
            </Content>

            <FloatingActions>
                <FloatingButton aria-label="Mở rộng">
                    <Icon icon="zi-arrow-up" size={28} />
                </FloatingButton>
                <FloatingButton aria-label="Trao đổi">
                    <Icon icon="zi-chat" size={31} />
                </FloatingButton>
            </FloatingActions>
        </PageWrapper>
    );
};

export default IndustrialZonesPage;
