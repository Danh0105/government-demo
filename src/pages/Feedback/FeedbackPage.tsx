import HeaderPage, { BackButton } from "@/components/layout/HeaderPage";
import React from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";

type FeedbackStatus = "Đang xử lý" | "Đã xử lý" | "Đã tiếp nhận";

type FeedbackItem = {
    code: string;
    category: string;
    title: string;
    content: string;
    sender: string;
    phone: string;
    priority: string;
    updatedAt: string;
    status: FeedbackStatus;
};

const filters = ["Trạng thái", "Lĩnh vực", "Khu vực"];

const feedbacks: FeedbackItem[] = [
    {
        code: "#DF659E0C",
        category: "Dân sinh xã hội khác",
        title: "Nắp hố ga bị hỏng/mất nắp gây nguy hiểm cho người đi đường",
        content:
            "Tại trước cửa số nhà 126 trên QL45, có một nắp hố ga đã bị vỡ nát/mất nắp tạo thành hố sâu nguy hiểm. Hiện người dân phải cắm cành cây để cảnh báo tạm thời cho người qua lại.",
        sender: "Hảiii Hà",
        phone: "84343954838",
        priority: "Bình thường",
        updatedAt: "05/06/2026",
        status: "Đang xử lý",
    },
    {
        code: "#BA82E1EB",
        category: "Trật tự xây dựng",
        title: "Công trình xây dựng thi công không che chắn, rơi vãi vật liệu",
        content:
            "Công trình nhà ở/dự án đang thi công gần nhà tôi không thực hiện che chắn bạt đúng quy định. Bụi bẩn, gạch đá thường xuyên rơi vãi xuống lòng đường gây mất an toàn.",
        sender: "Hảiii Hà",
        phone: "84343954838",
        priority: "Bình thường",
        updatedAt: "05/06/2026",
        status: "Đã xử lý",
    },
    {
        code: "#183F1CAF",
        category: "Môi trường",
        title: "Rác thải tập kết lâu ngày tại khu dân cư gây mùi khó chịu",
        content:
            "Khu vực gần ngã ba thôn có điểm tập kết rác tự phát, nhiều ngày chưa được thu gom. Mùi hôi ảnh hưởng đến sinh hoạt của các hộ dân xung quanh.",
        sender: "Nguyễn Văn Nam",
        phone: "0912345678",
        priority: "Bình thường",
        updatedAt: "04/06/2026",
        status: "Đã tiếp nhận",
    },
];

const statusStyles: Record<
    FeedbackStatus,
    { background: string; color: string }
> = {
    "Đang xử lý": {
        background: "#fff8e8",
        color: "#b66a0d",
    },
    "Đã xử lý": {
        background: "#eaf8ef",
        color: "#16964b",
    },
    "Đã tiếp nhận": {
        background: "#edf4ff",
        color: "#2d6fc9",
    },
};

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

const Title = styled.h1`
    margin: 0;
    flex: 1;
    min-width: 0;
    font-size: 25px;
    line-height: 1.08;
    font-weight: 950;
    white-space: nowrap;
`;

const Content = styled.main`
    padding: 0 16px;
`;

const SearchBox = styled.label`
    height: 58px;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid rgba(143, 153, 168, 0.16);
    box-shadow: 0 8px 18px rgba(18, 28, 45, 0.08);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    color: #99a0aa;
`;

const SearchInput = styled.input`
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: #172033;
    font-size: 18px;
    font-weight: 500;

    &::placeholder {
        color: #9ba2ad;
    }
`;

const FilterRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin: 12px 0 18px;
`;

const FilterButton = styled.button`
    height: 48px;
    min-width: 0;
    border: 1px solid rgba(143, 153, 168, 0.16);
    border-radius: 13px;
    background: #ffffff;
    color: #303744;
    box-shadow: 0 7px 14px rgba(18, 28, 45, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 0 12px;
    font-size: 16px;
    font-weight: 650;
    white-space: nowrap;
`;

const FeedbackList = styled.div`
    display: grid;
    gap: 14px;
`;

const FeedbackCard = styled.article`
    border-radius: 22px;
    background: #ffffff;
    padding: 19px 18px 16px;
    box-shadow: 0 12px 25px rgba(18, 28, 45, 0.1);
    border: 1px solid rgba(143, 153, 168, 0.08);
`;

const CardTop = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

const Code = styled.div`
    color: #05070a;
    font-size: 23px;
    line-height: 1.1;
    font-weight: 950;
    letter-spacing: 0;
`;

const StatusBadge = styled.span<{ $status: FeedbackStatus }>`
    flex: none;
    display: inline-flex;
    align-items: center;
    height: 32px;
    border-radius: 999px;
    padding: 0 12px;
    background: ${({ $status }) => statusStyles[$status].background};
    color: ${({ $status }) => statusStyles[$status].color};
    font-size: 15px;
    font-weight: 900;
    white-space: nowrap;
`;

const Category = styled.div`
    margin-top: 10px;
    color: #8b929e;
    font-size: 15px;
    line-height: 1.35;
    font-weight: 650;
`;

const CardTitle = styled.h2`
    margin: 10px 0 10px;
    color: #182132;
    font-size: 20px;
    line-height: 1.36;
    font-weight: 950;
`;

const CardContent = styled.p`
    margin: 0;
    color: #747b86;
    font-size: 18px;
    line-height: 1.56;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Sender = styled.div`
    margin-top: 10px;
    color: #747b86;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 600;
`;

const Divider = styled.div`
    height: 1px;
    background: rgba(143, 153, 168, 0.16);
    margin: 14px 0 10px;
`;

const CardFoot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #8b929e;
    font-size: 15px;
    line-height: 1.25;
    font-weight: 650;
`;

const Priority = styled.span`
    display: inline-flex;
    align-items: center;
    min-width: 0;
    gap: 6px;
    white-space: nowrap;
`;

const UpdatedAt = styled.span`
    min-width: 0;
    white-space: nowrap;
`;

const FloatingActions = styled.div`
    position: fixed;
    right: max(16px, calc((100vw - 430px) / 2 + 16px));
    bottom: 88px;
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

const BottomNav = styled.nav`
    position: fixed;
    inset: auto auto 0 50%;
    transform: translateX(-50%);
    width: min(100vw, 430px);
    height: 84px;
    z-index: 21;
    background: rgba(255, 255, 255, 0.96);
    border-top: 1px solid rgba(143, 153, 168, 0.14);
    box-shadow: 0 -8px 22px rgba(18, 28, 45, 0.08);
    display: grid;
    grid-template-columns: 1fr 86px 1fr;
    align-items: stretch;
    padding: 8px 14px 10px;
`;

const NavItem = styled.button<{ $active?: boolean }>`
    border: 0;
    border-radius: 13px;
    background: ${({ $active }) => ($active ? "#fde9ec" : "transparent")};
    color: ${({ $active }) => ($active ? "#df1125" : "#7d858f")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 15px;
    line-height: 1.1;
    font-weight: 850;
`;

const PlusButton = styled.button`
    width: 78px;
    height: 78px;
    border: 0;
    border-radius: 999px;
    align-self: center;
    justify-self: center;
    transform: translateY(-22px);
    display: grid;
    place-items: center;
    color: #ffffff;
    background: linear-gradient(135deg, #a40516, #f0182c);
    box-shadow: 0 16px 30px rgba(168, 5, 22, 0.32);
`;

const FeedbackPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper id="feedbacks">
            <HeaderPage>
                <BackButton
                    aria-label="Quay lại"
                    onClick={() => navigate("/", { direction: "backward" })}
                >
                    <Icon icon="zi-arrow-left" size={28} />
                </BackButton>

                <Title>Phản ánh kiến nghị</Title>
            </HeaderPage>

            <Content>
                <SearchBox>
                    <Icon icon="zi-search" size={24} />
                    <SearchInput placeholder="Tìm theo tiêu đề, nội dung..." />
                </SearchBox>

                <FilterRow>
                    {filters.map(filter => (
                        <FilterButton key={filter}>
                            <span>{filter}</span>
                            <Icon icon="zi-arrow-down" size={18} />
                        </FilterButton>
                    ))}
                </FilterRow>

                <FeedbackList>
                    {feedbacks.map(item => (
                        <FeedbackCard key={item.code}>
                            <CardTop>
                                <Code>{item.code}</Code>
                                <StatusBadge $status={item.status}>
                                    {item.status}
                                </StatusBadge>
                            </CardTop>
                            <Category>{item.category}</Category>
                            <CardTitle>{item.title}</CardTitle>
                            <CardContent>{item.content}</CardContent>
                            <Sender>
                                Người gửi: {item.sender} • {item.phone}
                            </Sender>
                            <Divider />
                            <CardFoot>
                                <Priority>
                                    <Icon icon="zi-check-circle" size={18} />
                                    {item.priority}
                                </Priority>
                                <UpdatedAt>
                                    Cập nhật: {item.updatedAt}
                                </UpdatedAt>
                            </CardFoot>
                        </FeedbackCard>
                    ))}
                </FeedbackList>
            </Content>

            <FloatingActions>
                <FloatingButton aria-label="Mở rộng">
                    <Icon icon="zi-arrow-up" size={28} />
                </FloatingButton>
                <FloatingButton
                    aria-label="Trao đổi"
                    onClick={() => navigate("/create-feedback")}
                >
                    <Icon icon="zi-chat" size={31} />
                </FloatingButton>
            </FloatingActions>

            <BottomNav>
                <NavItem $active>
                    <Icon icon="zi-list-1" size={26} />
                    <span>Cộng đồng</span>
                </NavItem>
                <PlusButton
                    aria-label="Tạo phản ánh"
                    onClick={() => navigate("/create-feedback")}
                >
                    <Icon icon="zi-plus" size={42} />
                </PlusButton>
                <NavItem>
                    <Icon icon="zi-user" size={26} />
                    <span>Của tôi</span>
                </NavItem>
            </BottomNav>
        </PageWrapper>
    );
};

export default FeedbackPage;
