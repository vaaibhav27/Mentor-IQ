import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardWrapper from "./pages/DashboardWrapper";
import LearnerDashboard from "./pages/LearnerDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import MentorMarketplace from "./pages/MentorMarketplace";
import ChatPage from "./pages/ChatPage";
import AdminDashboard from "./pages/AdminDashboard";
import SessionWorkspace from "./pages/SessionWorkspace";
import MyMentors from "./pages/MyMentors";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardWrapper,
    children: [
      {
        path: "home",
        Component: HomePage,
      },
      {
        path: "learner",
        Component: HomePage,
      },
      {
        path: "mentor",
        Component: MentorDashboard,
      },
      {
        path: "marketplace",
        Component: MentorMarketplace,
      },
      {
        path: "mentors",
        Component: MyMentors,
      },
      {
        path: "chat",
        Component: ChatPage,
      },
      {
        path: "chat/:userId",
        Component: ChatPage,
      },
      {
        path: "admin",
        Component: AdminDashboard,
      },
      {
        path: "workspace",
        Component: SessionWorkspace,
      },
      {
        index: true,
        element: <Navigate to="home" replace />, // Default, handled by DashboardWrapper logic
      }
    ],
  },
]);