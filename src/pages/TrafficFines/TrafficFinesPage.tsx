import React, { useState } from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import { openWebview } from "zmp-sdk/apis";

const TRAFFIC_FINE_URL = "https://csgt.bocongan.gov.vn/tra-cuu-phat-nguoi";

const PageWrapper = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    padding: 112px 0 32px;
    color: #172033;
    background: linear-gradient(180deg, #f7f7f7 0%, #ffffff 100%);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
`;

const Header = styled.header`
    position: fixed;
    inset: 0 auto auto 50%;
    z-index: 20;
    width: min(100vw, 430px);
    height: 96px;
    padding: 24px 16px 16px;
    display: flex;
    align-items: flex-end;
    gap: 12px;
    transform: translateX(-50%);
    color: #ffffff;
    background: linear-gradient(120deg, #920713 0%, #c70718 56%, #e2282e 100%);
    box-shadow: 0 12px 30px rgba(146, 7, 21, 0.2);
`;

const BackButton = styled.button`
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border: 0;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.16);
    cursor: pointer;
`;

const HeaderTitle = styled.h1`
    flex: 1;
    margin: 0;
    align-self: center;
    font-size: 22px;
    line-height: 1.2;
    font-weight: 900;
`;

const HeaderPlaceholder = styled.div`
    width: 48px;
    height: 48px;
`;

const Content = styled.main`
    padding: 18px 16px 24px;
`;

const HeroCard = styled.section`
    padding: 22px 18px;
    overflow: hidden;
    position: relative;
    border-radius: 24px;
    color: #ffffff;
    background: linear-gradient(135deg, #a40717 0%, #e01c2d 100%);
    box-shadow: 0 16px 34px rgba(182, 15, 31, 0.2);
`;

const HeroIcon = styled.div`
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.16);
`;

const HeroTitle = styled.h2`
    margin: 18px 0 8px;
    font-size: 22px;
    line-height: 1.3;
    font-weight: 950;
`;

const HeroDescription = styled.p`
    margin: 0;
    max-width: 330px;
    color: rgba(255, 255, 255, 0.88);
    font-size: 15px;
    line-height: 1.6;
`;

const InfoCard = styled.section`
    margin-top: 18px;
    padding: 18px;
    border: 1px solid rgba(228, 232, 240, 0.9);
    border-radius: 22px;
    background: #ffffff;
    box-shadow: 0 14px 28px rgba(50, 63, 88, 0.07);
`;

const InfoTitle = styled.h3`
    margin: 0 0 14px;
    color: #20283a;
    font-size: 17px;
    font-weight: 900;
`;

const StepList = styled.div`
    display: grid;
    gap: 14px;
`;

const StepItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: #596378;
    font-size: 15px;
    line-height: 1.5;
`;

const StepNumber = styled.span`
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #b60f1f;
    background: #ffeeec;
    font-size: 13px;
    font-weight: 900;
`;

const OpenButton = styled.button`
    width: 100%;
    margin-top: 20px;
    padding: 15px 18px;
    border: 0;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #ffffff;
    background: linear-gradient(135deg, #b60919, #ea0f2b);
    box-shadow: 0 12px 24px rgba(182, 15, 31, 0.2);
    font-size: 16px;
    font-weight: 900;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.65;
    }
`;

const Notice = styled.p`
    margin: 16px 2px 0;
    color: #788293;
    font-size: 13px;
    line-height: 1.6;
    text-align: center;
`;

const ErrorMessage = styled.p`
    margin: 14px 0 0;
    color: #b60919;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
`;

const TrafficFinesPage: React.FC = () => {
    const navigate = useNavigate();
    const [isOpening, setIsOpening] = useState(false);
    const [error, setError] = useState("");

    const handleOpenTrafficFineLookup = async () => {
        try {
            setIsOpening(true);
            setError("");

            await openWebview({
                url: TRAFFIC_FINE_URL,
            });
        } catch (err) {
            console.error("Không thể mở trang tra cứu phạt nguội:", err);

            setError(
                "Không thể mở trang tra cứu. Vui lòng thử lại hoặc kiểm tra kết nối mạng.",
            );
        } finally {
            setIsOpening(false);
        }
    };

    return (
        <PageWrapper id="traffic-fines-page">
            <Header>
                <BackButton
                    type="button"
                    aria-label="Quay lại"
                    onClick={() => navigate(-1)}
                >
                    <Icon icon="zi-arrow-left" size={28} />
                </BackButton>

                <HeaderTitle>Tra cứu phạt nguội</HeaderTitle>

                <HeaderPlaceholder aria-hidden="true" />
            </Header>

            <Content>
                <HeroCard>
                    <HeroIcon>
                        <Icon icon="zi-warning" size={30} />
                    </HeroIcon>

                    <HeroTitle>Kiểm tra vi phạm giao thông</HeroTitle>

                    <HeroDescription>
                        Tra cứu thông tin phương tiện vi phạm qua hình ảnh trên
                        hệ thống chính thức của Cục Cảnh sát giao thông.
                    </HeroDescription>
                </HeroCard>

                <InfoCard>
                    <InfoTitle>Hướng dẫn tra cứu</InfoTitle>

                    <StepList>
                        <StepItem>
                            <StepNumber>1</StepNumber>
                            <span>Nhấn nút mở trang tra cứu bên dưới.</span>
                        </StepItem>

                        <StepItem>
                            <StepNumber>2</StepNumber>
                            <span>
                                Nhập biển kiểm soát, chọn loại phương tiện và
                                điền mã bảo mật.
                            </span>
                        </StepItem>

                        <StepItem>
                            <StepNumber>3</StepNumber>
                            <span>
                                Nhấn tra cứu để xem thông tin vi phạm và trạng
                                thái xử lý.
                            </span>
                        </StepItem>
                    </StepList>

                    <OpenButton
                        type="button"
                        disabled={isOpening}
                        onClick={handleOpenTrafficFineLookup}
                    >
                        {isOpening
                            ? "Đang mở trang tra cứu..."
                            : "Tra cứu trên hệ thống CSGT"}

                        {!isOpening && (
                            <Icon icon="zi-chevron-right" size={19} />
                        )}
                    </OpenButton>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </InfoCard>

                <Notice>
                    Thông tin được tra cứu trực tiếp trên website của Cục Cảnh
                    sát giao thông — Bộ Công an.
                </Notice>
            </Content>
        </PageWrapper>
    );
};

export default TrafficFinesPage;
