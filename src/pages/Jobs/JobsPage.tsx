import React from "react";
import styled from "styled-components";
import { Icon, Page, useNavigate } from "zmp-ui";

type JobItem = {
    title: string;
    location: string;
    salary: string;
    type: string;
};

const jobs: JobItem[] = [
    {
        title: "Giáo Viên Tiếng Anh Dạy Online Tại Nhà",
        location: "Tất cả địa điểm trên Tỉnh Thanh Hoá",
        salary: "3.000.000 - 15.000.000",
        type: "Toàn thời gian",
    },
    {
        title: "Nhân Viên Kinh Doanh/ Sale / Tư Vấn Bán Hàng Xe Toyota",
        location: "Tất cả địa điểm trên Tỉnh Thanh Hoá",
        salary: "10.000.000 - 15.000.000",
        type: "Toàn thời gian",
    },
    {
        title: "Giám đốc dịch vụ khách hàng",
        location: "Tất cả địa điểm trên Tỉnh Thanh Hoá",
        salary: "Có thương lượng",
        type: "Toàn thời gian",
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
    font-size: 28px;
    line-height: 1.05;
    font-weight: 950;
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
        color: #8d949e;
    }
`;

const JobList = styled.div`
    display: grid;
    gap: 14px;
    margin-top: 26px;
`;

const JobCard = styled.article`
    border-radius: 22px;
    background: #ffffff;
    padding: 20px 17px 19px;
    box-shadow: 0 12px 25px rgba(18, 28, 45, 0.1);
    border: 1px solid rgba(143, 153, 168, 0.08);
`;

const JobTitle = styled.h2`
    margin: 0 0 18px;
    color: #182132;
    font-size: 21px;
    line-height: 1.32;
    font-weight: 950;
`;

const LocationRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #868d97;
    font-size: 17px;
    line-height: 1.35;
    font-weight: 600;
`;

const DetailRow = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 12px;
    flex-wrap: wrap;
`;

const Salary = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #128967;
    font-size: 17px;
    line-height: 1.25;
    font-weight: 900;
`;

const WorkType = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #9aa0a8;
    font-size: 17px;
    line-height: 1.25;
    font-weight: 650;
`;

const MoneyMark = styled.span`
    color: #13a279;
    font-size: 19px;
    font-weight: 950;
`;

const SuitcaseIcon = styled.span`
    position: relative;
    width: 18px;
    height: 15px;
    border: 2px solid #a3a8b0;
    border-radius: 4px;
    flex: none;

    &::before {
        content: "";
        position: absolute;
        left: 4px;
        right: 4px;
        top: -6px;
        height: 6px;
        border: 2px solid #a3a8b0;
        border-bottom: 0;
        border-radius: 5px 5px 0 0;
    }
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

const JobsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper id="jobs-page">
            <Header>
                <IconButton
                    aria-label="Quay lại"
                    onClick={() => navigate("/", { direction: "backward" })}
                >
                    <Icon icon="zi-arrow-left" size={30} />
                </IconButton>
                <Title>Việc làm</Title>
                <Capsule aria-hidden="true">
                    <span>...</span>
                    <span>×</span>
                </Capsule>
            </Header>

            <Content>
                <SearchBox>
                    <SearchInput placeholder="Tìm việc theo tiêu đề hoặc địa điểm..." />
                </SearchBox>

                <JobList>
                    {jobs.map(job => (
                        <JobCard key={job.title}>
                            <JobTitle>{job.title}</JobTitle>
                            <LocationRow>
                                <Icon icon="zi-location" size={18} />
                                <span>{job.location}</span>
                            </LocationRow>
                            <DetailRow>
                                <Salary>
                                    <MoneyMark>$</MoneyMark>
                                    {job.salary}
                                </Salary>
                                <WorkType>
                                    <SuitcaseIcon aria-hidden="true" />
                                    {job.type}
                                </WorkType>
                            </DetailRow>
                        </JobCard>
                    ))}
                </JobList>
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

export default JobsPage;
