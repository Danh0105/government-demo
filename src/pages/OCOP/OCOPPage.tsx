import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";
import Thumb from "@assets/thumb.png";
import Background from "@assets/background.png";
import SocialInsurance from "@assets/social-insurance.png";
import HeaderPage from "@/components/layout/HeaderPage";

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
    background: #f3f7fb;
    color: #082b55;
    padding: 112px 0 96px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
`;

const HeaderTitle = styled.h1`
    margin: 0;
    font-size: calc(23px * var(--app-font-scale));
    line-height: 1.1;
    font-weight: 900;
    color: #ffffff;
`;

const Content = styled.main`
    padding: 0 14px;
`;

const TabRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 9px;
    margin: 16px 0 20px;
`;

const TabButton = styled.button<{ $active?: boolean }>`
    min-height: 48px;
    border: 1px solid ${({ $active }) => ($active ? "#0878bd" : "#d4e6f4")};
    border-radius: 15px;
    padding: 10px 8px;
    font-size: calc(12px * var(--app-font-scale));
    line-height: 1.25;
    font-weight: 800;
    text-align: center;

    color: ${({ $active }) => ($active ? "#ffffff" : "#164b78")};
    background: ${({ $active }) =>
        $active
            ? "linear-gradient(135deg, #075d9c 0%, #0788cf 100%)"
            : "#ffffff"};

    box-shadow: ${({ $active }) =>
        $active
            ? "0 9px 18px rgba(7, 120, 189, 0.24)"
            : "0 6px 16px rgba(17, 76, 120, 0.06)"};

    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:active {
        transform: scale(0.97);
    }
`;

const ProductList = styled.div`
    display: grid;
    gap: 14px;
    margin-bottom: 24px;
`;

const ProductCard = styled.button`
    width: 100%;
    border: 1px solid #e3edf5;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(11, 73, 121, 0.07);
    display: flex;
    gap: 13px;
    padding: 13px;
    text-align: left;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:active {
        transform: scale(0.985);
        box-shadow: 0 6px 16px rgba(11, 73, 121, 0.1);
    }
`;

const ProductImage = styled.div<{ $image: string }>`
    width: 84px;
    height: 84px;
    border-radius: 17px;
    background: url(${({ $image }) => $image}) center/cover;
    flex-shrink: 0;
    border: 1px solid #e0ebf4;
`;

const ProductInfo = styled.div`
    min-width: 0;
    display: grid;
    gap: 6px;
`;

const ProductName = styled.h2`
    margin: 0;
    font-size: calc(16px * var(--app-font-scale));
    line-height: 1.3;
    font-weight: 900;
    color: #082b55;
`;

const ProductSubtitle = styled.p`
    margin: 0;
    color: #66829c;
    font-size: calc(13px * var(--app-font-scale));
    line-height: 1.45;
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
    color: #0878bd;
`;

const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 11px;
    border-radius: 999px;
    background: #fff5d9;
    color: #b46800;
    border: 1px solid #ffe5a5;
    font-size: calc(12px * var(--app-font-scale));
    font-weight: 900;
`;

const EmptyState = styled.div`
    margin-top: 40px;
    padding: 32px 18px;
    border-radius: 20px;
    text-align: center;
    background: #ffffff;
    border: 1px solid #e3edf5;
    box-shadow: 0 10px 24px rgba(11, 73, 121, 0.07);
    color: #66829c;
    font-size: calc(15px * var(--app-font-scale));
`;

const IconButton = styled.button`
    width: 44px;
    height: 44px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 42, 82, 0.18);
    backdrop-filter: blur(8px);

    &:active {
        transform: scale(0.96);
    }
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
            <HeaderPage>
                <IconButton onClick={() => navigate(-1)}>
                    <Icon icon="zi-arrow-left" size={20} />
                </IconButton>
                <HeaderTitle>Sản phẩm</HeaderTitle>
                <div style={{ width: 48 }} />
            </HeaderPage>

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

export default OCOPPage;
