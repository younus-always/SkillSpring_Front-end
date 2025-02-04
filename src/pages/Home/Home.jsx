import Banner from "../../components/Home/Banner";
import BecomeATeacher from "../../components/Home/BecomeATeacher";
import Faq from "../../components/Home/Faq";
import FeaturedClass from "../../components/Home/FeaturedClass";
import OurPartners from "../../components/Home/OurPartners";
import Review from "../../components/Home/Review";
import Statistics from "../../components/Home/Statistics";
import useTitle from "../../hooks/useTitle";

const Home = () => {
      useTitle('Home');

      return (
            <>
                  <Banner />
                  <OurPartners />
                  <FeaturedClass />
                  <BecomeATeacher />
                  <Statistics />
                  <Review />
                  <Faq />
            </>
      )
}

export default Home