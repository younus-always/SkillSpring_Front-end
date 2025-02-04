import SectionTitle from "../shared/SectionTitle";

const Faq = () => {
  return (
    <section className="w-10/12 mx-auto py-10">
      <SectionTitle
        title={"Frequently Asked Questions"}
        subTitle={
          "Explore the most common questions and detailed answers to guide you."
        }
      />
      <div className="bg-white max-w-4xl mx-auto shadow-lg">
        <div className="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-lg font-medium border-b border-green-300">
            What is SkillSpring?
          </div>
          <div className="collapse-content pt-3">
            <p>
              SkillSpring is an online teaching platform designed to connect
              learners with expert instructors in various fields, offering
              interactive courses and resources to help you grow your skills.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-lg font-medium border-b border-green-300">
            How do I sign up for a course?
          </div>
          <div className="collapse-content pt-3">
            <p>
              Simply create an account, browse the available courses, and click
              the "Enroll" button on your desired course to get started.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-lg font-medium border-b border-green-300">
            Are there any prerequisites for enrolling in courses?
          </div>
          <div className="collapse-content pt-3">
            <p>
              Most courses do not have prerequisites, but some advanced courses
              may require prior knowledge. Check the course description for
              details.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-lg font-medium border-b border-green-300">
            What happens if I can’t complete a course?
          </div>
          <div className="collapse-content pt-3">
            <p>
              Don’t worry! You can learn at your own pace. Once enrolled, you’ll
              have lifetime access to the course materials.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-lg font-medium border-b border-green-300">
            What payment methods are accepted?
          </div>
          <div className="collapse-content pt-3">
            <p>
              We accept all major credit and debit cards, as well as online
              payment option Stripe.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3"/>
          <div className="collapse-title text-lg font-medium">
            Will I receive a certificate after completing a course?
          </div>
          <div className="collapse-content border-t border-green-300 pt-3">
            <p>
              Yes, upon completing a course, you will receive a digital
              certificate that you can showcase on your LinkedIn profile or
              resume.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
