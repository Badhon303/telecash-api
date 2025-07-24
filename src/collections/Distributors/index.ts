import type { CollectionConfig } from 'payload'
import { AdminsOrSuperAdmins } from '@/utils/admins-or-super-admins'
import { SuperAdmins } from '@/utils/super-admins'

export const Distributors: CollectionConfig = {
  slug: 'distributors',
  admin: {
    useAsTitle: 'email',
    hideAPIURL: process.env.NODE_ENV !== 'development' ? true : false,
    components: {
      listMenuItems: ['./components/ExportDistributorsButton'],
    },
    defaultColumns: [
      'date',
      'name',
      'phoneNo',
      'email',
      'businessName',
      'district',
      'policeStation',
      'nid',
      'tradeLicense',
      'TradeLicenseExpiryMonth',
      'TradeLicenseExpiryYear',
    ],
  },
  access: {
    read: AdminsOrSuperAdmins,
    create: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin') {
          return false
        }
      }
      return true
    },
    update: AdminsOrSuperAdmins,
    delete: SuperAdmins,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      defaultValue: () => new Date(),
      validate: (value) => {
        if (!value) {
          return 'Registration date is required.'
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0) // Normalize today to start of day

        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1) // Normalize yesterday to start of day

        const registrationDate = new Date(value)
        registrationDate.setHours(0, 0, 0, 0) // Normalize registration date to start of day

        if (
          registrationDate.getTime() === today.getTime() ||
          registrationDate.getTime() === yesterday.getTime()
        ) {
          return true
        }
        return 'Registration date can only be today or yesterday.'
      },
    },
    {
      name: 'name',
      type: 'text',
      maxLength: 99,
      required: true,
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string') {
              return value.trim() // This will remove leading and trailing spaces
            }
            return value
          },
        ],
      },
    },
    {
      name: 'phoneNo',
      type: 'text',
      maxLength: 14, // regex may required
      required: true,
      unique: true,
      validate: (value: unknown) => {
        const stringValue = value as string | undefined // Cast to expected type

        if (!stringValue) return true // Allow empty phone number if not required

        // Regex for Bangladeshi mobile numbers
        const bdMobileRegex = /^01[3-9]\d{8}$/

        if (bdMobileRegex.test(stringValue)) {
          return true
        }
        return 'Please enter a valid phone number (e.g. 01783558935)'
      },
    },
    {
      name: 'email',
      type: 'text',
      maxLength: 99,
      required: true,
      unique: true,
      validate: async (value: unknown) => {
        const stringValue = value as string | undefined // Cast to expected type
        if (!stringValue) {
          return 'Email is required.'
        }
        // Basic email regex for common email patterns
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(stringValue)) {
          return 'Please enter a valid email address.'
        }

        return true
      },
    },
    {
      name: 'businessName',
      type: 'text',
      maxLength: 999,
      required: true,
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string') {
              return value.trim() // This will remove leading and trailing spaces
            }
            return value
          },
        ],
      },
    },
    {
      name: 'district', // Changed to lowercase for conventional naming
      label: 'District', // Label for the admin UI
      type: 'select',
      required: true, // Assuming a district selection is required
      options: [
        { label: 'Bagerhat', value: 'bagerhat' },
        { label: 'Bandarban', value: 'bandarban' },
        { label: 'Barguna', value: 'barguna' },
        { label: 'Barisal', value: 'barisal' },
        { label: 'Bhola', value: 'bhola' },
        { label: 'Bogra', value: 'bogra' },
        { label: 'Brahmanbaria', value: 'brahmanbaria' },
        { label: 'Chandpur', value: 'chandpur' },
        { label: 'Chapai Nawabganj', value: 'chapai-nawabganj' },
        { label: 'Chattogram', value: 'chattogram' }, // Often called Chittagong
        { label: 'Chuadanga', value: 'chuadanga' },
        { label: 'Comilla', value: 'comilla' },
        { label: "Cox's Bazar", value: 'coxs-bazar' },
        { label: 'Dhaka', value: 'dhaka' },
        { label: 'Dinajpur', value: 'dinajpur' },
        { label: 'Faridpur', value: 'faridpur' },
        { label: 'Feni', value: 'feni' },
        { label: 'Gaibandha', value: 'gaibandha' },
        { label: 'Gazipur', value: 'gazipur' },
        { label: 'Gopalganj', value: 'gopalganj' },
        { label: 'Habiganj', value: 'habiganj' },
        { label: 'Jamalpur', value: 'jamalpur' },
        { label: 'Jessore', value: 'jessore' },
        { label: 'Jhalokati', value: 'jhalokati' },
        { label: 'Jhenaidah', value: 'jhenaidah' },
        { label: 'Joypurhat', value: 'joypurhat' },
        { label: 'Khagrachari', value: 'khagrachari' },
        { label: 'Khulna', value: 'khulna' },
        { label: 'Kishoreganj', value: 'kishoreganj' },
        { label: 'Kurigram', value: 'kurigram' },
        { label: 'Kushtia', value: 'kushtia' },
        { label: 'Lakshmipur', value: 'lakshmipur' },
        { label: 'Lalmonirhat', value: 'lalmonirhat' },
        { label: 'Madaripur', value: 'madaripur' },
        { label: 'Magura', value: 'magura' },
        { label: 'Manikganj', value: 'manikganj' },
        { label: 'Meherpur', value: 'meherpur' },
        { label: 'Moulvibazar', value: 'moulvibazar' },
        { label: 'Munshiganj', value: 'munshiganj' },
        { label: 'Mymensingh', value: 'mymensingh' },
        { label: 'Naogaon', value: 'naogaon' },
        { label: 'Narail', value: 'narail' },
        { label: 'Narayanganj', value: 'narayanganj' },
        { label: 'Narsingdi', value: 'narsingdi' },
        { label: 'Natore', value: 'natore' },
        { label: 'Netrokona', value: 'netrokona' },
        { label: 'Nilphamari', value: 'nilphamari' },
        { label: 'Noakhali', value: 'noakhali' },
        { label: 'Pabna', value: 'pabna' },
        { label: 'Panchagarh', value: 'panchagarh' },
        { label: 'Patuakhali', value: 'patuakhali' },
        { label: 'Pirojpur', value: 'pirojpur' },
        { label: 'Rajbari', value: 'rajbari' },
        { label: 'Rajshahi', value: 'rajshahi' },
        { label: 'Rangamati', value: 'rangamati' },
        { label: 'Rangpur', value: 'rangpur' },
        { label: 'Satkhira', value: 'satkhira' },
        { label: 'Shariatpur', value: 'shariatpur' },
        { label: 'Sherpur', value: 'sherpur' },
        { label: 'Sirajganj', value: 'sirajganj' },
        { label: 'Sunamganj', value: 'sunamganj' },
        { label: 'Sylhet', value: 'sylhet' },
        { label: 'Tangail', value: 'tangail' },
        { label: 'Thakurgaon', value: 'thakurgaon' },
      ],
    },
    {
      name: 'policeStation',
      type: 'text',
      maxLength: 999,
      required: true,
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string') {
              return value.trim() // This will remove leading and trailing spaces
            }
            return value
          },
        ],
      },
    },
    {
      name: 'nid',
      label: 'NID Number', // Added a label for clarity in admin UI
      type: 'text', // Changed to 'text' to handle long numbers without precision issues
      required: true,
      unique: true,
      validate: (value: unknown) => {
        const stringValue = value as string | undefined

        if (!stringValue) {
          return 'NID is required.' // Specific message if required and empty
        }

        // Regex to check if it's only digits and between 5 to 20 digits long
        const nidRegex = /^\d{5,20}$/ // Matches 5 to 20 digits

        if (nidRegex.test(stringValue)) {
          return true
        }

        return 'Please enter a valid NID number (5 to 20 digits).'
      },
    },
    {
      name: 'tradeLicenseNo',
      type: 'text',
      maxLength: 30,
      required: true,
      unique: true,
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string') {
              return value.trim() // This will remove leading and trailing spaces
            }
            return value
          },
        ],
      },
    },
    {
      name: 'tradeLicenseExpiryMonth',
      label: 'Trade License Expiry Month', // Added a label for clarity
      type: 'select',
      required: true,
      options: [
        { label: 'January', value: 'january' },
        { label: 'February', value: 'february' },
        { label: 'March', value: 'march' },
        { label: 'April', value: 'april' },
        { label: 'May', value: 'may' },
        { label: 'June', value: 'june' },
        { label: 'July', value: 'july' },
        { label: 'August', value: 'august' },
        { label: 'September', value: 'september' },
        { label: 'October', value: 'october' },
        { label: 'November', value: 'november' },
        { label: 'December', value: 'december' },
      ],
    },
    {
      name: 'tradeLicenseExpiryYear',
      label: 'Trade License Expiry Year',
      type: 'select',
      required: true,
      options: [
        { label: '2020', value: '2020' },
        { label: '2021', value: '2021' },
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
        { label: '2027', value: '2027' },
        { label: '2028', value: '2028' },
        { label: '2029', value: '2029' },
        { label: '2030', value: '2030' },
        { label: '2031', value: '2031' },
        { label: '2032', value: '2032' },
        { label: '2033', value: '2033' },
        { label: '2034', value: '2034' },
        { label: '2035', value: '2035' },
        { label: '2036', value: '2036' },
        { label: '2037', value: '2037' },
        { label: '2038', value: '2038' },
        { label: '2039', value: '2039' },
        { label: '2040', value: '2040' },
        { label: '2041', value: '2041' },
        { label: '2042', value: '2042' },
        { label: '2043', value: '2043' },
        { label: '2044', value: '2044' },
        { label: '2045', value: '2045' },
        { label: '2046', value: '2046' },
        { label: '2047', value: '2047' },
        { label: '2048', value: '2048' },
        { label: '2049', value: '2049' },
        { label: '2050', value: '2050' },
      ],
    },
  ],
}
