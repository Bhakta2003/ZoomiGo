import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'

/////////////////////////////////////
import car_top from './car_top.png'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'
import img5 from './img5.png'
import img6 from './img6.png'
import img7 from './img7.png'
import img8 from './img8.png'
import img9 from './img9.png'
import img10 from './img10.png'
import Cars from './car.jpeg'
import Bikes from './bike.png'
import SUVs from './suv.png'
import Scooters from './scooter.jpg'
import SportsBikes from './sportsbike.png'
import Vans from './van.png'
import veh1 from './ToyotaCorolla.png'
import veh2 from './HondaCivic.png'
import veh3 from './RoyalEnfield.png'
import veh4 from './Pulsar.png'
import veh5 from './TvsJupiter.png'
import veh6 from './ToyotaFortuner.png'
import veh7 from './HyundaiCreta.png'
import veh8 from './KtmDuke.png'
import veh9 from './HondaActiva.png'
import veh10 from './MahindraThar.png'
import veh11 from './SuzukiEeco.png'
import veh12 from './YamahaR15.png'
import veh13 from './Tesla.png'
import veh14 from './VolkswagenPolo.png'
import veh15 from './MercedesSprinter.png'
import pointing_man from './man-pointing.png'
import homepage_video from './homepage_video.mp4'
import clock from './clock.png'
import tree from './tree.png'
import car1 from './car1.png'
import payment from './payment.png'



export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    ////////////////////
    car_top,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    pointing_man,
    homepage_video,
}


export const premiumServices = [
    {
        image: clock,
        title: "Available 24/7",
        description: "Round-the-clock vehicle access with instant booking confirmation and emergency roadside assistance"
    },
    {
        image: tree,
        title: "Eco-Friendly",
        description: "Low-emission hybrid and electric vehicles to reduce your environmental impact"
    },
    {
        image: car1,
        title: "Well-Maintained Fleet",
        description: "Regularly serviced vehicles with comprehensive safety checks before every rental"
    },
    {
        image: payment,
        title: "Secure Payment",
        description: "Encrypted transactions with multiple payment options and fraud protection"
    }
]



export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]



export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]


export const typeData = [
    {
        type: 'Car',
        image: Cars
    },
    {
        type: 'Bike',
        image: Bikes
    },
    {
        type: 'Suv',
        image: SUVs
    },
    {
        type: 'Scooter',
        image: Scooters
    },
    {
        type: 'Sports Bike',
        image: SportsBikes
    },
    {
        type: 'Van',
        image: Vans
    }
];

export const vehicles = [
    {
        _id: "veh1",
        name: "Toyota Corolla",
        image: veh1,
        type: "Car",
        stars: 4,
        seats: 5,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 500,
        about: "The Toyota Corolla is a legendary sedan renowned for its reliability and fuel efficiency. With a comfortable ride, low maintenance costs, and advanced safety features, it's the perfect choice for both families and daily commuters."
    },
    {
        _id: "veh2",
        name: "Honda Civic",
        image: veh2,
        type: "Car",
        stars: 3,
        seats: 5,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 700,
        about: "The Honda Civic blends sporty aesthetics with cutting-edge technology. Its responsive handling, premium interior, and fuel-efficient engine make it a standout in the compact sedan segment."
    },
    {
        _id: "veh3",
        name: "Royal Enfield Classic 350",
        image: veh3,
        type: "Bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 900,
        about: "A timeless icon, the Royal Enfield Classic 350 delivers a thumping engine note and retro charm. Its relaxed ergonomics and sturdy build make it ideal for leisurely rides and long journeys."
    },
    {
        _id: "veh4",
        name: "Bajaj Pulsar NS200",
        image: veh4,
        type: "Sports bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 400,
        about: "The Pulsar NS200 is a performance beast with a liquid-cooled engine and aggressive styling. Designed for thrill-seekers, it offers sharp handling and explosive acceleration."
    },
    {
        _id: "veh5",
        name: "TVS Jupiter",
        image: veh5,
        type: "Scooter",
        stars: 4,
        seats: 2,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 300,
        about: "Practical and stylish, the TVS Jupiter excels in urban commutes with its excellent mileage, spacious storage, and hassle-free automatic transmission."
    },
    {
        _id: "veh6",
        name: "Toyota Fortuner",
        image: veh6,
        type: "Suv",
        stars: 4,
        seats: 7,
        gear: "Automatic",
        fuel: "Diesel",
        fees: 1000,
        about: "The Fortuner is a rugged yet luxurious SUV that dominates both city roads and off-road trails. With its powerful engine and premium cabin, it’s built for adventure and comfort."
    },
    {
        _id: "veh7",
        name: "Hyundai Creta",
        image: veh7,
        type: "Suv",
        stars: 3,
        seats: 5,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 900,
        about: "The Hyundai Creta combines bold design with futuristic features. Its plush interiors, smooth ride, and advanced tech make it a top-tier compact SUV."
    },
    {
        _id: "veh8",
        name: "KTM Duke 390",
        image: veh8,
        type: "Sports bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 700,
        about: "The Duke 390 is a streetfighter with a lightweight chassis and explosive power. Designed for aggressive riding, it’s a favorite among performance enthusiasts."
    },
    {
        _id: "veh9",
        name: "Honda Activa 6G",
        image: veh9,
        type: "Scooter",
        stars: 3,
        seats: 2,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 400,
        about: "India's best-selling scooter, the Activa 6G offers unmatched reliability, smooth acceleration, and a comfortable ride for daily commutes."
    },
    {
        _id: "veh10",
        name: "Mahindra Thar",
        image: veh10,
        type: "Suv",
        stars: 4,
        seats: 4,
        gear: "Manual",
        fuel: "Diesel",
        fees: 1100,
        about: "The Thar is a rugged off-roader with retro-modern styling. Its go-anywhere capability and open-top design make it a symbol of adventure."
    },
    {
        _id: "veh11",
        name: "Maruti Suzuki Eeco",
        image: veh11,
        type: "Van",
        stars: 3,
        seats: 7,
        gear: "Manual",
        fuel: "CNG",
        fees: 300,
        about: "A budget-friendly people-carrier, the Eeco offers unmatched practicality with its spacious cabin and ultra-low running costs."
    },
    {
        _id: "veh12",
        name: "Yamaha R15 V4",
        image: veh12,
        type: "Sports bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 500,
        about: "The R15 V4 is a track-inspired bike with a high-revving engine and aerodynamic design. Perfect for riders craving sporty performance."
    },
    {
        _id: "veh13",
        name: "Tesla Model S",
        image: veh13,
        type: "Car",
        stars: 4,
        seats: 5,
        gear: "Automatic",
        fuel: "Electric",
        fees: 1000,
        about: "A marvel of electric innovation, the Model S offers blistering acceleration, futuristic tech, and a luxurious zero-emission driving experience."
    },
    {
        _id: "veh14",
        name: "Volkswagen Polo",
        image: veh14,
        type: "Car",
        stars: 3,
        seats: 5,
        gear: "Manual",
        fuel: "Petrol",
        fees: 700,
        about: "The Polo is a German-engineered hatchback known for its solid build quality, fun-to-drive dynamics, and premium feel."
    },
    {
        _id: "veh15",
        name: "Mercedes-Benz Sprinter",
        image: veh15,
        type: "Van",
        stars: 4,
        seats: 12,
        gear: "Automatic",
        fuel: "Diesel",
        fees: 1200,
        about: "The Sprinter redefines luxury in the van segment with its spacious interior, advanced safety systems, and refined diesel engine."
    }
];