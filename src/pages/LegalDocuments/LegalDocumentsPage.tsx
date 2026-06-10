import HeaderPage from "@/components/layout/HeaderPage";
import React from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";

type DocumentItem = {
    title: string;
    meta: string;
};

const documents: DocumentItem[] = [
    {
        title: "Giao tham mưu giải quyết đề nghị xem xét quyết định đơn vị...",
        meta: "Chỉ đạo điều hành · 10495/UBND-CNXD...",
    },
    {
        title: "Triển khai thực hiện Nghị định số 163/2026/NĐ-CP ngày...",
        meta: "Chỉ đạo điều hành · 10493/UBND-TDNC ...",
    },
    {
        title: "Giao tham mưu giải quyết đề nghị của UBND phường Đông...",
        meta: "Chỉ đạo điều hành · 10490/UBND-CNXD...",
    },
    {
        title: "Giao xem xét, giải quyết đề nghị di chuyển đường dây 35kV ph...",
        meta: "Chỉ đạo điều hành · 10483/UBND-CNXD...",
    },
    {
        title: "Giao triển khai Công văn số 8132/BXD-GĐ ngày 01/6/2026...",
        meta: "Chỉ đạo điều hành · 10492/UBND-CNXD...",
    },
];

const PageWrapper = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    background: radial-gradient(
            circle at 36px 132px,
            rgba(183, 7, 22, 0.1),
            transparent 150px
        ),
        linear-gradient(180deg, #fff7ec 0, #f7f7f9 224px, #f7f8fa 100%);
    color: #172033;
    padding: 112px 0 32px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
`;

const BackButton = styled.button`
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
`;

const Title = styled.h1`
    margin: 0;
    flex: 1;
    font-size: 26px;
    line-height: 1.08;
    font-weight: 950;
    white-space: nowrap;
`;

const Content = styled.main`
    padding: 14px 16px 120px;
`;

const SearchBox = styled.label`
    height: 56px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(30, 35, 50, 0.08);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 18px;
    color: #98a2b3;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
`;

const SearchInput = styled.input`
    width: 100%;
    min-width: 0;
    border: 0;
    outline: none;
    background: transparent;
    color: #172033;
    font-size: 20px;
    font-weight: 500;

    &::placeholder {
        color: #8e96a3;
    }
`;

const DocumentList = styled.div`
    display: grid;
    gap: 14px;
    margin-top: 18px;
`;

const DocumentCard = styled.article`
    min-height: 106px;
    border-radius: 22px;
    background: #ffffff;
    display: grid;
    grid-template-columns: 58px 1fr 24px;
    gap: 16px;
    align-items: center;
    padding: 16px;
    box-shadow: 0 16px 32px rgba(30, 35, 50, 0.1);
`;

const DocumentIcon = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    color: #d38113;
    background: radial-gradient(
            circle at 35% 25%,
            rgba(255, 255, 255, 0.9),
            transparent 22%
        ),
        linear-gradient(135deg, #fffaf0, #fff1cc);
`;

const DocumentBody = styled.div`
    min-width: 0;
`;

const DocumentTitle = styled.h2`
    margin: 0;
    color: #172033;
    font-size: 20px;
    line-height: 1.35;
    font-weight: 930;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const DocumentMeta = styled.p`
    margin: 8px 0 0;
    color: #737c89;
    font-size: 16px;
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Arrow = styled.div`
    color: #a3abb5;
    display: grid;
    place-items: center;
`;

const FloatingActions = styled.div`
    position: fixed;
    right: max(16px, calc((100vw - 430px) / 2 + 16px));
    bottom: 28px;
    z-index: 12;
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

const LegalDocumentsPage: React.FunctionComponent = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper id="legal-documents-page">
            <HeaderPage>
                <BackButton
                    aria-label="Quay lại"
                    onClick={() => navigate("/", { direction: "backward" })}
                >
                    <Icon icon="zi-arrow-left" size={28} />
                </BackButton>

                <Title>Văn bản</Title>
            </HeaderPage>

            <Content>
                <SearchBox>
                    <Icon icon="zi-search" size={28} />
                    <SearchInput placeholder="Tìm văn bản..." />
                </SearchBox>

                <DocumentList>
                    {documents.map(document => (
                        <DocumentCard key={document.title}>
                            <DocumentIcon>
                                <Icon icon="zi-file" size={28} />
                            </DocumentIcon>
                            <DocumentBody>
                                <DocumentTitle>{document.title}</DocumentTitle>
                                <DocumentMeta>{document.meta}</DocumentMeta>
                            </DocumentBody>
                            <Arrow>
                                <Icon icon="zi-chevron-right" size={26} />
                            </Arrow>
                        </DocumentCard>
                    ))}
                </DocumentList>
            </Content>

            <FloatingActions>
                <FloatingButton aria-label="Mở rộng">
                    <Icon icon="zi-arrow-up" size={28} />
                </FloatingButton>
                <FloatingButton aria-label="Trò chuyện">
                    <Icon icon="zi-chat" size={31} />
                </FloatingButton>
            </FloatingActions>
        </PageWrapper>
    );
};

export default LegalDocumentsPage;
