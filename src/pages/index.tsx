import React from "react";
import { Route } from "react-router-dom";
import { AnimationRoutes, ZMPRouter } from "zmp-ui";

import {
    FeedbackPage,
    FeedbackDetailPage,
    CreateFeedbackPage,
} from "./Feedback";
import { GuidelinesPage } from "./Guidelines";
import { HomePage } from "./Home";
import { InformationGuidePage } from "./InformationGuide";
import { LegalDocumentsPage } from "./LegalDocuments";
import { NewsPage } from "./News";
import { PublicServicesPage } from "./PublicServices";
import { JobsPage } from "./Jobs";
import { IndustrialZonesPage } from "./IndustrialZones";
import { OCOPPage } from "./OCOP";
import { BusinessesPage } from "./Businesses";
import { TrafficFinesPage } from "./TrafficFines";
import { CreateScheduleAppointmentPage } from "./CreateScheduleAppointment";
import { AppointmentScheduleResultPage } from "./AppointmentScheduleResult";
import { SearchPage } from "./Search";
import { ProfilePage } from "./Profile";
import { RadioPage } from "./Radio";
import { TelevisionPage } from "./Television";

const Routes: React.FC = () => (
    <ZMPRouter>
        <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/index.html" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/legal-documents" element={<LegalDocumentsPage />} />
            <Route path="/public-services" element={<PublicServicesPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/industrial-zones" element={<IndustrialZonesPage />} />
            <Route path="/businesses" element={<BusinessesPage />} />
            <Route path="/traffic-fines" element={<TrafficFinesPage />} />
            <Route path="/radio" element={<RadioPage />} />
            <Route path="/television" element={<TelevisionPage />} />
            <Route path="/ocop" element={<OCOPPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />

            <Route path="/feedbacks" element={<FeedbackPage />} />
            <Route path="/feedbacks/:id" element={<FeedbackDetailPage />} />
            <Route path="/create-feedback" element={<CreateFeedbackPage />} />
            <Route
                path="/create-schedule-appointment"
                element={<CreateScheduleAppointmentPage />}
            />
            <Route
                path="/schedule-appointment-result"
                element={<AppointmentScheduleResultPage />}
            />
            <Route
                path="/information-guide"
                element={<InformationGuidePage />}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </AnimationRoutes>
    </ZMPRouter>
);

export default Routes;
