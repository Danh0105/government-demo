import { Feedback } from "@dts";
import { useStore } from "@store";
import { formatDateTime } from "@utils/date-time";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import CreateFeedbackForm from "./CreateFeedbackForm";

type FeedbackStatus =
    | "processing"
    | "resolved"
    | "received"
    | "rejected"
    | string;

const statusLabels: Record<string, string> = {
    PROCESSING: "Đang xử lý",
    RESOLVED: "Đã xử lý",
    RECEIVED: "Đã tiếp nhận",
    REJECTED: "Từ chối",

    processing: "Đang xử lý",
    resolved: "Đã xử lý",
    received: "Đã tiếp nhận",
    rejected: "Từ chối",

    da_tiep_nhan: "Đã tiếp nhận",
    dang_xu_ly: "Đang xử lý",
    da_xu_ly: "Đã xử lý",
    tu_choi: "Từ chối",
};

const statusStyles: Record<
    string,
    {
        background: string;
        color: string;
        border: string;
    }
> = {
    processing: {
        background: "#fff7df",
        color: "#a86405",
        border: "#f8df9d",
    },
    resolved: {
        background: "#e8f8ef",
        color: "#138849",
        border: "#bfe9ce",
    },
    received: {
        background: "#eaf4ff",
        color: "#0067b1",
        border: "#c7e1f8",
    },
    rejected: {
        background: "#fef2f2",
        color: "#b42318",
        border: "#fecaca",
    },
};

const PageWrapper = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    padding: 0 0 92px;
    overflow-x: hidden;
    background: #f1f6fa;
    color: #10233b;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
`;

const TopHeader = styled.header`
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 14px 16px 18px;
    color: #ffffff;
    background: linear-gradient(135deg, #064f88 0%, #0075b8 100%);
    border-radius: 0 0 24px 24px;
    box-shadow: 0 10px 24px rgba(0, 84, 142, 0.2);
`;

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const BackButton = styled.button`
    width: 42px;
    height: 42px;
    flex: none;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 14px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.12);
    transition: 0.2s ease;

    &:active {
        transform: scale(0.94);
        background: rgba(255, 255, 255, 0.2);
    }
`;

const HeaderContent = styled.div`
    min-width: 0;
`;

const HeaderTitle = styled.h1`
    margin: 0;
    font-size: calc(20px * var(--app-font-scale));
    line-height: 1.2;
    font-weight: 900;
`;

const HeaderDescription = styled.p`
    margin: 3px 0 0;
    color: rgba(255, 255, 255, 0.82);
    font-size: calc(12px * var(--app-font-scale));
    line-height: 1.35;
    font-weight: 600;
`;

const Content = styled.main`
    padding: 14px;
`;

const SearchBox = styled.label`
    height: 52px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    border: 1px solid #d9e8f3;
    border-radius: 17px;
    color: #4985ae;
    background: #ffffff;
    box-shadow: 0 6px 16px rgba(30, 90, 130, 0.07);
`;

const SearchInput = styled.input`
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    color: #173551;
    background: transparent;
    font-size: calc(15px * var(--app-font-scale));
    font-weight: 600;

    &::placeholder {
        color: #90a8b9;
        font-weight: 500;
    }
`;

const SummaryRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 15px 2px 12px;
`;

const SummaryText = styled.span`
    color: #587188;
    font-size: calc(14px * var(--app-font-scale));
    font-weight: 750;
`;

const RefreshButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 11px;
    border: 1px solid #d7e7f2;
    border-radius: 11px;
    color: #0069ab;
    background: #ffffff;
    font-size: calc(13px * var(--app-font-scale));
    font-weight: 800;
    transition: 0.2s ease;

    &:active {
        transform: scale(0.96);
        background: #edf7ff;
    }
`;

const FeedbackList = styled.div`
    display: grid;
    gap: 12px;
`;

const FeedbackCard = styled.article`
    position: relative;
    overflow: hidden;
    padding: 16px;
    border: 1px solid #deebf3;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 7px 18px rgba(31, 77, 110, 0.07);
    transition: 0.2s ease;

    &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        content: "";
        background: linear-gradient(180deg, #0076b9, #29a7dc);
    }

    &:active {
        transform: scale(0.985);
        background: #fbfdff;
    }
`;

const CardTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const Code = styled.div`
    color: #075f9e;
    font-size: calc(15px * var(--app-font-scale));
    line-height: 1.2;
    font-weight: 900;
`;

const StatusBadge = styled.span<{ $status: FeedbackStatus }>`
    flex: none;
    display: inline-flex;
    align-items: center;
    min-height: 27px;
    padding: 4px 9px;
    border: 1px solid
        ${({ $status }) =>
            statusStyles[$status]?.border || statusStyles.received.border};
    border-radius: 999px;
    color: ${({ $status }) =>
        statusStyles[$status]?.color || statusStyles.received.color};
    background: ${({ $status }) =>
        statusStyles[$status]?.background || statusStyles.received.background};
    font-size: calc(11px * var(--app-font-scale));
    line-height: 1;
    font-weight: 900;
    white-space: nowrap;
`;

const Category = styled.div`
    margin-top: 9px;
    color: #6e8da4;
    font-size: calc(12px * var(--app-font-scale));
    line-height: 1.35;
    font-weight: 750;
`;

const CardTitle = styled.h2`
    margin: 6px 0 5px;
    color: #15344f;
    font-size: calc(16px * var(--app-font-scale));
    line-height: 1.35;
    font-weight: 900;
`;

const CardContent = styled.p`
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    color: #61798d;
    font-size: calc(14px * var(--app-font-scale));
    line-height: 1.5;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

const Sender = styled.div`
    margin-top: 9px;
    color: #587188;
    font-size: calc(12px * var(--app-font-scale));
    line-height: 1.45;
    font-weight: 650;
`;

const Divider = styled.div`
    height: 1px;
    margin: 12px 0 9px;
    background: #e6eff5;
`;

const CardFoot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 9px;
    color: #7891a4;
    font-size: calc(11px * var(--app-font-scale));
    line-height: 1.3;
    font-weight: 650;
`;

const Meta = styled.span`
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 3px;
`;

const EmptyState = styled.div`
    padding: 30px 18px;
    border: 1px solid #deebf3;
    border-radius: 20px;
    color: #6e8799;
    background: #ffffff;
    box-shadow: 0 7px 18px rgba(31, 77, 110, 0.07);
    text-align: center;
    font-size: calc(14px * var(--app-font-scale));
    line-height: 1.55;
`;

const CreateAction = styled.div`
    position: fixed;
    right: max(16px, calc((100vw - 430px) / 2 + 16px));
    bottom: 82px;
    z-index: 18;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CreateLabel = styled.button`
    min-height: 36px;
    padding: 0 12px;
    border: 1px solid #d7eaf5;
    border-radius: 999px;
    color: #006ba9;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 7px 18px rgba(0, 91, 148, 0.14);
    font-size: calc(12px * var(--app-font-scale));
    font-weight: 850;
    white-space: nowrap;

    &:active {
        transform: scale(0.96);
    }
`;

const CreateButton = styled.button`
    width: 58px;
    height: 58px;
    display: grid;
    flex: none;
    place-items: center;
    border: 4px solid rgba(255, 255, 255, 0.9);
    border-radius: 999px;
    color: #ffffff;
    background: linear-gradient(135deg, #0072b5, #0099d4);
    box-shadow: 0 12px 25px rgba(0, 112, 177, 0.32);
    transition: 0.2s ease;

    &:active {
        transform: scale(0.92);
    }
`;

const PopupOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: rgba(5, 28, 49, 0.5);
    backdrop-filter: blur(3px);
`;

const PopupPanel = styled.section`
    width: min(100vw, 430px);
    max-height: min(88vh, 760px);
    overflow-y: auto;
    padding: 10px 16px 22px;
    border-radius: 24px 24px 0 0;
    background: #f8fbfd;
    box-shadow: 0 -14px 36px rgba(5, 52, 84, 0.22);
    animation: slide-up 0.22s ease-out;

    @keyframes slide-up {
        from {
            transform: translateY(30px);
            opacity: 0;
        }

        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const PopupHandle = styled.div`
    width: 42px;
    height: 5px;
    margin: 0 auto 13px;
    border-radius: 999px;
    background: #c6dbe8;
`;

const PopupStickyHeader = styled.div`
    position: sticky;
    top: -10px;
    z-index: 10;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin: 0 -16px 16px;
    padding: 10px 16px 12px;
    border-bottom: 1px solid rgba(215, 231, 242, 0.88);
    background: rgba(248, 251, 253, 0.96);
    backdrop-filter: blur(10px);
`;

const PopupTitle = styled.h2`
    margin: 0;
    color: #133c5a;
    font-size: calc(20px * var(--app-font-scale));
    line-height: 1.25;
    font-weight: 900;
`;

const PopupDescription = styled.p`
    margin: 4px 0 0;
    color: #6d8799;
    font-size: calc(12px * var(--app-font-scale));
    line-height: 1.45;
    font-weight: 600;
`;

const PopupCloseButton = styled.button`
    width: 36px;
    height: 36px;
    display: grid;
    flex: none;
    place-items: center;
    border: 1px solid #d7e7f2;
    border-radius: 12px;
    color: #52758c;
    background: #ffffff;

    &:active {
        transform: scale(0.94);
        background: #eef7fc;
    }
`;

const BottomNav = styled.nav`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 50%;
    z-index: 22;
    display: grid;
    width: min(100vw, 430px);
    height: 68px;
    grid-template-columns: repeat(5, 1fr);
    transform: translateX(-50%);
    border-top: 1px solid #dce8f1;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 -6px 18px rgba(31, 77, 110, 0.08);
`;

const NavItem = styled.button<{ $active?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    border: 0;
    color: ${({ $active }) => ($active ? "#0070b5" : "#9aaabb")};
    background: transparent;
    font-size: calc(10px * var(--app-font-scale));
    line-height: 1.1;
    font-weight: ${({ $active }) => ($active ? 850 : 650)};

    &:active {
        background: #f0f8fd;
    }
`;

const normalizeStatus = (status?: string) => {
    if (!status) {
        return "received";
    }

    const lower = status.toLowerCase();

    if (lower === "da_tiep_nhan") {
        return "received";
    }

    if (lower === "dang_xu_ly") {
        return "processing";
    }

    if (lower === "da_xu_ly") {
        return "resolved";
    }

    if (lower === "tu_choi") {
        return "rejected";
    }

    if (lower.includes("process")) {
        return "processing";
    }

    if (lower.includes("resolve") || lower.includes("done")) {
        return "resolved";
    }

    if (lower.includes("reject")) {
        return "rejected";
    }

    if (lower.includes("receive") || lower.includes("pending")) {
        return "received";
    }

    return lower;
};

const getStatusLabel = (item: Feedback) =>
    item.statusText ||
    statusLabels[item.status || ""] ||
    statusLabels[normalizeStatus(item.status)] ||
    item.status ||
    "Đã tiếp nhận";

const matchesSearch = (item: Feedback, keyword: string) => {
    if (!keyword) {
        return true;
    }

    const text = [
        item.title,
        item.content,
        item.type,
        item.receivingUnitName,
        item.senderFullName,
        item.senderPhone,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    return text.includes(keyword.toLowerCase());
};

const FeedbackPage: React.FC = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const { id: organizationId } = useStore(state => state.organization) || {
        id: "",
    };

    const [feedbacks, loading, getFeedbacks] = useStore(state => [
        state.feedbacks,
        state.gettingFeedback,
        state.getFeedbacks,
    ]);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const getFeedbackItems = (response: unknown): Feedback[] => {
        if (Array.isArray(response)) {
            return response as Feedback[];
        }

        if (typeof response === "object" && response !== null) {
            const data = response as {
                data?: Feedback[];
                items?: Feedback[];
                feedbacks?: Feedback[];
            };

            return data.feedbacks ?? data.items ?? data.data ?? [];
        }

        return [];
    };
    const loadFeedbacks = useCallback(() => {
        if (organizationId) {
            getFeedbacks({
                organizationId,
                page: 0,
                firstFetch: true,
            });
        }
    }, [getFeedbacks, organizationId]);

    useEffect(() => {
        loadFeedbacks();
    }, [loadFeedbacks]);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        if (isCreateOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            if (isCreateOpen) {
                document.body.style.overflow = previousOverflow;
            }
        };
    }, [isCreateOpen]);

    const visibleFeedbacks = useMemo(
        () =>
            getFeedbackItems(feedbacks).filter(item =>
                matchesSearch(item, keyword.trim()),
            ),
        [feedbacks, keyword],
    );
    return (
        <PageWrapper id="feedbacks">
            <TopHeader>
                <HeaderRow>
                    <BackButton
                        aria-label="Quay lại"
                        onClick={() => navigate("/", { direction: "backward" })}
                        type="button"
                    >
                        <Icon icon="zi-arrow-left" size={23} />
                    </BackButton>

                    <HeaderContent>
                        <HeaderTitle>Phản ánh người dân</HeaderTitle>
                        <HeaderDescription>
                            Theo dõi và gửi kiến nghị đến chính quyền địa phương
                        </HeaderDescription>
                    </HeaderContent>
                </HeaderRow>
            </TopHeader>

            <Content>
                <SearchBox>
                    <Icon icon="zi-search" size={21} />
                    <SearchInput
                        value={keyword}
                        onChange={event => setKeyword(event.target.value)}
                        placeholder="Tìm theo tiêu đề, nội dung..."
                    />
                </SearchBox>

                <SummaryRow>
                    <SummaryText>
                        {loading
                            ? "Đang tải phản ánh..."
                            : `${visibleFeedbacks.length} phản ánh kiến nghị`}
                    </SummaryText>

                    <RefreshButton type="button" onClick={loadFeedbacks}>
                        <Icon icon="zi-arrow-right" size={15} />
                        Làm mới
                    </RefreshButton>
                </SummaryRow>

                <FeedbackList>
                    {visibleFeedbacks.map(item => {
                        const status = normalizeStatus(item.status);

                        return (
                            <FeedbackCard
                                key={item.id}
                                onClick={() =>
                                    navigate(`/feedbacks/${item.id}`)
                                }
                            >
                                <CardTop>
                                    <Code>#{String(item.id).slice(0, 8)}</Code>

                                    <StatusBadge $status={status}>
                                        {getStatusLabel(item)}
                                    </StatusBadge>
                                </CardTop>

                                <Category>
                                    {item.type || "Phản ánh người dân"}
                                </Category>

                                <CardTitle>{item.title}</CardTitle>

                                <CardContent>{item.content}</CardContent>

                                <Sender>
                                    Người gửi:{" "}
                                    {item.isAnonymous
                                        ? "Ẩn danh"
                                        : item.senderFullName ||
                                          "Chưa cung cấp"}
                                    {item.senderPhone
                                        ? ` - ${item.senderPhone}`
                                        : ""}
                                </Sender>

                                <Divider />

                                <CardFoot>
                                    <Meta>
                                        <Icon icon="zi-location" size={14} />
                                        {item.addressDetail ||
                                            item.ward ||
                                            item.district ||
                                            item.province ||
                                            item.senderAddress ||
                                            "Chưa có khu vực"}
                                    </Meta>

                                    <Meta>
                                        {formatDateTime(item.creationTime)}
                                    </Meta>
                                </CardFoot>
                            </FeedbackCard>
                        );
                    })}
                </FeedbackList>

                {!loading && visibleFeedbacks.length === 0 && (
                    <EmptyState>
                        Chưa có phản ánh phù hợp.
                        <br />
                        Nhấn nút tạo phản ánh để gửi thông tin mới.
                    </EmptyState>
                )}
            </Content>

            <CreateAction>
                <CreateLabel
                    aria-label="Mở form tạo phản ánh"
                    onClick={() => setIsCreateOpen(true)}
                    type="button"
                >
                    Tạo phản ánh
                </CreateLabel>

                <CreateButton
                    aria-label="Tạo phản ánh"
                    onClick={() => setIsCreateOpen(true)}
                    type="button"
                >
                    <Icon icon="zi-plus" size={30} />
                </CreateButton>
            </CreateAction>

            <BottomNav>
                <NavItem onClick={() => navigate("/")} type="button">
                    <Icon icon="zi-home" size={21} />
                    <span>Trang chủ</span>
                </NavItem>

                <NavItem onClick={() => navigate("/news")} type="button">
                    <Icon icon="zi-list-1" size={21} />
                    <span>Tin tức</span>
                </NavItem>

                <NavItem $active type="button">
                    <Icon icon="zi-chat" size={21} />
                    <span>Cộng đồng</span>
                </NavItem>

                <NavItem
                    onClick={() => navigate("/notifications")}
                    type="button"
                >
                    <Icon icon="zi-notif" size={21} />
                    <span>Thông báo</span>
                </NavItem>

                <NavItem onClick={() => navigate("/profile")} type="button">
                    <Icon icon="zi-user" size={21} />
                    <span>Tài khoản</span>
                </NavItem>
            </BottomNav>

            {isCreateOpen && (
                <PopupOverlay
                    onClick={() => setIsCreateOpen(false)}
                    role="presentation"
                >
                    <PopupPanel
                        aria-labelledby="create-feedback-title"
                        aria-modal="true"
                        onClick={event => event.stopPropagation()}
                        role="dialog"
                    >
                        <PopupHandle />
                        <PopupStickyHeader>
                            <div>
                                <PopupTitle id="create-feedback-title">
                                    Tạo phản ánh mới
                                </PopupTitle>

                                <PopupDescription>
                                    Gửi thông tin đến đơn vị phụ trách để được
                                    tiếp nhận và xử lý.
                                </PopupDescription>
                            </div>

                            <PopupCloseButton
                                aria-label="Đóng form tạo phản ánh"
                                onClick={() => setIsCreateOpen(false)}
                                type="button"
                            >
                                <Icon icon="zi-close" size={20} />
                            </PopupCloseButton>
                        </PopupStickyHeader>

                        <CreateFeedbackForm
                            onCancel={() => setIsCreateOpen(false)}
                            successCallback={status => {
                                if (!status) {
                                    return;
                                }

                                setIsCreateOpen(false);
                                loadFeedbacks();
                            }}
                        />
                    </PopupPanel>
                </PopupOverlay>
            )}
        </PageWrapper>
    );
};

export default FeedbackPage;
