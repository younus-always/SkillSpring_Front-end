
const SectionTitle = ({ title, subTitle }) => {
      return (
            <div className="w-11/12 max-w-2xl mx-auto text-center py-8">
                  <h2 data-aos="zoom-in-right" className="font-semibold text-2xl md:text-3xl text-green-600/90">{title}</h2>
                  <p data-aos="zoom-in-left" data-aos-duration="5000" className="text-gray-500 mt-1 text-sm sm:text-base">{subTitle}</p>
            </div>
      )
}

export default SectionTitle