import { FaBook, FaHeart, FaUsers, FaTruck, FaAward, FaLeaf } from "react-icons/fa";

const AboutPage = () => {
  const stats = [
    { number: "50K+", label: "Happy Readers" },
    { number: "10K+", label: "Books Available" },
    { number: "500+", label: "Authors" },
    { number: "15+", label: "Years Experience" },
  ];

  const values = [
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Passion for Reading",
      description: "We believe in the transformative power of books and strive to share that passion with every customer.",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Community First",
      description: "Building a community of book lovers who share, discuss, and celebrate the joy of reading together.",
    },
    {
      icon: <FaTruck className="text-3xl" />,
      title: "Fast Delivery",
      description: "We ensure your books reach you quickly and safely, because we know you can't wait to start reading.",
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: "Quality Selection",
      description: "Every book in our collection is carefully curated to ensure we offer only the best to our readers.",
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Eco-Friendly",
      description: "We're committed to sustainable practices, from eco-friendly packaging to supporting digital reading.",
    },
    {
      icon: <FaBook className="text-3xl" />,
      title: "Knowledge Sharing",
      description: "We organize events, book clubs, and author meetups to foster a culture of continuous learning.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "👩‍💼",
      description: "A lifelong bibliophile with 20 years in the publishing industry.",
    },
    {
      name: "Michael Chen",
      role: "Head of Curation",
      image: "👨‍💼",
      description: "Former librarian with an encyclopedic knowledge of literature.",
    },
    {
      name: "Emily Williams",
      role: "Customer Experience",
      image: "👩‍💻",
      description: "Dedicated to making every reader's journey memorable.",
    },
    {
      name: "David Brown",
      role: "Operations Manager",
      image: "👨‍🔧",
      description: "Ensures your books arrive on time, every time.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <FaBook className="text-3xl" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Jenova</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Welcome to Jenova, your trusted destination for discovering, exploring, and 
              falling in love with books. Since 2010, we've been on a mission to connect 
              readers with stories that inspire, educate, and entertain.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-orange-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-orange-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Jenova began as a small bookshop in the heart of Library City, founded by 
                a group of passionate readers who believed that everyone deserves access to 
                great literature. What started as a cozy corner store has grown into one of 
                the region's most beloved book destinations.
              </p>
              <p>
                Our journey has been shaped by the countless readers who've walked through 
                our doors and browsed our virtual shelves. Each interaction has taught us 
                something new about the power of storytelling and the importance of finding 
                the right book at the right time.
              </p>
              <p>
                Today, we're proud to serve readers across the country, offering a carefully 
                curated selection of books across all genres. From timeless classics to the 
                latest bestsellers, from children's picture books to academic texts, we have 
                something for every reader.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 flex items-center justify-center min-h-80">
            <div className="text-center">
              <span className="text-8xl mb-4 block">📚</span>
              <p className="text-orange-800 font-medium">Serving readers since 2010</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at Jenova, from selecting books to serving our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate people behind Jenova who work tirelessly to bring you the best reading experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-6xl">{member.image}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                <p className="text-orange-500 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            "To inspire a love of reading in every person we serve, by providing access to 
            diverse, quality books and creating a welcoming community where stories come alive."
          </p>
          <div className="flex justify-center">
            <a 
              href="/books" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Explore Our Collection
            </a>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-orange-50 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you're looking for a book recommendation 
            or have feedback to share, our team is here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
