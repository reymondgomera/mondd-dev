import {
  LucideIcon,
  Menu,
  X,
  Lightbulb,
  Blocks,
  UserRoundCheck,
  LineChart,
  HelpCircle,
  MoveRightIcon,
  StarIcon,
  MapPin,
  Mail,
  Phone,
  Sun,
  Moon,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Check,
  Image,
  TriangleAlert,
  CircleAlertIcon,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Trash,
  File,
  UploadCloud,
  Info,
  MailCheck,
  MailX
} from 'lucide-react'

export type Icon = LucideIcon
export type LocalIcon = { className?: string }

export const Icons = {
  menu: Menu,
  spinner: Loader2,
  close: X,
  bulb: Lightbulb,
  blocks: Blocks,
  userCheck: UserRoundCheck,
  lineChart: LineChart,
  helpCircle: HelpCircle,
  moveRight: MoveRightIcon,
  star: StarIcon,
  location: MapPin,
  mail: Mail,
  phone: Phone,
  sun: Sun,
  moon: Moon,
  checkCirle: CheckCircle2,
  chevUp: ChevronUp,
  chevDown: ChevronDown,
  check: Check,
  image: Image,
  triangleAlert: TriangleAlert,
  circleAlert: CircleAlertIcon,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  calendar: Calendar,
  trash: Trash,
  file: File,
  info: Info,
  cloudUpload: UploadCloud,
  mailCheck: MailCheck,
  mailX: MailX,
  logo: ({ className }: LocalIcon) => {
    return (
      <svg className={className} width='87' height='14' viewBox='0 0 87 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0.188 13V3.982H2.312L2.51 5.188C2.798 4.756 3.176 4.414 3.644 4.162C4.124 3.898 4.676 3.766 5.3 3.766C5.756 3.766 6.164 3.826 6.524 3.946C6.896 4.066 7.22 4.24 7.496 4.468C7.772 4.696 8.006 4.984 8.198 5.332C8.534 4.852 8.972 4.474 9.512 4.198C10.052 3.91 10.646 3.766 11.294 3.766C12.074 3.766 12.728 3.928 13.256 4.252C13.796 4.564 14.204 5.026 14.48 5.638C14.756 6.238 14.894 6.976 14.894 7.852V13H12.482V8.086C12.482 7.354 12.338 6.796 12.05 6.412C11.762 6.016 11.324 5.818 10.736 5.818C10.34 5.818 9.992 5.92 9.692 6.124C9.392 6.316 9.158 6.592 8.99 6.952C8.834 7.312 8.756 7.75 8.756 8.266V13H6.326V8.086C6.326 7.354 6.182 6.796 5.894 6.412C5.606 6.016 5.156 5.818 4.544 5.818C4.172 5.818 3.836 5.92 3.536 6.124C3.248 6.316 3.02 6.592 2.852 6.952C2.696 7.312 2.618 7.75 2.618 8.266V13H0.188ZM21.4349 13.216C20.5709 13.216 19.7909 13.018 19.0949 12.622C18.4109 12.214 17.8649 11.656 17.4569 10.948C17.0609 10.24 16.8629 9.424 16.8629 8.5C16.8629 7.564 17.0609 6.742 17.4569 6.034C17.8649 5.326 18.4169 4.774 19.1129 4.378C19.8089 3.97 20.5889 3.766 21.4529 3.766C22.3169 3.766 23.0969 3.97 23.7929 4.378C24.4889 4.774 25.0349 5.326 25.4309 6.034C25.8389 6.742 26.0429 7.564 26.0429 8.5C26.0429 9.424 25.8389 10.24 25.4309 10.948C25.0229 11.656 24.4709 12.214 23.7749 12.622C23.0909 13.018 22.3109 13.216 21.4349 13.216ZM21.4349 11.11C21.8309 11.11 22.1849 11.014 22.4969 10.822C22.8209 10.63 23.0789 10.342 23.2709 9.958C23.4629 9.562 23.5589 9.076 23.5589 8.5C23.5589 7.912 23.4629 7.426 23.2709 7.042C23.0909 6.658 22.8389 6.37 22.5149 6.178C22.2029 5.974 21.8489 5.872 21.4529 5.872C21.0689 5.872 20.7149 5.974 20.3909 6.178C20.0669 6.37 19.8089 6.658 19.6169 7.042C19.4249 7.426 19.3289 7.912 19.3289 8.5C19.3289 9.076 19.4249 9.562 19.6169 9.958C19.8089 10.342 20.0609 10.63 20.3729 10.822C20.6969 11.014 21.0509 11.11 21.4349 11.11ZM28.1196 13V3.982H30.2436L30.4236 5.476C30.7116 4.96 31.1076 4.546 31.6116 4.234C32.1276 3.922 32.7456 3.766 33.4656 3.766C34.2096 3.766 34.8396 3.928 35.3556 4.252C35.8716 4.564 36.2616 5.026 36.5256 5.638C36.8016 6.238 36.9396 6.976 36.9396 7.852V13H34.5276V8.086C34.5276 7.354 34.3716 6.796 34.0596 6.412C33.7596 6.016 33.2916 5.818 32.6556 5.818C32.2476 5.818 31.8816 5.914 31.5576 6.106C31.2456 6.298 30.9996 6.574 30.8196 6.934C30.6396 7.294 30.5496 7.732 30.5496 8.248V13H28.1196ZM43.2439 13.216C42.4159 13.216 41.6719 13.012 41.0119 12.604C40.3639 12.196 39.8479 11.638 39.4639 10.93C39.0919 10.21 38.9059 9.4 38.9059 8.5C38.9059 7.588 39.0919 6.778 39.4639 6.07C39.8479 5.35 40.3699 4.786 41.0299 4.378C41.7019 3.97 42.4519 3.766 43.2799 3.766C43.9399 3.766 44.5159 3.892 45.0079 4.144C45.4999 4.384 45.8959 4.72 46.1959 5.152V0.0399995H48.6259V13H46.4659L46.1959 11.758C46.0039 12.01 45.7759 12.25 45.5119 12.478C45.2479 12.706 44.9299 12.886 44.5579 13.018C44.1859 13.15 43.7479 13.216 43.2439 13.216ZM43.8199 11.092C44.2999 11.092 44.7199 10.984 45.0799 10.768C45.4519 10.54 45.7399 10.234 45.9439 9.85C46.1479 9.454 46.2499 9.004 46.2499 8.5C46.2499 7.984 46.1479 7.534 45.9439 7.15C45.7399 6.754 45.4519 6.448 45.0799 6.232C44.7079 6.004 44.2819 5.89 43.8019 5.89C43.3459 5.89 42.9319 6.004 42.5599 6.232C42.1879 6.448 41.8939 6.754 41.6779 7.15C41.4739 7.534 41.3719 7.978 41.3719 8.482C41.3719 8.986 41.4739 9.436 41.6779 9.832C41.8939 10.228 42.1879 10.54 42.5599 10.768C42.9319 10.984 43.3519 11.092 43.8199 11.092ZM52.0508 13.09C51.6068 13.09 51.2468 12.958 50.9708 12.694C50.6948 12.418 50.5568 12.082 50.5568 11.686C50.5568 11.29 50.6948 10.96 50.9708 10.696C51.2468 10.42 51.6068 10.282 52.0508 10.282C52.4948 10.282 52.8548 10.42 53.1308 10.696C53.4068 10.96 53.5448 11.29 53.5448 11.686C53.5448 12.082 53.4068 12.418 53.1308 12.694C52.8548 12.958 52.4948 13.09 52.0508 13.09Z'
          fill='white'
        />
        <path
          d='M59.5388 13.216C58.7108 13.216 57.9668 13.012 57.3068 12.604C56.6588 12.196 56.1428 11.638 55.7588 10.93C55.3868 10.21 55.2008 9.4 55.2008 8.5C55.2008 7.588 55.3868 6.778 55.7588 6.07C56.1428 5.35 56.6648 4.786 57.3248 4.378C57.9968 3.97 58.7468 3.766 59.5748 3.766C60.2348 3.766 60.8108 3.892 61.3028 4.144C61.7948 4.384 62.1908 4.72 62.4908 5.152V0.0399995H64.9208V13H62.7608L62.4908 11.758C62.2988 12.01 62.0708 12.25 61.8068 12.478C61.5428 12.706 61.2248 12.886 60.8528 13.018C60.4808 13.15 60.0428 13.216 59.5388 13.216ZM60.1148 11.092C60.5948 11.092 61.0148 10.984 61.3748 10.768C61.7468 10.54 62.0348 10.234 62.2388 9.85C62.4428 9.454 62.5448 9.004 62.5448 8.5C62.5448 7.984 62.4428 7.534 62.2388 7.15C62.0348 6.754 61.7468 6.448 61.3748 6.232C61.0028 6.004 60.5768 5.89 60.0968 5.89C59.6408 5.89 59.2268 6.004 58.8548 6.232C58.4828 6.448 58.1888 6.754 57.9728 7.15C57.7688 7.534 57.6668 7.978 57.6668 8.482C57.6668 8.986 57.7688 9.436 57.9728 9.832C58.1888 10.228 58.4828 10.54 58.8548 10.768C59.2268 10.984 59.6468 11.092 60.1148 11.092ZM71.6397 13.216C70.7277 13.216 69.9177 13.024 69.2097 12.64C68.5137 12.244 67.9677 11.698 67.5717 11.002C67.1877 10.306 66.9957 9.496 66.9957 8.572C66.9957 7.636 67.1877 6.808 67.5717 6.088C67.9557 5.368 68.4957 4.804 69.1917 4.396C69.8997 3.976 70.7157 3.766 71.6397 3.766C72.5397 3.766 73.3257 3.964 73.9977 4.36C74.6697 4.744 75.1917 5.272 75.5637 5.944C75.9477 6.616 76.1397 7.378 76.1397 8.23C76.1397 8.35 76.1397 8.482 76.1397 8.626C76.1397 8.77 76.1277 8.926 76.1037 9.094H68.7237V7.6H73.6737C73.6497 7.036 73.4457 6.586 73.0617 6.25C72.6897 5.914 72.2217 5.746 71.6577 5.746C71.2377 5.746 70.8537 5.842 70.5057 6.034C70.1577 6.214 69.8817 6.496 69.6777 6.88C69.4857 7.252 69.3897 7.726 69.3897 8.302V8.824C69.3897 9.316 69.4797 9.742 69.6597 10.102C69.8517 10.462 70.1157 10.744 70.4517 10.948C70.7997 11.14 71.1897 11.236 71.6217 11.236C72.0657 11.236 72.4317 11.14 72.7197 10.948C73.0197 10.756 73.2477 10.504 73.4037 10.192H75.8877C75.7197 10.756 75.4317 11.266 75.0237 11.722C74.6277 12.178 74.1417 12.544 73.5657 12.82C73.0017 13.084 72.3597 13.216 71.6397 13.216ZM80.1543 13L76.8603 3.982H79.4163L81.6483 10.714L83.8803 3.982H86.4003L83.1063 13H80.1543Z'
          fill='#5EEAD4'
        />
      </svg>
    )
  },
  fileText: ({ className }: LocalIcon) => (
    <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20M10 9H8M16 13H8M16 17H8M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  social: {
    email: ({ className }: LocalIcon) => (
      <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M4 4C2.895 4 2 4.895 2 6V18C2 19.105 2.895 20 4 20H20C21.105 20 22 19.105 22 18V6C22 4.895 21.105 4 20 4H4ZM5.59766 6H18.4023L12 10L5.59766 6ZM5 8.62695L12 13L19 8.62695V18H5V8.62695Z' />
      </svg>
    ),
    facebook: ({ className }: LocalIcon) => (
      <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12 2C6.477 2 2 6.477 2 12C2 17.013 5.693 21.153 10.505 21.876V14.65H8.031V12.021H10.505V10.272C10.505 7.376 11.916 6.105 14.323 6.105C15.476 6.105 16.085 6.19 16.374 6.229V8.523H14.732C13.71 8.523 13.353 9.492 13.353 10.584V12.021H16.348L15.942 14.65H13.354V21.897C18.235 21.236 22 17.062 22 12C22 6.477 17.523 2 12 2Z' />
      </svg>
    ),
    github: ({ className }: LocalIcon) => (
      <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12 2C6.47656 2 2 6.47656 2 12C2 17.5234 6.47656 22 12 22C17.5234 22 22 17.5234 22 12C22 6.47656 17.5234 2 12 2ZM12 4C16.4102 4 20 7.58984 20 12C20 12.4688 19.9531 12.9297 19.875 13.375C19.6289 13.3203 19.2656 13.2539 18.8438 13.25C18.5312 13.2461 18.1406 13.2969 17.8125 13.3438C17.9258 12.9961 18 12.6133 18 12.2188C18 11.2578 17.5312 10.3633 16.7812 9.625C16.9883 8.85547 17.1914 7.53516 16.6562 7C15.0742 7 14.1992 8.12891 14.1562 8.1875C13.668 8.07031 13.1641 8 12.625 8C11.9336 8 11.2734 8.125 10.6562 8.3125L10.8438 8.15625C10.8438 8.15625 9.96484 6.9375 8.34375 6.9375C7.77734 7.50781 8.03516 8.95312 8.25 9.6875C7.48438 10.418 7 11.2812 7 12.2188C7 12.5469 7.07812 12.8594 7.15625 13.1562C6.87891 13.125 5.87891 13.0312 5.46875 13.0312C5.10547 13.0312 4.54297 13.1172 4.09375 13.2188C4.03125 12.8203 4 12.4141 4 12C4 7.58984 7.58984 4 12 4ZM5.46875 13.2812C5.86328 13.2812 7.0625 13.4219 7.21875 13.4375C7.23828 13.4922 7.25781 13.543 7.28125 13.5938C6.85156 13.5547 6.01953 13.4961 5.46875 13.5625C5.10156 13.6055 4.63281 13.7383 4.21875 13.8438C4.1875 13.7188 4.14844 13.5977 4.125 13.4688C4.5625 13.375 5.13672 13.2812 5.46875 13.2812ZM18.8438 13.5C19.2422 13.5039 19.6055 13.5703 19.8438 13.625C19.832 13.6914 19.7969 13.7461 19.7812 13.8125C19.5273 13.7539 19.1094 13.668 18.625 13.6562C18.3906 13.6523 18.0156 13.6641 17.6875 13.6875C17.7031 13.6562 17.707 13.625 17.7188 13.5938C18.0586 13.5469 18.4922 13.4961 18.8438 13.5ZM6.09375 13.7812C6.65625 13.7852 7.18359 13.8242 7.40625 13.8438C7.92969 14.8203 8.98828 15.543 10.625 15.8438C10.2227 16.0664 9.86328 16.3789 9.59375 16.75C9.35938 16.7695 9.11328 16.7812 8.875 16.7812C8.17969 16.7812 7.74609 16.1602 7.375 15.625C7 15.0898 6.53906 15.0312 6.28125 15C6.01953 14.9688 5.92969 15.1172 6.0625 15.2188C6.82422 15.8047 7.09766 16.5 7.40625 17.125C7.68359 17.6875 8.26562 18 8.90625 18H9.03125C9.01172 18.1094 9 18.2109 9 18.3125V19.4062C6.69141 18.4727 4.93359 16.5 4.28125 14.0625C4.69141 13.9609 5.15234 13.8555 5.5 13.8125C5.66016 13.793 5.86328 13.7773 6.09375 13.7812ZM18.625 13.9062C19.0742 13.918 19.4727 14.0039 19.7188 14.0625C19.168 16.1328 17.8086 17.8555 16 18.9062V18.3125C16 17.4609 15.3281 16.3672 14.375 15.8438C15.957 15.5547 16.9883 14.8633 17.5312 13.9375C17.9102 13.9102 18.3555 13.8984 18.625 13.9062ZM12.5 18C12.7734 18 13 18.2266 13 18.5V19.9375C12.6719 19.9805 12.3398 20 12 20V18.5C12 18.2266 12.2266 18 12.5 18ZM10.5 19C10.7734 19 11 19.2266 11 19.5V19.9375C10.6641 19.8945 10.3242 19.832 10 19.75V19.5C10 19.2266 10.2266 19 10.5 19ZM14.5 19C14.7422 19 14.9531 19.1758 15 19.4062C14.6758 19.5391 14.3438 19.6602 14 19.75V19.5C14 19.2266 14.2266 19 14.5 19Z' />
      </svg>
    ),
    instagram: ({ className }: LocalIcon) => (
      <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_3512_5208)'>
          <path d='M8 3C5.239 3 3 5.239 3 8V16C3 18.761 5.239 21 8 21H16C18.761 21 21 18.761 21 16V8C21 5.239 18.761 3 16 3H8ZM18 5C18.552 5 19 5.448 19 6C19 6.552 18.552 7 18 7C17.448 7 17 6.552 17 6C17 5.448 17.448 5 18 5ZM12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z' />
        </g>
        <defs>
          <clipPath id='clip0_3512_5208'>
            <rect className={className} />
          </clipPath>
        </defs>
      </svg>
    ),
    linkedIn: ({ className }: LocalIcon) => (
      <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 12.116 14.907 11.872 14.663 11.872C14.419 11.872 13.605 12.035 13.605 13.174C13.605 13.337 13.605 17 13.605 17H11.082V10H13.605V10.977C13.93 10.407 14.581 10 15.802 10C17.023 10 18 10.977 18 13.174V17Z' />
      </svg>
    ),
    twitterX: ({ className }: LocalIcon) => (
      <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M2.86719 3L9.73633 12.8184L2.73438 21H5.38086L10.9199 14.5098L15.4609 21H21.3711L14.1738 10.6973L20.7441 3H18.1387L12.9961 9.00977L8.79883 3H2.86719Z' />
      </svg>
    )
  }
}
