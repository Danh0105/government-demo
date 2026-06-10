import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import Thumb from "@assets/thumb.png";
import Background from "@assets/background.png";
import SocialInsurance from "@assets/social-insurance.png";

type CategoryId = "all" | "coop" | "regional";

type Category = {
    id: CategoryId;
    label: string;
};

type Product = {
    title: string;
    subtitle: string;
    badge: string;
    image: string;
    category: CategoryId;
};

const categories: Category[] = [
    { id: "all", label: "Tất cả" },
    { id: "coop", label: "Sản phẩm Hợp tác xã" },
    { id: "regional", label: "Đặc sản vùng" },
];

const products: Product[] = [
    {
        title: "Nem Chua Dài Truyền Thống",
        subtitle: "Chua dịu chuẩn vị xưa – giữ trọn hương vị miền núi",
        badge: "OCOP 3★",
        image: Thumb,
        category: "coop",
    },
    {
        title: "Nước cốt hoa Atiso",
        subtitle: "Nước cốt Atiso đỏ không chỉ mang hương vị đặc trưng",
        badge: "OCOP 4★",
        image: Background,
        category: "regional",
    },
    {
        title: "Mắm Tép Chung Thịt Ba Làng TH Tuyến Hòa",
        subtitle:
            "Mắm Tép Chung Thịt Ba Làng TH Tuyến Hòa đặc sản truyền thống",
        badge: "OCOP 3★",
        image: SocialInsurance,
        category: "coop",
    },
    {
        title: "Mắm Tôm Đặc Biệt Tuyến Hòa Ba Làng TH",
        subtitle: "Mắm Tôm đặc biệt với vị đậm đà của quê hương",
        badge: "OCOP 3★",
        image: Thumb,
        category: "regional",
    },
    {
        title: "Nước Mắm Cốt Đặc Biệt Ba Làng TH 400 Năm Truyền Thống",
        subtitle: "Cốt nước mắm đặc biệt chuẩn vị truyền thống Việt",
        badge: "OCOP 4★",
        image: Background,
        category: "regional",
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
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.9)
    );
    backdrop-filter: blur(12px);
`;

const HeaderTitle = styled.h1`
    margin: 0;
    font-size: 24px;
    line-height: 1.1;
    font-weight: 900;
    color: #1b1f26;
`;

const Content = styled.main`
    padding: 0 14px;
`;

const TabRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 16px 0 20px;
`;

const TabButton = styled.button<{ $active?: boolean }>`
    min-height: 46px;
    border: 0;
    border-radius: 16px;
    padding: 12px 12px;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    color: ${({ $active }) => ($active ? "#ffffff" : "#4b5563")};
    background: ${({ $active }) => ($active ? "#d8162a" : "#ffffff")};
    box-shadow: ${({ $active }) =>
        $active
            ? "0 10px 20px rgba(216, 22, 42, 0.18)"
            : "0 8px 18px rgba(18, 28, 45, 0.06)"};
`;

const ProductList = styled.div`
    display: grid;
    gap: 14px;
    margin-bottom: 24px;
`;

const ProductCard = styled.button`
    width: 100%;
    border: 0;
    border-radius: 22px;
    background: #ffffff;
    box-shadow: 0 12px 28px rgba(18, 28, 45, 0.08);
    display: flex;
    gap: 14px;
    padding: 14px;
    text-align: left;
    align-items: center;
    cursor: pointer;
`;

const ProductImage = styled.div<{ $image: string }>`
    width: 82px;
    height: 82px;
    border-radius: 18px;
    background: url(${({ $image }) => $image}) center/cover;
    flex-shrink: 0;
`;

const ProductInfo = styled.div`
    min-width: 0;
    display: grid;
    gap: 6px;
`;

const ProductName = styled.h2`
    margin: 0;
    font-size: 17px;
    line-height: 1.25;
    font-weight: 900;
    color: #121828;
`;

const ProductSubtitle = styled.p`
    margin: 0;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ProductFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(216, 22, 42, 0.12);
    color: #d8162a;
    font-size: 13px;
    font-weight: 800;
`;

const EmptyState = styled.div`
    margin-top: 40px;
    padding: 32px 18px;
    border-radius: 24px;
    text-align: center;
    background: #ffffff;
    box-shadow: 0 12px 28px rgba(18, 28, 45, 0.08);
    color: #4b5563;
    font-size: 16px;
`;

const OCOPPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");

    const filteredProducts = useMemo(
        () =>
            selectedCategory === "all"
                ? products
                : products.filter(
                      product => product.category === selectedCategory,
                  ),
        [selectedCategory],
    );

    return (
        <PageWrapper>
            <Header>
                <IconButton onClick={() => navigate(-1)}>
                    <Icon icon="zi-arrow-left" size={20} />
                </IconButton>
                <HeaderTitle>Sản phẩm</HeaderTitle>
                <div style={{ width: 48 }} />
            </Header>

            <Content>
                <TabRow>
                    {categories.map(category => (
                        <TabButton
                            key={category.id}
                            $active={category.id === selectedCategory}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.label}
                        </TabButton>
                    ))}
                </TabRow>

                <ProductList>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.title}>
                                <ProductImage $image={product.image} />
                                <ProductInfo>
                                    <ProductName>{product.title}</ProductName>
                                    <ProductSubtitle>
                                        {product.subtitle}
                                    </ProductSubtitle>
                                    <ProductFooter>
                                        <Badge>{product.badge}</Badge>
                                        <Icon
                                            icon="zi-chevron-right"
                                            size={18}
                                        />
                                    </ProductFooter>
                                </ProductInfo>
                            </ProductCard>
                        ))
                    ) : (
                        <EmptyState>Không có sản phẩm phù hợp.</EmptyState>
                    )}
                </ProductList>
            </Content>
        </PageWrapper>
    );
};

const IconButton = styled.button`
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.82);
    color: #d8162a;
    box-shadow: 0 8px 24px rgba(18, 28, 45, 0.12);
`;

export default OCOPPage;
