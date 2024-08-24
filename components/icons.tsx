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
  MailX,
  LogOut,
  PanelsLeftBottom,
  User,
  Code2,
  NotebookPen,
  Clock,
  LucideProps,
  TrendingUp,
  TrendingDown,
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Text,
  TextQuote,
  ChevronLeft,
  ChevronRight,
  SigmaIcon,
  ImageIcon,
  Youtube,
  Twitter,
  Link,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Superscript,
  Subscript,
  WholeWord,
  CaseLower,
  Save,
  Keyboard
} from 'lucide-react'

export type Icon = LucideIcon
export type IconProps = LucideProps
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
  signout: LogOut,
  clock: Clock,
  notebookPen: NotebookPen,
  code: Code2,
  user: User,
  dashboard: PanelsLeftBottom,
  trendUp: TrendingUp,
  trendDown: TrendingDown,
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

export const EditorIcons = {
  text: Text,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  list: List,
  listOrdered: ListOrdered,
  quote: TextQuote,
  code: Code,
  todo: CheckSquare,
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
  check: Check,
  trash: Trash,
  sigma: SigmaIcon,
  image: ImageIcon,
  youtube: Youtube,
  twitter: Twitter,
  link: Link,
  alignLeft: AlignLeft,
  alignCenter: AlignCenter,
  alignRight: AlignRight,
  alignJustify: AlignJustify,
  superscript: Superscript,
  subscript: Subscript,
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  word: WholeWord,
  char: CaseLower,
  save: Save,
  info: Info,
  keyboard: Keyboard,
  loading: Loader2
}
