import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core'

export interface ImageOptions {
  /**
   * Controls if the image node should be inline or not.
   * @default false
   * @example true
   */
  inline: boolean

  /**
   * Controls if base64 images are allowed. Enable this if you want to allow
   * base64 image urls in the `src` attribute.
   * @default false
   * @example true
   */
  allowBase64: boolean

  /**
   * HTML attributes to add to the image element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       * @param options The image attributes
       * @example
       * editor
       *   .commands
       *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
       */
      setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType
    }
    alignedImage: {
      setAlignedImage: (options: {
        src: string
        alt?: string
        title?: string
        width: number
        height: number
        align?: 'left' | 'right' | 'center' | 'none'
      }) => ReturnType
    }
  }
}

export function getDefaultAlignmentClass(align?: 'left' | 'right' | 'center' | 'none' | null) {
  if (!align) return null
  switch (align) {
    case 'left':
      return 'mr-auto'
    case 'right':
      return 'ml-auto'
    case 'center':
      return 'mx-auto'
    default:
      return null
  }
}
export type MapperFn = (align?: 'left' | 'right' | 'center' | 'none' | null) => string | null

let mapperFn: MapperFn = getDefaultAlignmentClass

export function setAlignmentClassMapper(mapper: MapperFn) {
  mapperFn = mapper
}

export function getAlignmentClass(align?: 'left' | 'right' | 'center' | 'none' | null) {
  return mapperFn(align)
}

/**
 * Matches an image to a ![image](src "title") on input.
 */
export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

/**
 * This extension allows you to insert images.
 * @see https://www.tiptap.dev/api/nodes/image
 */
const Image = Node.create<ImageOptions>({
  name: 'image',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      align: ['center', 'left', 'right', 'none']
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      class: {
        default: null,
        rendered: true
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? 'img[src]' : 'img[src]:not([src^="data:"])'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          })
        },
      setAlignedImage:
        (options) =>
        ({ commands }) => {
          const { align, ...attrs } = options

          return commands.insertContent({
            type: this.name,
            attrs: { class: getAlignmentClass(align), ...options }
          })
        }
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match

          return { src, alt, title }
        }
      })
    ]
  }
})

export default Image
