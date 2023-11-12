import "./App.css";
import { useState, useEffect } from "react";
import {
  Routes, Route,
  //  createBrowserRouter,
  // RouterProvider,
  // useLoaderData,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import AdminSupervisionPanel from "./components/admin/adminSupervisionPanel";
import ModalProfile from "./components/ModalProfile";
import CanvasHandler from "./components/testsForCanvas/CanvasHandler";
import AdminMonitoring from "./components/admin/monitoring/AdminMonitoring";
import HandmadeCarousel from "./components/commons/HandmadeCarousel";
import Test from "./components/Test";
import MyAddresses from "./components/ownerflow/MyAddresses";
import AddAddress from "./components/ownerflow/addAddress";
import OwnerCalendar from "./components/ownerflow/calendar/OwnerCalendar";
import SomeFormContainer from "./components/traveller/ratingsOpinions/SomeFormContainer";
import View from "./components/View";

import MainHeader from "./components/commons/mainHeader/MainHeader";

import ProtectedConnectedRoute from "./ProtectedConnectedRoute";
import ProtectedOwnerRoute from "./ProtectedOwnerRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

import { Auth0Provider } from "@auth0/auth0-react";

/** data fetching, handling stale, caching etc */
import { QueryClient, QueryClientProvider } from "react-query";


import Home from "./components/Home";

import LandingPage from "./components/landing/landingPage";

import AnimationsContainer from "./components/animationsInProgress/AnimationsContainer";

import CreateListingContainer from "./components/listings/createListingContainer";
import { getCurrentUser } from "./store";

const queryClient = new QueryClient();

function App() {

  const isProfileModalOpen = useSelector((state) => state.actionsApp.isProfileModalOpen);

  const currentUser = useSelector(getCurrentUser)

  const [scrollPosition, setScrollPosition] = useState(0);

  const dispatch = useDispatch();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const toggleModal = () => {
    dispatch({ type: "toggleModal" });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);   // C'est horrible d'avoir fait ça ici car ça trigger un million de rerender
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      const userFromLs = window.localStorage.getItem('currentUser')
      if (userFromLs) {
        dispatch({
          type: "CURRENT_USER_LOADED",
          currentUser: JSON.parse(userFromLs)
        })
      }
    }

  }, [currentUser])   // transform this into a custom hook

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain="dev-krwzyahzquw3xi4y.us.auth0.com"
        clientId="HdLXXtl17kfIijcCUhybXDVbrQbxMcr0"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <div className="App">
          <MainHeader
            down={scrollPosition > 20}
            toggleModal={toggleModal}
            isModalOpen={isProfileModalOpen}
          />
          {isProfileModalOpen && <ModalProfile />}
          <Routes>
            {/* <Route path='/' element={<} */}
            <Route path='/' element={<LandingPage loadingFunction={() => console.log("OI LOADING FN")} />}  />
            <Route path='/owner'>
              <Route path="register" />
              <Route path="listings">
                <Route path='create' element={<CreateListingContainer />}/>
                <Route path='list' />     {/* list of listings */}
              </Route>
            </Route>
            <Route path="/View" element={<View />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/admin" element={<AdminSupervisionPanel />} />
            <Route path="/monitoring" element={<AdminMonitoring />} />
            <Route path="/canvas" element={<CanvasHandler />} />
            <Route path='/carouselTest' element={<HandmadeCarousel />} />
            <Route path='/test' element={<Test />}>
              <Route path='addresses' element={<MyAddresses />} />
              <Route path='addAddress' element={<AddAddress />} />
              <Route path='possession' />
              <Route path='skills' />
              <Route path='calendar' element={<OwnerCalendar />} />
            </Route>
            <Route path='/ratings' element={<SomeFormContainer />} />
            <Route path='/animations' element={<AnimationsContainer />} />
          </Routes>
        </div>
      </Auth0Provider>
    </QueryClientProvider>
  );
}

export default App;
