import React from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import Thumb from "@assets/thumb.png";
import NewsFeatured from "@assets/news-featured.jpg";
import NewsElderly from "@assets/news-elderly.jpg";
import NewsMeeting from "@assets/news-meeting.jpg";
import HeaderPage from "@/components/layout/HeaderPage";

type Category = {
    label: string;
    active?: boolean;
};

type Article = {
    title: string;
    excerpt: string;
    category: string;
    image: string;
};

const categories: Category[] = [
    { label: "Tất cả", active: true },
    { label: "Giới thiệu" },
    { label: "Kinh tế - Chính trị" },
    { label: "Văn hóa - Xã hội" },
    { label: "Chuyển đổi số" },
];

const featuredArticle: Article = {
    title: "Thúc đẩy chi trả an sinh xã hội không dùng tiền mặt",
    excerpt:
        "Ngày 29/5, Công an tỉnh Thanh Hóa tổ chức hội nghị triển khai các giải pháp chi trả an sinh xã hội không dùng tiền mặt...",
    category: "Chuyển đổi số",
    image: NewsFeatured,
};

const articles: Article[] = [
    {
        title: "Đồng chí Lê Minh Sơn, Phó Bí thư Thường trực thăm và chúc mừng",
        excerpt:
            "Nhân kỷ niệm Ngày truyền thống Người cao tuổi Việt Nam, lãnh đạo xã đã đến thăm, tặng hoa và gửi lời chúc mừng...",
        category: "Văn hóa - Xã hội",
        image: NewsElderly,
    },
    {
        title: "Hội nghị triển khai cài đặt tài khoản an sinh xã hội",
        excerpt:
            "Chiều ngày 02/6, UBND xã Thiệu Hóa tổ chức hội nghị tuyên truyền, hướng dẫn người dân sử dụng dịch vụ số...",
        category: "Văn hóa - Xã hội",
        image: NewsMeeting,
    },
    {
        title: "Đẩy mạnh tuyên truyền dịch vụ công trực tuyến đến từng khu dân cư",
        excerpt:
            "Các tổ công nghệ số cộng đồng tiếp tục hỗ trợ người dân thực hiện thủ tục hành chính trên môi trường mạng...",
        category: "Kinh tế - Chính trị",
        image: Thumb,
    },
];

const NewsPageWrapper = styled(Page)`
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    background: radial-gradient(
            circle at 24px 126px,
            rgba(183, 7, 22, 0.12),
            transparent 150px
        ),
        linear-gradient(180deg, #fff7ec 0, #f6f7fa 238px, #f7f8fa 100%);
    color: #172033;
    padding: 162px 0 28px;
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
    font-size: 28px;
    line-height: 1.05;
    font-weight: 950;
`;

const CategoryBar = styled.div`
    position: fixed;
    top: 96px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 11;
    width: min(100vw, 430px);
    height: 66px;
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(179, 31, 43, 0.08);
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px 12px 12px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const CategoryPill = styled.button<{ $active?: boolean }>`
    border: 0;
    border-radius: 16px;
    padding: 0 18px;
    min-width: max-content;
    color: ${({ $active }) => ($active ? "#ffffff" : "#4a5568")};
    background: ${({ $active }) =>
        $active
            ? "linear-gradient(135deg, #a40516, #f0182c)"
            : "rgba(255, 255, 255, 0.92)"};
    box-shadow: ${({ $active }) =>
        $active
            ? "0 12px 24px rgba(168, 5, 22, 0.24)"
            : "0 8px 20px rgba(30, 35, 50, 0.08)"};
    font-size: 18px;
    font-weight: 850;
`;

const Content = styled.main`
    padding: 0 12px 98px;
`;

const FeaturedCard = styled.article`
    border-radius: 24px;
    background: #ffffff;
    overflow: hidden;
    box-shadow: 0 18px 36px rgba(30, 35, 50, 0.12);
`;

const FeaturedImage = styled.div<{ $image: string }>`
    height: 234px;
    background: linear-gradient(
            180deg,
            rgba(23, 32, 51, 0.02),
            rgba(23, 32, 51, 0.08)
        ),
        url(${({ $image }) => $image}) center/cover;
`;

const FeaturedBody = styled.div`
    padding: 20px 18px 22px;
`;

const Chip = styled.span`
    display: inline-flex;
    align-items: center;
    height: 34px;
    border-radius: 999px;
    padding: 0 14px;
    background: #fff1f1;
    color: #bf1020;
    font-size: 15px;
    font-weight: 850;
`;

const FeaturedTitle = styled.h2`
    margin: 14px 0 12px;
    font-size: 26px;
    line-height: 1.22;
    font-weight: 950;
    color: #172033;
`;

const Excerpt = styled.p`
    margin: 0;
    color: #707987;
    font-size: 19px;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ArticleList = styled.div`
    display: grid;
    gap: 14px;
    margin-top: 16px;
`;

const ArticleCard = styled.article`
    display: grid;
    grid-template-columns: 142px 1fr;
    gap: 14px;
    min-height: 156px;
    border-radius: 22px;
    background: #ffffff;
    padding: 14px;
    box-shadow: 0 16px 32px rgba(30, 35, 50, 0.1);
`;

const ArticleImage = styled.div<{ $image: string }>`
    border-radius: 17px;
    background: linear-gradient(
            180deg,
            rgba(23, 32, 51, 0.02),
            rgba(23, 32, 51, 0.08)
        ),
        url(${({ $image }) => $image}) center/cover;
`;

const ArticleBody = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ArticleTitle = styled.h3`
    margin: 10px 0 10px;
    color: #172033;
    font-size: 21px;
    line-height: 1.28;
    font-weight: 950;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ArticleExcerpt = styled(Excerpt)`
    font-size: 17px;
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

const NewsPage: React.FunctionComponent = () => {
    const navigate = useNavigate();

    return (
        <NewsPageWrapper id="news-page">
            <HeaderPage>
                <BackButton
                    aria-label="Quay lại"
                    onClick={() => navigate("/", { direction: "backward" })}
                >
                    <Icon icon="zi-arrow-left" size={30} />
                </BackButton>
                <Title>Tin tức</Title>
            </HeaderPage>

            <CategoryBar>
                {categories.map(category => (
                    <CategoryPill
                        key={category.label}
                        $active={category.active}
                    >
                        {category.label}
                    </CategoryPill>
                ))}
            </CategoryBar>

            <Content>
                <FeaturedCard>
                    <FeaturedImage $image={featuredArticle.image} />
                    <FeaturedBody>
                        <Chip>{featuredArticle.category}</Chip>
                        <FeaturedTitle>{featuredArticle.title}</FeaturedTitle>
                        <Excerpt>{featuredArticle.excerpt}</Excerpt>
                    </FeaturedBody>
                </FeaturedCard>

                <ArticleList>
                    {articles.map(article => (
                        <ArticleCard key={article.title}>
                            <ArticleImage $image={article.image} />
                            <ArticleBody>
                                <Chip>{article.category}</Chip>
                                <ArticleTitle>{article.title}</ArticleTitle>
                                <ArticleExcerpt>
                                    {article.excerpt}
                                </ArticleExcerpt>
                            </ArticleBody>
                        </ArticleCard>
                    ))}
                </ArticleList>
            </Content>

            <FloatingActions>
                <FloatingButton aria-label="Mở rộng">
                    <Icon icon="zi-arrow-up" size={28} />
                </FloatingButton>
                <FloatingButton aria-label="Trò chuyện">
                    <Icon icon="zi-chat" size={31} />
                </FloatingButton>
            </FloatingActions>
        </NewsPageWrapper>
    );
};

export default NewsPage;
